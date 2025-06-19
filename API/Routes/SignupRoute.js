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

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json({
                message: "This email is already registered",
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
        res.status(400).json({
            message: "Failed to signup please try again",
            AUTH: false
        })
    }
})
module.exports = router