const express = require('express');
const router = express.Router();

const blogController = require('../controllers/Blog');

router.post('/', blogController.createBlog);

router.get('/', blogController.getUserBlogs);

router.get('/all', blogController.allBlogPosts);

router.get('/details/:blogId', blogController.blogDetails);

router.delete('/:blogId', blogController.deleteBlog);

router.get('/:blogId', blogController.getBlogById);

router.put('/:blogId', blogController.updatePost);

module.exports = router;