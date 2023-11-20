// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require('cors');
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env


// the following are used for authentication with JSON Web Tokens
const jwt = require("jsonwebtoken")
const passport = require("passport")

// use this JWT strategy within passport for authentication handling
const jwtStrategy = require("./config/jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// tell express to use passport middleware
app.use(passport.initialize())

// mongoose models for MongoDB data manipulation
const mongoose = require("mongoose")
const User = require("./models/User.js")

// connect to the database
// console.log(`Conneting to MongoDB at ${process.env.MONGODB_URI}`)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB.`);
  })
  .catch(err => {
    console.log(`Error connecting to MongoDB user account authentication will fail: ${err}`);
  });



// set up some useful middleware
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style


// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

const authRoutes = require('./routes/authRoutes');
const itemListingRoute = require('./routes/itemListingRoute');
const buyerVerProductDetailRoute = require('./routes/buyerVerProductDetailRoute');
const sellerVerProductDetailRoute = require('./routes/sellerVerProductDetailRoute');
const mySellingItemsRoute = require('./routes/mySellingItemsRoute')
//const categoryPageRoute = require('./routes/categoryPageRoute')
const addNewItemRoute= require('./routes/addNewItemRoute');
const accountRoute= require('./routes/accountRoute');
const editProfileRoute = require('./routes/editProfileRoute');
//const { default: EditProfile } = require("../front-end/src/components/EditProfile/EditProfile");

// we will put some server logic here later...
app.use(cors()); // Enable CORS for all origins in case of different ports
app.use(express.json()); 
app.use('/api', authRoutes);
app.use('/api', itemListingRoute); 
app.use('/api', buyerVerProductDetailRoute);
app.use('/api', sellerVerProductDetailRoute);
app.use('/api', mySellingItemsRoute);
//app.use('/api', categoryPageRoute);
app.use('/api', addNewItemRoute);
app.use('/api', accountRoute);
app.use('/api', editProfileRoute);
// export the express app we created to make it available to other modules
module.exports = app