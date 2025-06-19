//* packages
const express = require("express");
const app = express();
const cors = require("cors");
const port  = process.env.PORT || 3500;

//* CORS
// CORS configuration
const corsOptions = {
    origin: [
      'http://localhost:3000',  // Next.js default port
      'http://localhost:3001',  // Alternative port
      'http://192.168.1.12:3000',
      'https://your-frontend-domain.com' // Production domain
    ],
    credentials: true,
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));

//* DB
const connectDB = require('./DB/DB')
connectDB()
//* Middlewear
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//* routes
app.get("/",(req,res)=>{
    res.json({message:"welcome to the stock market API 👍👍"});
})
// Import routes
const signupRoute = require("./Routes/SignupRoute");
const loginRoute = require("./Routes/LoginRoute");
const Stock = require("./Routes/Stock");
const UserAuth = require("./AUTH/UserAuth");
const UserWatchlist = require("./userUpdating/UserWatchlist");
const UpdateUserPassword = require("./userUpdating/UpdateUserPassword");
const UserProfileIcon = require('./userUpdating/UserProfileIcon');

app.use('/api',signupRoute)
app.use('/api',loginRoute)
app.use('/api',Stock)
app.use('/api',UserAuth)
app.use('/api',UserWatchlist)
app.use('/api',UpdateUserPassword)
app.use('/api', UserProfileIcon);


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
