const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  category: String,
  price: Number,
  description: String,
  imagePath: String,
});

module.exports = mongoose.model('Product', productSchema);