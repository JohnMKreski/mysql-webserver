const connection = require('../db-config');
const {
  ALL_SONGREQUESTS,
  SINGLE_SONGREQUEST,
  INSERT_SONGREQUEST,
  UPDATE_SONGREQUEST,
  DELETE_SONGREQUEST

 } = require('../queries/song_requests.queries');
const query = require('../utils/query');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 *///basis to utilize API's 

//specify method in naming convention object.name = anoymous function(request, result)
 //can perform querys because it is open in db-config.js
exports.getAllSong_Requests = async (req, res) => { 
  //establish connection
  const con = await connection().catch(
    (err) => {
      throw err;
  });

  //send off query to get all requets

  const songs = await query(con, ALL_SONGREQUESTS).catch(
    (err) => {
      res.send(err);
      
  });

  if (songs.length) {
    res.json(songs)
  }
};

// http://localhost:3000/song_requests/1 == parameter = 1(ID) (RESTful service)
exports.getSong_Request = async (req, res) => {
    //establish connection
    const con = await connection().catch(
      (err) => {
        throw err;
    });
  
    //send off query to get single requets
  
    const song = await query(con, SINGLE_SONGREQUEST, [req.params.song_requestsId]).catch(
      (err) => {
        res.send(err);
    });
  
    if (song.length) {
      res.json(song)
    }
};

//body can insert chuncks of data
// .json is an object literal
// .object({key: value}) **Key's value NEEDS to be a String (or Int??) *** Not a function
 //Note body vs param
exports.createSong_Request = async (req, res) => {
    //verify valid token
    //req.user??? Check to see if user is logged in to create a request?
    const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

      // take result of middleware check
    if (decoded.id) {
      // establish connection
      const con = await connection().catch(
        (err) => {
          throw err;
      });
  
      //send off query to add song request 
      const result = await query(con, INSERT_SONGREQUEST, [req.body.artist_name, req.body.song_title]).catch(
        (err) => {
          res.send(err);
      });
      console.log(result);
  
    if (song.length) {
      res.json(song)
    }

    if (result.affectedRows === 1) {
      res.json({ message: 'Added song request successfully!' });
    }
  }
};

//NOTE: body and params in query.Update
//Update requires *these columns for a proper update 
//*these = queries.UPDATE_SONGREQUESTS, [req.body.artist_name, req.body.status, req.params.taskId],
  //column order is needed for requests
      //Play with Updating only status based on ID
exports.updateSong_Request = async (req, res) => {
    // establish connection
    const con = await connection().catch(
      (err) => {
        throw err;
    });
  
    // query update song request 
    const result = await query(con, UPDATE_SONGREQUEST, [
      req.body.artist_name,
      req.body.status,
      req.params.song_requestsId,
    ]).catch((err) => {
      res.send(err);
    });
  
    if (result.affectedRows === 1) {
      res.json(result);
    }
};

//only passing params (Id)
    //.json(object literal) ({key: value})
exports.deleteSong_Request = async (req, res) => {
    // establish connection
    const con = await connection().catch(
      (err) => {
        throw err;
    });
  
    // query delete task
    const result = await query(con, DELETE_SONGREQUEST, [req.params.song_requestsId]).catch(
      (err) => {
        res.send(err);
      }
    );
  
    if (result.affectedRows === 1) {
      res.json({ message: 'Deleted successfully.' });
    }
};

/*
exports.song_requestsRoutes =function(req, res) {
  // Fetch data from the MySQL database
  connection.query('SELECT * FROM your_table', (error, results) => {
    if (error) throw error;
    // Render the index.ejs page with the fetched data
    res.render('index', { data: results });
  });
});
*/
  
