// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


// we will put some server logic here later...
app.use(cors()); // Enable CORS for all origins in case of different ports
app.use(express.json()); 
app.use('/api', authRoutes);


// export the express app we created to make it available to other modules
module.exports = app