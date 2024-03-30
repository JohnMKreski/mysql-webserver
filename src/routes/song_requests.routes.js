const controllers = require('../controllers/song_requests.controller');
const express = require('express');

const song_requestsRoutes = express.Router(); //defines route for express APP(API)

//use any routes that are defines, use a get request @ '/' (/song_requests/), perform."this function"  if post(perform this function)
song_requestsRoutes.get('/', controllers.getAllSong_Requests).post('/', controllers.createSong_Requests);

song_requestsRoutes
  .get('/:song_requestsId', controllers.getSong_Requests) // GET http://locahost:3000/song_requests/1
  .put('/:song_requestsId', controllers.updateSong_Requests) 
  .delete('/:song_requestsId', controllers.deleteSong_Requests);

//exporting the variable defined above which requires the route 
//Node based environment needs to make it accessable with the "Exports"
module.exports = song_requestsRoutes; 

//console.log(module.exports);