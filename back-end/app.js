// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const itemListingRoute = require('./routes/itemListingRoute');
const buyerVerProductDetailRoute = require('./routes/buyerVerProductDetailRoute');
const sellerVerProductDetailRoute = require('./routes/sellerVerProductDetailRoute');
const mySellingItemsRoute = require('./routes/mySellingItemsRoute')
const categoryPageRoute = require('./routes/categoryPageRoute')
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
app.use('/api', categoryPageRoute);
app.use('/api', addNewItemRoute);
app.use('/api', accountRoute);
app.use('/api', editProfileRoute);
// export the express app we created to make it available to other modules
module.exports = app