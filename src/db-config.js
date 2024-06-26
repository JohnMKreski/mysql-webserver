//This .js file sets up the database to use

const mysql = require('mysql');
const {CREATE_SONGREQUESTS_TABLE} = require('./queries/song_requests.queries');
const {CREATE_USERS_TABLE} = require('./queries/user.queries');
// const authQueries = require('./queries/auth.queries');
const query = require('./utils/query');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'password';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'songreqdb';


const connection = async () =>
  new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    con.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
    });

    resolve(con);
  });

// Create the connection with required details
(async () => {
  const _con = await connection().catch((err) => {
    throw err;
  });

  const userTableCreated = await query(_con, CREATE_USERS_TABLE).catch(
    (err) => {
      console.log("userTableCreated:err", err);
    }
  );

  const songsTableCreated = await query(_con, CREATE_SONGREQUESTS_TABLE).catch(
    (err) => {
      console.log("songTableCreated:err", err);
    }
  );

  if (!!userTableCreated && !!songsTableCreated) {
    console.log('Tables Created!'); //! = boolean(false) !! = boolean(true)
  }
})();

module.exports = connection;







// Create the connection with required details
// const con = mysql.createConnection({
//   host,
//   user,
//   password,
//   database
// });

// // Connect to the database.
// //object.connect = create connection
// con.connect(function(err) {
//   if (err) throw err;
//   console.log('(db-config[con.connect].js) Connected!');

//   con.query(authQueries.CREATE_USERS_TABLE, function(err, result) {
//     if (err) throw err;
//     console.log(
//       '(db-config[con.query].js) "users" table has been created or exists already!'
//       );
//   });

//   // Create or ensure that the song_requests table exists
//   con.query(song_requestQueries.CREATE_SONGREQUESTS_TABLE, function(err, result) {
//     if (err) throw err;
//     console.log(
//       '(db-config[con.query].js) "song_requests" table has been created or exists already!'
//       );
//   });
// });

// module.exports = con; //exposes con that is open and live for the app to use

// ^ this creates a table whitin the database (con.query...)
//we can also create a databse through cmd terminal
/*
1. Windows: If you're using MySQL as a service, you can start it from the Services management console (services.msc). 
    Look for a service named something like "MySQL" or "MySQL Server" and start it.

2. mysql -u root -p
3. show databases; NOTE: ";" after each command in mysql 
4. CREATE DATABASE <>; //<> = Database name
5. use <>;
6. SELECT * FROM <>; -- to view the table 
6. quit

//CMD Line code for mysql (Run as Admin)
// sc start mysql -- to start mysql in admin cmd terminal
// - npm start in normal (non admin cmd terminal)
// -- *develop
// -- *crtlC, y -- to quit script
// sc stop mysql -- to quit the mysql service in admin cmd terminal
// sc query mysql -- to see if it's running in admin cmd terminal

*/

