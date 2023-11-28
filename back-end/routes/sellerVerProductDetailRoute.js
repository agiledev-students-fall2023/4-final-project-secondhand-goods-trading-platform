const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js'); // ensure this path is correct

const itemStatuses = {}; // to store status separately

router.get('/seller-product-detail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productDetail = await Product.findById(id); // Fetch product details from MongoDB
    if (!productDetail) {
      return res.status(404).send('Product not found.');
    }
    // Add status to the product details
    const productWithStatus = {
      ...productDetail.toObject(),
      status: itemStatuses[id] || "Available" 
    };
    res.json(productWithStatus);
  } catch (error) {
    console.error('Error fetching seller product details:', error);
    res.status(500).send('An error occurred while fetching seller product details.');
  }
});

router.post('/seller-product-detail/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  itemStatuses[id] = status; // Update the status
  res.json({ id, status });
});

module.exports = router;
