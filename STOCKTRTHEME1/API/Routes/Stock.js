const express = require('express')
const router = express.Router()

router.get("/Stock", async (req, res) => {
    try {
        console.log('Stock endpoint called');
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/AAPL,MSFT,GOOGL,AMZN,TSLA,FB,NFLX,NVDA,AMD,INTC,BA,DIS,UBER,LYFT,PYPL,SQ,SHOP,TWTR,ORCL,IBM,SPOT,PLTR,CRM,CSCO,ADBE?apikey=yEctLteSSCQR6nh6VsjKkkXsA7K93dkl`);
        const stocks = await response.json();
        if(!stocks){
            return res.status(404).json({
                error: true,
                message: "No stocks found"
            });
        }
        res.json(stocks);
    } catch (error) {
        console.log('Stock endpoint error:', error);
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
});

module.exports = router;