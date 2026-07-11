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