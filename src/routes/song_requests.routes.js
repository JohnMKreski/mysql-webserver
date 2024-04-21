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
song_requestsRoutes.get('/', canAccess, getAllSong_Requests_By_User).post('/', canAccess, createSong_Request_By_User);

//TODO: Get All request from Guest User
// song_requestsRoutes.get('/', getAllSong_Requests).post('/', canAccess, createSong_Request);


/**
 * Routes for a song by id. Evalutes to `/song_requests/:songId`.
 */
song_requestsRoutes
  .get('/:songId', canAccess, getSong_Request_By_User) // GET http://locahost:3000/song_requests/1
  .put('/:roleType', canAccess, updateSong_Request_By_User, updateSong_Request_By_DJ) 
  .delete('/:roleType', canAccess, deleteSong_Request_By_DJ);


//exporting the variable defined above which requires the route 
//Node based environment needs to make it accessable with the "Exports"

module.exports = song_requestsRoutes; 




