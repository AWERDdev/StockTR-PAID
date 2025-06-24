const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel')
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET' //* change this in production State
//* signup 
router.post("/signup", async(req,res)=>{
    try {
        console.log("Starting signup process")
        const {username, name, email, password} = req.body
        console.log("Got user data:", {username, name, email})

        // Check for existing email
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(409).json({
                message: "Email already in use",
                field: "email",
                AUTH: false
            });
        }
        // Check for existing username
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(409).json({
                message: "Username already in use",
                field: "username",
                AUTH: false
            });
        }
        console.log("Checking if user exists")
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: username,
            name: name,
            email: email,
            Password: hashedPassword
        })
        console.log("About to save user")
        
        await newUser.save()
        console.log("User saved successfully with ID:", newUser._id)

        // Create token using the automatically generated _id
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET)
        console.log("Created token with user ID:", newUser._id)
        
        res.json({
            token: token,
            AUTH: true,
            user: {
                id: newUser._id,  // This is the automatically generated MongoDB _id
                username: newUser.username,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch(error) {
        console.log("Error details:", error)
        // Handle duplicate key error from MongoDB
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            let message = "Duplicate value";
            if (field === "email") message = "Email already in use";
            else if (field === "username") message = "Username already in use";
            return res.status(409).json({
                message,
                field,
                AUTH: false
            });
        }
        res.status(400).json({
            message: "Failed to signup please try again",
            AUTH: false
        })
    }
})
module.exports = router