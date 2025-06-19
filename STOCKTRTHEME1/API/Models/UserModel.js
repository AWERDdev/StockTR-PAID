const mongoose = require('mongoose');

// Mongoose automatically adds an _id field to every schema
// This _id is a MongoDB ObjectId and is unique for each document
// We don't need to define it in the schema as it's handled automatically
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    trim: true,
    lowercase: true
  },
  Password: { 
    type: String, 
    required: true 
  },
  ICON: { 
    type: String, 
    required: false 
  },

  watchlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'watchlist'
  }]
}, {
  timestamps: true  // This adds createdAt and updatedAt fields automatically
});

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;