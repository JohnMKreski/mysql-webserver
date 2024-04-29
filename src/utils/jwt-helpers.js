const jwt = require('jsonwebtoken');

// jwt secrets for initial token and refresh tokens
//these two "locks" will unlock two different tokens (padlocks)
const jwtconfig = {
  access: 'reallysecretaccesssecret',
  refresh: 'reallysecretrefreshsecret',
};

// store for refresh tokens created
// cache
const refreshTokens = [];

/**
 * expireIn is an object that can be a string or number in seconds
 *
 * usage: {@link https://www.npmjs.com/package/jsonwebtoken}
 *
 * example:
 *  { expiresIn: 86400 } for 24 hours in seconds
 */
// create a new auth token
const generateAccessToken = (id, role_type, expiresIn) =>
  jwt.sign({ id, role_type }, jwtconfig.access, expiresIn);

// create a new re-auth token
const generateRefreshToken = (id, role_type, expiresIn) =>
  jwt.sign({ id, role_type }, jwtconfig.refresh, expiresIn);

// check token validity
const verifyToken = (token, secret, req, res) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    res.status(500).send({ auth: false, message: 'Invalid token.' });
  }
};

module.exports = {
  jwtconfig,
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};