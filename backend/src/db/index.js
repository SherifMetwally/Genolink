const mysql = require('mysql2/promise');
require('dotenv').config();

const host     = process.env.DB_HOST || 'localhost';
const port     = parseInt(process.env.DB_PORT || '3306', 10);
const user     = process.env.DB_USER;
const password = process.env.DB_PASSWORD ?? '';
const database = process.env.DB_NAME;

if (!user || !database) {
  throw new Error(
    'Missing DB_USER or DB_NAME. Set them in Hostinger environment variables (or a local .env file). ' +
    'Do not rely on implicit defaults — shared hosting does not allow MySQL user "root" with no password.'
  );
}

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

module.exports = pool;
