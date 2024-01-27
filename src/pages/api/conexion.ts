import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit: 10,
  waitForConnections: true,
  host: process.env.MYSQLHOST || 'monorail.proxy.rlwy.net',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'b251-B6Ge34DAaffd3EbcB6bh51eD-CF',
  database: process.env.MYSQL_DATABASE || 'railway',
  port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT, 10) : 54501,
});

export { pool };
