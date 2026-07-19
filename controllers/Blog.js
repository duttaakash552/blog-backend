const Blog = require('../models/Blog');

module.exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user._id;

    try {
        const newBlog = new Blog({
            title,
            content,
            author
        });

        await newBlog.save();

        res.status(201).json({
            message: 'Blog created successfully',
            data: newBlog,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports.getUserBlogs = async (req, res) => {
    const userId = req.user._id;

    try {
        const blogs = await Blog.find({ author: userId });

        res.status(200).json({
            message: 'Blogs retrieved successfully',
            data: blogs,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports.deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({
            message: 'Blog deleted successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}