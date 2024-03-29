//This .js file sets up the database to use

const mysql = require('mysql');
const queries = require('./queries/tasks.queries');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'password';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'tododb';

// Create the connection with required details
const con = mysql.createConnection({
  host,
  user,
  password,
  database
});

// Connect to the database.
//object.connect = create connection
con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');

  con.query(queries.CREATE_TASKS_TABLE, function(err, result) {
    if (err) throw err;
    console.log('Table created or exists already!');
  });
}); 

// ^ this creates a table whitin the database (con.query...)
//we can also create a databse through cmd terminal
/*
1. Windows: If you're using MySQL as a service, you can start it from the Services management console (services.msc). 
    Look for a service named something like "MySQL" or "MySQL Server" and start it.

2. mysql -u root -p
3. show databases;
4. CREATE DATABASE <>; //<> = Database name
5. use <>;
6. quit
*/

module.exports = con; //exposes con that is open and live for the app to use