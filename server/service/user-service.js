const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const pool = require("../db/db");

class UserService {
    async registration(email, password) {
        const candidateId = (await pool.execute('SELECT `id` FROM `native_users` WHERE `email` = ?', [email]))[0][0]?.id;
        if (candidateId) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        await pool.execute('INSERT INTO `native_users` (`email`, `password`, `activationLink`) VALUES (?, ?, ?)', [email, hashPassword, activationLink]);
        const userId = (await pool.execute('SELECT `id` FROM `native_users` WHERE `email` = ?', [email]))[0][0]?.id;
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(); // id, email, isActivated
        await userDto.getData(userId);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const userId = (await pool.execute('SELECT `id` FROM `native_users` WHERE `activationLink` = ?', [activationLink]))[0][0]?.id;
        if (!userId) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        await pool.execute('UPDATE `native_users` SET `isActivated` = true WHERE `id` = ?', [userId]);
    }

    async login(email, password) {
        const user = (await pool.execute('SELECT * FROM `native_users` WHERE `email` = ?', [email]))[0][0];
        if (!user?.id) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user?.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto();
        await userDto.getData(user?.id);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const userDto = new UserDto();
        await userDto.getData(userData.id);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const [users] = await pool.execute('SELECT * FROM `native_users`');
        return users;
    }
}

module.exports = new UserService();
