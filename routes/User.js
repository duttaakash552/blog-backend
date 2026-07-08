const express = require('express');
const router = express.Router();

const userController = require('../controllers/User');

router.post('/register', userController.addUsers);

module.exports = router;