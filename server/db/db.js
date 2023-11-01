const mysql = require('mysql2');

const pool = mysql.createPool({

  host: '11.11.111.11',
  user: 'user',
  password: 'a123456789',
  database: 'database', // process.env.MYSQL_DATABASE
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
}).promise();

module.exports = pool;