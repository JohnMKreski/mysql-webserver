/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...) 
 * Setting colums in DB!!!!!!!!!!!!!!!!!
 */

//initial create table querie
exports.CREATE_SONGREQUESTS_TABLE = `CREATE TABLE IF NOT EXISTS song_requests( 
    song_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    canDelete ENUM('Admin', 'User') DEFAULT 'Admin',
    artist_name varchar(255) NOT NULL,
    song_title varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    status varchar(255) DEFAULT 'not played',
    PRIMARY KEY (song_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_type) REFERENCES users(role_type)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`;

//exports.SHOW_TABLES = 'SHOW TABLES';

// Get every song request
exports.GET_ALL_SONGREQUESTS = `SELECT * FROM song_requests`;

// Get every song request by user id
exports.GET_ALL_SONGREQUESTS_BY_USER = (userId) => `SELECT * FROM song_requests WHERE user_id = ${userId}`;

// Get a single song request by id
//?' = request parameter from routes->controller->queries
exports.GET_SINGLE_SONGREQUEST = `SELECT * FROM song_requests WHERE song_id = ?`;

//Get sing song request by user id
exports.GET_SINGLE_SONGREQUEST_BY_USER = (userId, songId) =>
  `SELECT * FROM song_requests WHERE user_id = ${userId} AND song_id = ${songId}`;

//insert can be tricky
// add a new record or create a record
//? can grab the body in controller
/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
**/
exports.INSERT_SONGREQUEST = `INSERT INTO song_requests (artist_name, song_title) VALUES (?, ?)`; 

//insert song request (artist_name, song_title) with user id
exports.INSERT_SONGREQUEST_BY_USER = (userId, artistName, songTitle) =>
  `INSERT INTO song_requests (user_id, artist_name, song_title) VALUES (${userId}, ${artistName}, ${songTitle})`; 


//column order is needed required in controllers and query (table control)
// exports.UPDATE_SONGREQUEST = `UPDATE song_requests SET artist_name = ?, status = ? WHERE song_id = ?`;

exports.UPDATE_SONGREQUEST_BY_USER = (roleType, songId, newValues) =>
  `UPDATE song_requests SET ${newValues} WHERE role_type = ${roleType === 'User'} AND song_id = ${songId}`;


exports.UPDATE_SONGREQUEST_BY_DJ = (roleType, songId, newValues) =>
  `UPDATE song_requests SET ${newValues} WHERE role_type = ${roleType === 'Admin'} AND song_id = ${songId}`;

// Delete a song request by id
//deleting from parameter (ID)
// exports.DELETE_SONGREQUEST = `DELETE FROM song_requests WHERE song_id = ?`;

//Might need to make this explicit to admin user?
exports.DELETE_SONGREQUEST_BY_DJ = (userId, songId) =>
  `DELETE FROM song_requests WHERE user_id = ${userId} AND song_id = ${songId}`;