const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel')
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET' //* change this in production State

//* login
router.post("/login", async(req,res)=>{
    try {
        const {Email, Password} = req.body
        const user = await User.findOne({email: Email})
        
        if (!user) {
            return res.status(401).json({ 
                message: "Invalid credentials",
                AUTH: false 
            });
        }

        const isValidPassword = await bcrypt.compare(Password, user.Password)
        
        if (isValidPassword) {
            // Create token using user's ID
            const token = jwt.sign({ id: user._id }, JWT_SECRET)
            
            res.json({ 
                token: token,
                AUTH: true,
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ 
                message: "Invalid credentials",
                AUTH: false 
            });
        }
    } catch(error) {
        res.status(400).json({ 
            message: "Invalid credentials",
            error: error.message,
            AUTH: false
        });
    }
})

module.exports = router