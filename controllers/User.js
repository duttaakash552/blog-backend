const userModel = require('../models/User');

module.exports.addUsers = async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
        const newUser = await userModel.register({ name, email, username }, password);
        
        res.status(201).json({
            message: 'User registered successfully',
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