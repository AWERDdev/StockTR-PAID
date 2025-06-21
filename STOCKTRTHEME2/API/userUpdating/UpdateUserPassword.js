const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

router.get('/routeHealth', (req, res) => {
    res.send('UpdateUserPassword route is healthy and working');
});

router.post('/updatePassword', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        
        const token = authHeader.split(' ')[1];
        const { newPassword } = req.body;
        
        if (!newPassword) {
            return res.status(400).json({message: 'New password is required'});
        }

        // Verify the token and get user ID
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET');
        } catch (jwtError) {
            console.error('JWT verification failed:', jwtError);
            return res.status(401).json({message: 'Invalid token'});
        }

        // Find the user by email (since that's what we store in the token)
        const user = await User.findOne({ email: decoded });
        if (!user) {
            console.error('User not found for email:', decoded);
            return res.status(404).json({message: 'User not found'});
        }
        
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if (!hashedPassword) {
            console.error('Failed to hash password');
            return res.status(400).json({message: 'Failed to hash password'});
        }
        
        // Compare the new password with the current password
        const isSamePassword = await bcrypt.compare(newPassword, user.Password);
        if (isSamePassword) {
            return res.status(400).json({message: 'New password is the same as the old password'});
        }

        // Update the user's password
        user.Password = hashedPassword;
        await user.save();
        
        res.json({message: 'Password updated successfully'});
    } catch (error) {
        console.error('Error in updatePassword route:', error);
        res.status(500).json({
            message: 'Error updating password',
            error: error.message
        });
    }
});

module.exports = router;