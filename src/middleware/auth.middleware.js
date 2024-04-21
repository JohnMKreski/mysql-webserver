const { jwtconfig, verifyToken } = require('../utils/jwt-helpers');

module.exports = (req, res, next) => {
  const authHeader = req.headers['auth-token'] || req.headers['authorization'];

  // undefined === false
  if (!authHeader) {
    // stop user auth validation
    res
      .status(401)
      .json({ auth: false, msg: 'Access Denied. No token provided.' });
  }

  const accessToken = authHeader.split(' ')[1]; 
  //split the string by an '*space*'
  //[1] taking second index in array

    //try catch is a conditinal statement that will allow the app to run but show an error
    //wont kill the app on err 
    //next is only needed for chaining middleware
  try {
    // verify the token is correct
    // { id: '1', iat: 'vds6s87;} iat is a unique identifier for jwt
    const user = verifyToken(accessToken, jwtconfig.access, req, res); //decoded  {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid Token' });
  }
};