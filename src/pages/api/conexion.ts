import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit: 50, // Ajusta este valor según tus necesidades
  waitForConnections: true,
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'railway',
});

export default pool;
