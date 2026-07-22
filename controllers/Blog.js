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

module.exports.getBlogById = async (req, res) => {
    const { blogId } = req.params;
    const userId = req.user._id;

    try {
        const blogData = await Blog.findOne({ _id: blogId, author: userId }).select('-_id title content');

        if (!blogData) {
            return res.status(200).json({
                message: 'Invalid Blog Post',
                success: false
            });
        }

        res.status(200).json({
            message: 'Retrived blog post',
            data: blogData,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports.updatePost = async (req, res) => {
    const { blogId } = req.params;
    const { title, content } = req.body;

    try {
        await Blog.updateOne({ _id: blogId }, { title, content });

        res.status(200).json({
            message: 'Blog post updated',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports.allBlogPosts = async (req, res) => {
    try {
        const blogs = await Blog.find().select('title content author').populate('author', 'username').sort({ created_at: -1 }).limit(10);

        res.status(200).json({
            message: 'All blog posts',
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

module.exports.blogDetails = async (req, res) => {
    const { blogId } = req.params;

    try {
        const blog = await Blog.findById(blogId).populate('author');

        res.status(200).json({
            message: "Blog details fetched",
            data: blog,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}