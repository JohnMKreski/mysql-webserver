const express = require('express');
// const authController = require('../controllers/auth.controller');
// const userController = require('../controllers/user.controller');
// const verifyToken = require('../middleware/auth.middleware');
const { getMe, updateMe } = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes.get('/me', canAccess, getMe); //middleware //api/user/me

userRoutes.post('/me/update', canAccess, updateMe);

module.exports = userRoutes;