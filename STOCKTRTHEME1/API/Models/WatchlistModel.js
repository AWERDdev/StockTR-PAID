const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: { 
        type: String, 
        required: true,
        trim: true,
        uppercase: true
    },
    companyName: { 
        type: String, 
        required: true,
        trim: true
    },
    price: { 
        type: Number, 
        required: true
    },
    changes: { 
        type: Number, 
        required: false
    },
    volAvg: { 
        type: Number, 
        required: false
    },
    website: { 
        type: String, 
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Create a compound index on user and symbol to prevent duplicates
watchListSchema.index({ user: 1, symbol: 1 }, { unique: true });

// Prevent model overwrite error
const WatchList = mongoose.models.WatchList || mongoose.model('watchlist', watchListSchema);

module.exports = WatchList;