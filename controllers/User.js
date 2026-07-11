const userModel = require('../models/User');

module.exports.addUsers = async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
        const newUser = await userModel.register({ name, email, username }, password);

        res.status(201).json({
            message: 'User registration successful',
            data: newUser,
            success: true
        });
    } catch (error) {
        if (error.name === 'UserExistsError') {
            return res.status(409).json({
                message: 'User already exists',
                success: false
            });
        }

        res.status(500).json({
            message: 'Error registering user',
            error: error.message,
            success: false
        });
    }
}

module.exports.loginUser = (req, res) => {
    res.status(200).json({
        message: 'Login successful',
        user: req.user,
        success: true,
    });
}

module.exports.getUser = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: 'Not authenticated',
            success: false
        });
    }

    res.json({
        user: req.user,
        success: true
    });
}

module.exports.logoutUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: 'User not logged in',
            success: false
        });
    }

    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Logout failed',
                    success: false
                });
            }

            res.clearCookie('connect.sid');

            return res.json({
                message: 'Logged out successfully',
                success: true
            });
        });
    });
}