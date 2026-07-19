const express = require('express');
const router = express.Router();

const blogController = require('../controllers/Blog');

router.post('/', blogController.createBlog);

router.get('/', blogController.getUserBlogs);

router.delete('/:blogId', blogController.deleteBlog);

module.exports = router;