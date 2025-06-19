const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'

// Configure multer for memory storage (to get file buffer)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/UserProfileIcon', async (req, res) => {
    console.log('UserProfileIcon route called')
    res.status(200).json({ message: 'UserProfileIcon route called' })
})

router.post('/updateProfileIcon', verifyToken, upload.single('icon'), async (req, res) => {
    try {
        console.log('profile icon update route called')
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('File uploaded:', {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });
        
        const userId = req.user.id;
        console.log('userId:', userId)
        
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        console.log('user before update:', user)
        
        // Convert file buffer to base64 string for database storage
        const base64Icon = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        user.ICON = base64Icon;
        await user.save()
        
        console.log('user updated:', user)
        
        res.status(200).json({ 
            message: 'Profile icon updated successfully',
            mimetype: req.file.mimetype,
            size: req.file.size
        })

    } catch(error) {
        console.log('error:', error)
        res.status(500).json({ message: 'Failed to update profile icon' })
    }
})

router.get('/getProfileIcon', verifyToken, async (req, res) => {
    try {
        console.log('get profile icon route called')
        
        const userId = req.user.id;
        console.log('userId:', userId)
        
        const user = await User.findById(userId)
        if (!user || !user.ICON) {
            return res.status(404).json({ message: 'Profile icon not found' });
        }
        
        console.log('user:', user)
        console.log('icon exists:', !!user.ICON)

        // Return the base64 icon data
        res.status(200).json({ 
            message: 'Profile icon retrieved successfully', 
            icon: user.ICON 
        });

    } catch(error) {
        console.log('error:', error)
        res.status(500).json({ message: 'Failed to get profile icon' })
    }
})

module.exports = router