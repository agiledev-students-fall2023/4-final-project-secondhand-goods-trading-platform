const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');

router.get('/item-listings', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("Fetched Products:", products); // This line logs the fetched data
    res.json(products);
  } catch (error) {
    console.error('Error fetching item listings:', error);
    res.status(500).send('An error occurred while fetching item listings.');
  }
});

module.exports = router;
