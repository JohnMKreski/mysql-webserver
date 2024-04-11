const express = require('express');
const {
  getAllSong_Requests,
  createSong_Request,
  getSong_Request,
  updateSong_Request,
  deleteSong_Request
} = require('../controllers/song_requests.controller');
const canAccess = require('../middleware/auth.middleware');

const song_requestsRoutes = express.Router(); //defines route for express APP(API)


/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
//use any routes that are defines, use a get request @ '/' (/song_requests/), perform."this function"  if post(perform this function)
song_requestsRoutes.get('/', canAccess, getAllSong_Requests).post('/', canAccess, createSong_Request);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
song_requestsRoutes
  .get('/:song_requestsId', canAccess, getSong_Request) // GET http://locahost:3000/song_requests/1
  .put('/:song_requestsId', canAccess, updateSong_Request) 
  .delete('/:song_requestsId', canAccess, deleteSong_Request);


//exporting the variable defined above which requires the route 
//Node based environment needs to make it accessable with the "Exports"

module.exports = song_requestsRoutes; 

