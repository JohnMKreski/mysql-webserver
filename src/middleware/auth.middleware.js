const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt-config');

//next is only needed for chaining middleware
module.exports = function(req, res, next) {
    const token = req.headers['auth-token'];

    if (!token) {
        //stop user authenication
        res.status(401).send({auth: false, msg: 'Access Denied'});
    }

    //try catch is a conditinal statement that will allow the app to run but show an error
    //wont kill the app on err 
    try {
        //return the user's id when creating the token
        const verified = jwt.verify(token, jwtconfig.secret); 
        // { id: '1', iat: 'vds6s87;} iat is a unique identifier for jwt
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ msg: 'Invalid Token' });
    }
};