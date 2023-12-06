const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/product-detail/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const productDetail = await Product.findById(id); // Assuming `id` is MongoDB's _id
      if (!productDetail) {
        return res.status(404).send('Product not found.');
      }
      res.json(productDetail);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send('An error occurred while fetching product details.');
    }
  });

  router.post('/product-detail/:id/buy', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send('Product not found.');
      }
      if (product.status !== 'Available') {
        return res.status(400).send('Product is not available for purchase.');
      }
      product.status = 'Pending Purchase Approval';
      await product.save();
      res.json({ message: 'Please wait for seller approval.', product });
    } catch (error) {
      console.error('Error updating product status:', error);
      res.status(500).send('An error occurred while updating product status.');
    }
  });
  

module.exports = router;
