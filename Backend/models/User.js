// const db = require('../config/db');

// const User = {
//   create: (user, callback) => {
//     const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
//     db.query(sql, [user.username, user.email, user.password, user.role], callback);
//   },
//   findByUsername: (username, callback) => {
//     const sql = 'SELECT * FROM users WHERE username = ?';
//     db.query(sql, [username], callback);
//   },
// };

// module.exports = User;

const db = require('../config/db');

const User = {
  create: async (user) => {
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await db.query(sql, [user.username, user.email, user.password, user.role]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  findByUsername: async (username) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    try {
      const [rows] = await db.query(sql, [username]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user:', error); // Log the error
      throw error;
    }
  },
};

module.exports = User;