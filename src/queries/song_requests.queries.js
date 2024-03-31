/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...) 
 * Setting colums in DB!!!!!!!!!!!!!!!!!
 */

//initial create table querie
exports.CREATE_SONGREQUESTS_TABLE = `CREATE TABLE IF NOT EXISTS song_requests( 
    id int NOT NULL AUTO_INCREMENT,
    artist_name varchar(255) NOT NULL,
    song_title varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    requested_time TIME NOT NULL DEFAULT '00:00:00',
    status varchar(255) DEFAULT 'not played',
    PRIMARY KEY (id)
  )`;

//exports.SHOW_TABLES = 'SHOW TABLES';

// Get every task
exports.ALL_SONGREQUESTS = `SELECT * FROM song_requests`;

// Get a single task by id
//?' = request parameter from routes->controller->queries
exports.SINGLE_SONGREQUESTS = `SELECT * FROM song_requests WHERE id = ?`;

//insert can be tricky
// add a new record or create a record
//? can grab the body in controller
/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
**/
exports.INSERT_SONGREQUESTS = `INSERT INTO song_requests (artist_name, song_title) VALUES (?, ?)`; 


//column order is needed required in controllers and query (table control)
exports.UPDATE_SONGREQUESTS = `UPDATE song_requests SET artist_name = ?, status = ? WHERE id = ?`;


// Delete a task by id
//deleting from parameter (ID)
exports.DELETE_SONGREQUESTS = `DELETE FROM song_requests WHERE id = ?`;