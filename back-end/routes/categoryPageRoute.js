const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');

router.get('/category/for/:category', async (req, res) => {
    
  try {
    const category = req.params.category;

    const products = await Product.find({ category: category });
    console.log("Fetched Products in category:", category, products); 

    res.json(products);
  } catch (error) {
    
    console.error('Error fetching item listings:', error);
    res.status(500).send('An error occurred while fetching item listings.');
  
  }
});

module.exports = router;
