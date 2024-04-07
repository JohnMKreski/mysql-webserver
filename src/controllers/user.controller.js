const jwt = require('jsonwebtoken');

const con = require('../db-config');
const jwtconfig = require('../jwt-config');
const userQueries = require('../queries/user.queries');

exports.getMe = function(req, res) { 
    const token = req.headers['auth-token']; 

    if (!token) {
        //Stop User Auth Validation
        res.status(401).send({
            auth: false, msg: 'No Token Provided.'
        });
    }

    jwt.verify(token, jwtconfig.secret, function (err, decoded) {
        if (err) {
            res
            .status(500)
            .send({
                auth: false,
                msg: 'Failed to authenticate token.'
            });
        }


        con.query(
            userQueries.GET_ME_BY_USER_ID, 
            [decoded.id],
            function(err, user) { 
                console.log(user);
                if (err) {
                    res
                        .status(500)
                        .send({
                            auth: false, 
                            msg: 'Could not find the user.'
                        });
                }
                if (!user) {
                    res
                        .status(400)
                        .send ({
                            msg: 'No user found.'
                        });
                }
                res.status(200).send(user);
            }
        );

    });
};
