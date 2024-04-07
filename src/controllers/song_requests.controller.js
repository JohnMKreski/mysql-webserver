const con = require('../db-config');
const queries = require('../queries/song_requests.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 *///basis to utilize API's 

//specify method in naming convention object.name = anoymous function(request, result)
 //can perform querys because it is open in db-config.js
exports.getAllSong_Requests = function(req, res) { 
    con.query(queries.ALL_SONGREQUESTS, function(err, result, fields) { 
        if (err) {
        res.send(err);
        console.error('Error fetching data:', error);
        }
        res.json(result);
        console.log("Rendered!")
        // Render the index.ejs page with the fetched data
        res.render('table', { data: result });
    });
};

// http://localhost:3000/song_requests/1 == parameter = 1(ID) (RESTful service)
exports.getSong_Requests = function(req, res) {
    con.query(queries.SINGLE_SONGREQUESTS, [req.params.song_requestsId], function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
};

//body can insert chuncks of data
// .json is an object literal
// .object({key: value}) **Key's value NEEDS to be a String (or Int??) *** Not a function
 //Note body vs param
exports.createSong_Requests = function(req, res) {
    con.query(queries.INSERT_SONGREQUESTS, [req.body.artist_name, req.body.song_title], function(err, result) {
      if (err) {
        res.send(err);
      }
      console.log(result);
      res.json({ message: 'Number of records inserted: ' + result.affectedRows });
    });
};

//NOTE: body and params in query.Update
//Update requires *these columns for a proper update 
//*these = queries.UPDATE_SONGREQUESTS, [req.body.artist_name, req.body.status, req.params.taskId],
  //column order is needed for requests
      //Play with Updating only status based on ID
exports.updateSong_Requests = function(req, res) {
    con.query(
      
      queries.UPDATE_SONGREQUESTS,
      [req.body.artist_name, req.body.status, req.params.song_requestsId], 
      function(err, data) {
        if (err) {
          res.send(err);
        }
        res.json(data);
      }
    );
};

//only passing params (Id)
    //.json(object literal) ({key: value})
exports.deleteSong_Requests = function(req, res) {
    con.query(queries.DELETE_SONGREQUESTS, [req.params.song_requestsId], function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Deleted successfully.' }); 
    });
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
  
