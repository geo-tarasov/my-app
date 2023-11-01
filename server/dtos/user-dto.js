const pool = require('../db/db');

module.exports = class UserDto {
    email;
    id;
    isActivated;

    async getData(id) {
        this.email = (await pool.execute('SELECT `email` FROM `native_users` WHERE `id` = ?', [id]))[0][0]?.email;
        this.id = id;
        this.isActivated = (await pool.execute('SELECT `isActivated` FROM `native_users` WHERE `id` = ?', [id]))[0][0]?.isActivated;
    }
}
