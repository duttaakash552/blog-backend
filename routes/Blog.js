const express = require('express');
const router = express.Router();

const blogController = require('../controllers/Blog');

router.post('/', blogController.createBlog);

module.exports = router;