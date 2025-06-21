const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel')
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET' //* change this in production State
//* isAuth
router.post("/isAUTH", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token);

    if (!token) {
        console.log("No token provided");
        return res.json({ AUTH: false });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        console.log('Decoded token:', decoded);
        console.log('User search result:', user);

        if (user) {
            console.log('User found:', user);
            res.json({ 
                AUTH: true, 
                UserData: {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            console.log('User not found');
            res.json({ AUTH: false });
        }
    } catch (error) {
        console.log('Error:', error);
        res.json({ AUTH: false });
    }
});
module.exports = router