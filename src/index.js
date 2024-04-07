const express = require('express');
const cors = require('cors');
const logger = require('morgan'); //passing data into, recieving from server //morgan is an npm module
const bodyParser = require('body-parser'); //parsing JSON data into a database and converting them into the proper format for use

//Custom Pieces for communication between ./endpoints

const song_requestsRoutes = require('./routes/song_requests.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const middleware = require('./middleware/errors.middleware');

//Optional Pieces for "default" setups

const app = express(); //Initialize the app
const port = process.env.PORT || 3000; //set the port variable // "= use this value(port) OR 3000"
const logLevel = process.env.LOG_LEVEL || 'dev';//log level defined

// Middleware - logs server requests to console
//Optional NEED

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Specify the directory where your EJS files are located


app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
//NEED!!

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//allow websites to talk to our api service
//middleware to allow from any ip address 
app.use(cors());

// Handle routes for tasks.
//BREAD & BUTTER @ ./tasks
//groundwork for creaing basic authenticated API
//Can define any number of endpoint along with their routes 
//Route = API (hit on this endpoint, through this request)
//Partial API Endpoints 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/song_requests', song_requestsRoutes); 

// app.use('/users', usersRoutes); //If Needed. hits on --> http://localhost:3000/users

// Handle 404 requests
//Requests made to dev made requests that dont exist 

app.use(middleware.error404); // http://loaclhost:3000/(doesnt exist endpint)

// Handle 500 requests - applies mostly to live services
//If mysql doesn't want to work(save,delete,...) any data, 500 err will hit

app.use(middleware.error500);

// listen on server port
//hits port on 3000 against function

app.listen(port, function() {
  console.log(`(index.js) Running on port: ${port}...`);
});