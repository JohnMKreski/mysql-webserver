const controllers = require('../controllers/tasks.controller');
const express = require('express');

const tasksRoutes = express.Router(); //defines route for express APP(API)
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */

//use any routes that are defines, use a get request @ '/' (/tasks/), perform."this function"  if post(perform this function)
tasksRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);  
//sending in responses/requests
//controllers control the request and response for endpoints/paths we are hitting

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */

//Any GROUP requests with an ID ('/:taskID')
//Can chain or specify 
//Specify: tasksRoutes.get(); tasksRoutes.put(); ...
tasksRoutes
  .get('/:taskId', controllers.getTask) // GET http://locahost:3000/tasks/1
  .put('/:taskId', controllers.updateTask) //'/:tasksID
  .delete('/:taskId', controllers.deleteTask);


//exporting the variable defined above which requires the route 
module.exports = tasksRoutes; //Node based environment needs to make it accessable with the "Exports"