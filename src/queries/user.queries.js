exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    role_type ENUM('Admin', 'User') DEFAULT 'User',
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
)`;

exports.GET_ME_BY_USER_ID = (userId) =>
  `SELECT user_id, role_type, username, email FROM users WHERE user_id = ${userId}`; // don't return the password

exports.GET_ME_BY_USERNAME = (username) =>
  `SELECT user_id, username, email FROM users WHERE username = ${username}`;// don't return the password

exports.GET_ME_BY_USERNAME_CHECK = (username) =>
  `SELECT user_id, username, email FROM users WHERE username = '${username}'`; //single quote will return string null if user with same username doesnt exist

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = (userId) =>
  `SELECT * FROM users WHERE user_id = ${userId}`;

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = (username) =>
  `SELECT * FROM users WHERE username = ${username}`;

// exports.GET_ME_BY_USER_ID_WITH_PASSWORD_CHECK = (userId, password) =>
//   `SELECT * FROM users WHERE user_id = ${userId} AND password = '${password}'`;

exports.INSERT_NEW_USER = (username, email, password) =>
  `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;

exports.UPDATE_USER_INFO = (username, email, userId) =>
  `UPDATE users SET username = ${username}, email = ${email} WHERE user_id = ${userId}`;

exports.UPDATE_USER_PASSWORD = (password, userId) =>
  `UPDATE users SET password = ${password} WHERE user_id = ${userId}`;