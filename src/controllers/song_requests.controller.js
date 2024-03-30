const con = require('../db-config');
const queries = require('../queries/song_requests.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 *///basis to utilize API's 

exports.getAllSong_Requests = function(req, res) { //specify method in naming convention object.name = anoymous function(request, result)
    con.query(queries.ALL_SONGREQUESTS, function(err, result, fields) { //can perform querys because it is open in db-config.js
        if (err) {
        res.send(err);
        }
        res.json(result);
    });
};

// http://localhost:3000/song_requests/1 == parameter = 1 (RESTful service)
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
exports.updateSong_Requests = function(req, res) {
    con.query(
      //column order is needed for requests
      queries.UPDATE_SONGREQUESTS,
      [req.body.artist_name, req.body.status, req.params.song_requestsId], //Play with Updating only status based on ID
      function(err, data) {
        if (err) {
          res.send(err);
        }
        res.json(data);
      }
    );
};

//only passing params (Id)
exports.deleteSong_Requests = function(req, res) {
    con.query(queries.DELETE_SONGREQUESTS, [req.params.song_requestsId], function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Deleted successfully.' }); //.json(object literal) ({key: value})
    });
};

  
