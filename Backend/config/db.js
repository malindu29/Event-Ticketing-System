// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,

// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('Connected to MySQL database.');
// });

// module.exports = db;

const mysql = require('mysql2/promise'); // Use the promise-compatible version

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'P@R#A$V%I&L2002',
    database: 'ticketing_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
console.log('Connected to MySQL database.');

module.exports = db;
