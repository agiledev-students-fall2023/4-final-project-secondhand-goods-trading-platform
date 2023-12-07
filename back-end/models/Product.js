const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  category: String,
  price: Number,
  description: String,
  imagePaths: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model who is the buyer
    default: null // Initially set to null, meaning no buyer yet
  },
  status: {
    type: String,
    default: 'Available', // Default status is 'Available'
    enum: ['Available', 'Pending Purchase Approval', 'Sold']
  }
});

module.exports = mongoose.model('Product', productSchema);