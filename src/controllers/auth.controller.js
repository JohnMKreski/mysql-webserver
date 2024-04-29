const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const {
  GET_ME_BY_USERNAME,
  GET_ME_BY_USERNAME_WITH_PASSWORD,
  INSERT_NEW_USER,
} = require('../queries/user.queries');
const query = require('../utils/query');
const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt-helpers');

exports.register = async (req, res) => {
  // params setup
  const passwordHash = bcrypt.hashSync(req.body.password); //encypts pw
  const params = [req.body.username, req.body.email, passwordHash];

  // establish a connection
  // wait for connection to be established before query can do anything
  // first runner with batton
  const con = await connection().catch((err) => {
    console.error('Error establishing connection:', err);
    throw err;
  });

  // check for existing user first
  //second runner grabs the batton 
  const user = await query(con, GET_ME_BY_USERNAME, [req.body.username]).catch(
    (err) => {
      console.error('Error retrieving user:', err);
      res.status(500).json({ msg: 'Could not retrieve user.' });
    }
  );

  // if we get one result back
  // gets a single user array = to 1 item in array.length
  if (user.length === 1) {
    console.log('User already exists');
    res.status(403).json({ msg: 'User already exists!' });
  } else {
    // add new user
    //other wise create 
    //if statement makes the const user finish the race before con result can start
    //otherwise result to finish before user
    const result = await query(con, INSERT_NEW_USER, params).catch((err) => {
      //   stop registeration
      console.error('Error registering user:', err);
      res
        .status(500)
        .json({ msg: 'Could not register user. Please try again later.' });
    });

    if (result.affect === 1) {
      console.log('New user created successfully');
        res.json({ msg: 'New user created!' });
    }
  }
};

exports.login = async (req, res) => {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user first
  const user = await query(con, GET_ME_BY_USERNAME_WITH_PASSWORD, [
    req.body.username,
  ]).catch((err) => {
    res.status(500);
    res.json({ msg: 'Could not retrieve user.' });
  });

  // if the user exists
  /// ===1 = maximum of one user 
  if (user.length === 1) {
    //   validate entered password from database saved password
    // .compare is also a promise
    const validPass = await bcrypt
      .compare(req.body.password, user[0].password)
      .catch((err) => {
        res.json(500).json({ msg: 'Invalid password!' });
      });
    
    //if password is false do this
    if (!validPass) {
      res.status(400).json({ msg: 'Invalid password!' });
    }

    // create token
    // tokens can exist forever! 
    // need refresh so they can get a new token after a while off the app
    // Amazon, Facebook, etc... they will ask to confirm password after a set expire time 
    const accessToken = generateAccessToken(user[0].user_id, user[0].role_type, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    const refreshToken = generateRefreshToken(user[0].user_id, user[0].role_type, {
      expiresIn: 86400,
    });

    refreshTokens.push(refreshToken); //refreshToken is a cached arrary

    res
      .header('access_token', accessToken) // ex.: { 'aut-token': 'lksnenha0en4tnoaeiwnlgn3o4i'}
      .json({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 86400,
        refresh_token: refreshToken,
        userRole: user[0].role_type
      });
  }
};

exports.token = (req, res) => {
  const refreshToken = req.body.token; //making sure the req body has the refreshToken in it 

  // stop user auth validation if no token provided
  if (!refreshToken) {
    res
      .status(401)
      .json({ auth: false, msg: 'Access Denied. No token provided.' });
  }

  // stop refresh is refresh token invalid
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({ msg: 'Invalid Refresh Token' });
  }

  const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

  if (verified) {
    const accessToken = generateToken(user[0].user_id, user[0].role_type, { expiresIn: 86400 });
    res
      .header('access_token', accessToken) // ex.: { 'aut-token': 'lksnenha0en4tnoaeiwnlgn3o4i'}
      .json({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 20,
        refresh_token: refreshToken,
      });
  }
  res.status(403).json({ msg: 'Invalid Token' });
};

exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken); //list of tokens stored

  /**
   * [
   *   'token1',
   *   'token2', <-- refreshToken being 'popped out'
   *   'token3',
   *    ...
   * ]
   */

  res.json({ msg: 'Logout successful' });
};


