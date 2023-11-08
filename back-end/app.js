// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const itemListingRoute = require('./routes/itemListingRoute');
const buyerVerProductDetailRoute = require('./routes/buyerVerProductDetailRoute');
const sellerVerProductDetailRoute = require('./routes/sellerVerProductDetailRoute');


// we will put some server logic here later...
app.use(cors()); // Enable CORS for all origins in case of different ports
app.use(express.json()); 
app.use('/api', authRoutes);
app.use('/api', itemListingRoute); 
app.use('/api', buyerVerProductDetailRoute);
app.use('/api', sellerVerProductDetailRoute);

// export the express app we created to make it available to other modules
module.exports = app