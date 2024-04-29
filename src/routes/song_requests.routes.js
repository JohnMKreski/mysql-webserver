const express = require('express');
const {
  getAllSong_Requests,
  getAllSong_Requests_By_User,
  getSong_Request,
  getSong_Request_By_User,
  createSong_Request,
  createSong_Request_By_User,
  updateSong_Request_By_User,
  updateSong_Request_By_DJ,
  deleteSong_Request_By_DJ
} = require('../controllers/song_requests.controller');
const canAccess = require('../middleware/auth.middleware');

const song_requestsRoutes = express.Router(); //defines route for express APP(API)


/**
 * Express routes for Song_Requests.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all song requests. Evaluates to `/song_requests/`.
 */
//use any routes that are defines, use a get request @ '/' (/song_requests/), perform."this function"  if post(perform this function)

//TODO: Get All request from Guest User
// song_requestsRoutes.get('/', getAllSong_Requests).post('/', canAccess, createSong_Request);


song_requestsRoutes.route('/')
  .get(canAccess, getAllSong_Requests)
  .post(canAccess, createSong_Request_By_User);
  

song_requestsRoutes.route('/:userId')
  .get(canAccess, getAllSong_Requests_By_User);

  

song_requestsRoutes.route('/:songId')
  .put(canAccess, updateSong_Request_By_User, updateSong_Request_By_DJ)
  .delete(canAccess, deleteSong_Request_By_DJ);




//exporting the variable defined above which requires the route 
//Node based environment needs to make it accessable with the "Exports"

module.exports = song_requestsRoutes; 




