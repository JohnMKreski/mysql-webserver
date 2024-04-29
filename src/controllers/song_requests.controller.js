const mysql = require('mysql');
const connection = require('../db-config');
const {
  GET_ALL_SONGREQUESTS,
  GET_SINGLE_SONGREQUEST,
  INSERT_SONGREQUEST,
  UPDATE_SONGREQUEST,
  DELETE_SONGREQUEST,
  GET_ALL_SONGREQUESTS_BY_USER,
  GET_SINGLE_SONGREQUEST_BY_USER,
  INSERT_SONGREQUEST_BY_USER,
  UPDATE_SONGREQUEST_BY_USER,
  UPDATE_SONGREQUEST_BY_DJ,
  DELETE_SONGREQUEST_BY_DJ

 } = require('../queries/song_requests.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 *///basis to utilize API's 

//***************************************************************ALL Songs(all/user) */
//specify method in naming convention object.name = anoymous function(request, result)
 //can perform querys because it is open in db-config.js
exports.getAllSong_Requests = async (req, res) => { 
  //establish connection
  const con = await connection().catch(
    (err) => {
      throw err;
  });

  //send off query to get all requets

  const songs = await query(con, GET_ALL_SONGREQUESTS, []).catch(
    (err) => {
      res.send(err);
      
  });

  if (!songs.length) {
    res.status(200).json({ msg: 'No songs available.' });
  } else {
    res.json(songs);
  } 
};

exports.getAllSong_Requests_By_User = async (req, res) => { 
  //establish connection
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all tasks
  const songs = await query(con, GET_ALL_SONGREQUESTS_BY_USER(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!songs.length) {
    res.status(200).json({ msg: 'No songs available for this user.' });
  } else {
    res.json(songs);
  }  
};
//***************************************************************ALL Songs(all/user) */





//************************************************************SINGLE Songs(all/user) */
// http://localhost:3000/song_requests/1 == parameter = 1(ID) (RESTful service)
exports.getSong_Request = async (req, res) => {
    //establish connection
    const con = await connection().catch(
      (err) => {
        throw err;
    });
  
    //send off query to get single requets
  
    const song = await query(con, GET_SINGLE_SONGREQUEST(req.params.song_id)).catch
    (
      serverError(res)
    );
  
    if (!song.length) {
      res.status(400).json({ msg: 'No song available for this user.' });
    } else {
    res.json(song);
    }
};

exports.getSong_Request_By_User = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all task
  const song = await query(
    con,
    GET_SINGLE_SONGREQUEST_BY_USER(req.user.id, req.params.songId)
  ).catch(serverError(res));

  if (!song.length) {
    res.status(400).json({ msg: 'No song available for this user.' });
  }
  res.json(song);
};

//************************************************************SINGLE Songs(all/user) */




//**********************************************************INSERT REQUEST(all/user) */
//body can insert chuncks of data
// .json is an object literal
// .object({key: value}) **Key's value NEEDS to be a String (or Int??) *** Not a function
 //Note body vs param
 /**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.createSong_Request = async (req, res) => {
    //verify valid token
    //req.user??? Check to see if user is logged in to create a request?
    // const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

    //   // take result of middleware check
    // if (decoded.id) {
    //   // establish connection
      const con = await connection().catch(
        (err) => {
          throw err;
      });
  
      //send off query to add song request 
      const result = await query(con, INSERT_SONGREQUEST(req.body.artist_name, req.body.song_title)).catch(
        serverError(res)
      );
      // console.log(result);

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add song request: ${req.body.artist_name}, ${req.body.song_title}` });
    }
    res.json({ msg: 'Added song request successfully!' });
};

exports.createSong_Request_By_User = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add task
    const artistName = mysql.escape(req.body.artist_name);
    const songTitle = mysql.escape(req.body.song_title);
    const result = await query(con, INSERT_SONGREQUEST_BY_USER(user.id, artistName, songTitle)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add song request: ${req.body.artist_name}, ${req.body.song_title}` });
    }
    res.json({ msg: 'Added song request successfully!' });
  }
};
//**********************************************************INSERT REQUEST(all/user) */





//*******************************************************************UPDATE(all/user) */
/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "task_name = \'Task 1\', status = \'complete\', date = \'<today's_date>\'"
 */

//Values string for USERS
const _buildValuesStringUSER = (req) => {
  const body = [req.body.artist_name, req.body.song_title];
  const values = Object.keys(body).map(
    // [artist_name, song_title].map()
    (key) => `${key} = ${mysql.escape(body[key])}`
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};

//Values String for DJ
const _buildValuesStringDJ = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [artist_name, song_title, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}`
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};


//NOTE: body and params in query.Update
//Update requires *these columns for a proper update 
//*these = queries.UPDATE_SONGREQUESTS, [req.body.artist_name, req.body.status, req.params.taskId],
  //column order is needed for requests
      //Play with Updating only status based on ID
// exports.updateSong_Request = async (req, res) => {
//     // establish connection
//     const con = await connection().catch(
//       (err) => {
//         throw err;
//     });
  
//     // query update song request 
//     const result = await query(con, UPDATE_SONGREQUEST, [
//       req.body.artist_name,
//       req.body.status,
//       req.params.song_requestsId,
//     ]).catch((err) => {
//       res.send(err);
//     });
  
//     if (result.affectedRows === 1) {
//       res.json(result);
//     }
// };

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */


//TODO: UPDATE status should only be allowed for DJ(admin) //user_id specific? 
//TODO: UPDATE song_title and artist_name should be allowed by user and DJ(admin)
exports.updateSong_Request_By_User = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesStringUSER(req);

  // query update song
  const result = await query(
    con,
    UPDATE_SONGREQUEST_BY_USER(req.roleType, req.params.songId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update song request: '${req.body.artist_name}', '${req.body.song_title}'` });
      //.json({ msg: `DJ, Unable to update song request status: '${req.body.user_id}', '${req.body.status}'` });

  }
  res.json(result);
};

//UPDATE by DJ
exports.updateSong_Request_By_DJ = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesStringDJ(req);

  // query update song
  const result = await query(
    con,
    UPDATE_SONGREQUEST_BY_DJ(req.roleType, req.params.songId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update song request: '${req.body.artist_name}', '${req.body.song_title}'` });
      //.json({ msg: `DJ, Unable to update song request status: '${req.body.user_id}', '${req.body.status}'` });

  }
  res.json(result);
};
//*******************************************************************UPDATE(all/user) */






//*******************************************************************DELETE(all/user) */
//only passing params (Id)
    //.json(object literal) ({key: value})
// exports.deleteSong_Request = async (req, res) => {
//     // establish connection
//     const con = await connection().catch(
//       (err) => {
//         throw err;
//     });
  
//     // query delete task
//     const result = await query(con, DELETE_SONGREQUEST, [req.params.song_requestsId]).catch(
//       (err) => {
//         res.send(err);
//       }
//     );
  
//     if (result.affectedRows === 1) {
//       res.json({ message: 'Deleted successfully.' });
//     }
// };

//Delete BY DJ
exports.deleteSong_Request_By_DJ = async (req, res) => {
  // Check if the user has the required role (e.g., 'Admin' or 'DJ')
  // if (req.roleType !== 'Admin' && req.roleType !== 'DJ') {
  //   return res.status(403).json({ msg: 'Unauthorized: Insufficient permissions.' });
  // }

    try {
      // Establish connection
      const con = await connection();
      
      // Query delete task
      const result = await query(
        con,
        DELETE_SONGREQUEST_BY_DJ(req.user.id, req.params.songId)
      );
  
      if (result && result.affectedRows === 1) {
        res.json({ msg: 'Deleted successfully.' });
      } else {
        res.status(500).json({ msg: `Unable to delete song at: ${req.params.songId}` });
      }
    } catch (error) {
      console.error("Error deleting song request:", error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
//*******************************************************************DELETE(all/user) */


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
  
