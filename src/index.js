const express = require('express');
const logger = require('morgan'); //passing data into, recieving from server
const bodyParser = require('body-parser'); //parsing JSON data into a database and converting them into the proper format for use

//Custom Pieces for communication between ./endpoints
const tasksRoutes = require('./routes/tasks.routes');
const middleware = require('./middleware/errors.middleware');

//Optional Pieces for "default" setups
const app = express(); //Initialize the app
const port = process.env.PORT || 3000; //set the port variable // "= use this value(port) OR 3000"
const logLevel = process.env.LOG_LEVEL || 'dev';//log level defined

// Middleware - logs server requests to console
//Optional NEED
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
//NEED!!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Handle routes for tasks.
//BREAD & BUTTER @ ./tasks
//groundwork for creaing basic authenticated API
//Can define any number of endpoint along with their routes 
app.use('/tasks', tasksRoutes); // http://localhost:3000/tasks //Route = API (hit on this endpoint, through this request)
// app.use('/users', usersRoutes); // http://localhost:3000/users

// Handle 404 requests
//Requests made to dev made requests that dont exist 
app.use(middleware.error404); // http://loaclhost:3000/(doesnt exist endpint)

// Handle 500 requests - applies mostly to live services
//If mysql doesn't want to work(save,delete,...) any data, 500 err will hit
app.use(middleware.error500);

// listen on server port
//hits port on 3000 against function
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});