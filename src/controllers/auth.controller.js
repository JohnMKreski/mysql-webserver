const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //encrypts password

const con = require('../db-config');
const jwtconfig = require('../jwt-config'); //secret
const authQueries = require('../queries/auth.queries');
const userQueries = require('../queries/user.queries');

exports.registerUser = function(req, res) { 
    const passwordHash = bcrypt.hashSync(req.body.password); //has = string through an alogorithm that creates a new string into a code (encypts then decrypts)

    con.query(
        authQueries.INSERT_NEW_USER, 
        [req.body.username, req.body.email, passwordHash],
        function(err, result) { 
            if (err) {
                //stops registration
                console.log(err);
                res
                    .status(500)
                    .send({
                        msg: 'Could not register user. Please try again later.'
                    });
            } //mysql err
            
            con.query(
                userQueries.GET_ME_BY_USERNAME, 
                [req.body.username],
                function(err, user) { 
                    if (err) {
                        res
                            .status(500)
                            .send({
                                msg: 'Could not retrieve user.'
                            });
                }                
                console.log(user);
                res.send(user);
            }); //else block 
        }
    );
};


exports.login = function(req, res) { 
    //Check user exists
    con.query(
        userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD, 
        [req.body.username],
        function(err, user) { 
            if (err) {
                res
                    .status(500)
                    .send({
                        msg: 'Could not retrieve user.'
                    });
            } //mysql err

            console.log(user);
            //validate entered password from database saved password
            
            bcrypt
                .compare(req.body.password, user[0].password)
                .then(function(validPass) {
                    if (!validPass) {
                        res
                            .status(400)
                            .send({
                                msg: 'Invalid Password.'
                            });
                    }
                    //create token. custom padlock. specific to id. never expose key (secret)
                    const token = jwt.sign({
                        id: user[0].user_id
                    }, jwtconfig.secret);
                    res
                        .header('auth-token', token) // will look like {'auth-token': 'aslkjd76sdghhd39fhdfg48'}
                        .send({
                            auth: true,
                            msg: 'Logged in!'
                        });
                })
                .catch(console.log);
                //promise. async js call 
        }
    );
};


exports.updateUser = function(req, res) { 
    //Check user exists
    //console.log(req.user);
    con.query(
        userQueries.GET_ME_BY_USER_ID_WITH_PASSWORD, 
        [req.user.id],
        function(err, user) { 
            //console.log(err, user);
            if (err) {
                res
                    .status(500)
                    .send({
                        msg: 'Could not retrieve user.'
                    });
            } //mysql err

            console.log(user);
            //validate entered password from database saved password
            //console.log(req.body.username);


            const passwordHash = bcrypt.hashSync(req.body.password);
            
            //Perform Update
            con.query(
                authQueries.UPDATE_USER, 
                [req.body.username, req.body.email, passwordHash, user[0].user_id],
                function(err, result) { 
                    
                    if (err) {
                        console.log(err);
                        res
                            .status(500)
                            .send({
                                msg: 'Could not update user settings.'
                            });
                    } //mysql err
                    console.log(result);
                    //console.log(user);
                    res.json({msg: 'Updated Succesfully!'});
                }
            );
        }
    );
};


