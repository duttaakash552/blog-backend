const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/User');

router.post('/register', userController.addUsers);

router.post('/login', passport.authenticate('local'), userController.loginUser);

router.get('/me', userController.getUser);

router.post('/logout', userController.logoutUser);

module.exports = router;