const express = require('express');
// const authController = require('../controllers/auth.controller');
// const userController = require('../controllers/user.controller');
// const verifyToken = require('../middleware/auth.middleware');
const { getMe, updateMe, updatePassword } = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');
// const { check } = require('express-validator');

const userRoutes = express.Router();

userRoutes.get('/me', canAccess, getMe); //middleware //api/user/me

userRoutes.put('/me/updateMe', canAccess, updateMe);

userRoutes.put('/me/updatePass', canAccess, updatePassword);


module.exports = userRoutes;