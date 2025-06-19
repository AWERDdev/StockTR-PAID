const express = require('express')
const router = express.Router()
const WatchlistModel = require('../Models/WatchlistModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'

// Get user's watchlist
router.get('/Watchlist', async (req, res) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Verify token and get user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Find watchlist for this user
        const watchlist = await WatchlistModel.find({ user: userId });
        
        // Explicitly handle empty watchlist
        if (!watchlist || watchlist.length === 0) {
            console.log("Watchlist is empty");
            return res.status(200).json([]);
        }

        console.log("Watchlist retrieved successfully");
        res.status(200).json(watchlist);

    } catch (error) {
        console.log(`Failed to fetch watchlist: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// Add or update watchlist
router.post('/WatchlistUpdate', async (req, res) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Verify token and get user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const { watchlist } = req.body;
        
        // Process each stock in the watchlist
        for (const stock of watchlist) {
            await WatchlistModel.findOneAndUpdate(
                { 
                    user: userId,
                    symbol: stock.symbol 
                },
                {
                    user: userId,
                    symbol: stock.symbol,
                    companyName: stock.companyName,
                    price: stock.price,
                    changes: stock.changes,
                    volAvg: stock.volAvg,
                    website: stock.website
                },
                { 
                    upsert: true, // Create if doesn't exist
                    new: true // Return the updated document
                }
            );
        }
        
        // Get the updated watchlist
        const updatedWatchlist = await WatchlistModel.find({ user: userId });
        res.status(201).json({ message: "Watchlist updated", data: updatedWatchlist });
    } catch (error) {
        console.log(`Failed to update watchlist: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// Remove stock from watchlist
router.delete('/Watchlist/:symbol', async (req, res) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Verify token and get user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const { symbol } = req.params;

        // Find and delete the specific stock from user's watchlist
        const result = await WatchlistModel.findOneAndDelete({
            user: userId,
            symbol: symbol
        });

        if (!result) {
            return res.status(404).json({ error: "Stock not found in watchlist" });
        }

        console.log(`Stock ${symbol} removed from watchlist successfully`);
        res.status(200).json({ message: "Stock removed from watchlist", symbol });

    } catch (error) {
        console.log(`Failed to remove stock from watchlist: ${error}`);
        res.status(500).json({ error: error.message });
    }
});
    
module.exports = router