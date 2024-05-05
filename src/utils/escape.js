const escape = require('mysql').escape;

/**
 * Escape all request body values so mysql is happy.
 *
 * @example
 * {
 *    username: 'admin',
 *    password: 'password',
 *    email: 'admin@example.com'
 *    //(key): '(value)'
 * }
 * 
 * 1. ['username', 'password', 'email']
 * 2. Iterate/Loop over each individual key
 * 3. Takes the accumulator and bind key-value pairs onto the object
 * 
 * 
 * result: //wrapped in quotes 
 * {
 *    username: "'admin'",
 *    password: "'password'",
 *    email: "'admin@example.com'"
 * }
 *
 * This will reassign values on the body object wil new values.
 */
module.exports = (body) => {
  return Object.keys(body).reduce((acc, key) => {
    acc[key] = escape(body[key]);
    return acc;
  }, {});
};

/**
 * .reduce is a *higher order function 
 *  *they help us manipulate data to build algorithms 
 * 
 * .reduce(accumuilator, key) //accumuilator stores values progressivley
 * 
 * 
 * ...(acc, key) => {
    acc[key] = escape(body[key]);
    return acc;
  } //callback function 
 *
 *
 * ..., {}); //makes the acc an empty object
 * ..., []); //makes the acc an empty array
 * ..., 0); //makes the acc an empty number 
 * ..., ''); //makes the acc an empty string
 * 
 */