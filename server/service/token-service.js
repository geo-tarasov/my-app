const jwt = require('jsonwebtoken');
const pool = require("../db/db");
const inSql = require("../utils/in-sql")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10s'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '20s'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        await pool.execute('INSERT INTO `native_tokens` (`userId`, `refreshToken`) VALUES (?, ?)', [userId, refreshToken]);
        return refreshToken;
    }

    async removeToken(refreshToken) {
        await pool.execute('DELETE FROM `native_tokens` WHERE `refreshToken` = ?', [refreshToken]);
        return refreshToken;
    }

    async findToken(refreshToken) {
        const tokenData = (await pool.execute('SELECT `refreshToken` FROM `native_tokens` WHERE `refreshToken` = ?', [refreshToken]))[0][0]?.refreshToken;
        return tokenData;
    }

    async clearDb() {
        const [allTokens] = await pool.execute('SELECT `refreshToken` FROM `native_tokens`');
        let deleteTokens = allTokens.map((el) => {
            return el.refreshToken;
        });
        deleteTokens = deleteTokens.filter((token) => {
            try {
                jwt.verify(token, process.env.JWT_REFRESH_SECRET);
                return false;
            } catch (e) {
                return true;
            }
        });
        if (deleteTokens.length) {
            console.log('DELETE FROM `native_tokens` WHERE `refreshToken` IN ' + inSql(deleteTokens));
            console.log([...deleteTokens]);
            await pool.execute('DELETE FROM `native_tokens` WHERE `refreshToken` IN ' + inSql(deleteTokens), [...deleteTokens]);
        }
    }
}

module.exports = new TokenService();
