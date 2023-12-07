const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get('/product-detail/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const productDetail = await Product.findById(id);
      if (!productDetail) {
        return res.status(404).send('Product not found.');
      }
      res.json(productDetail);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send('An error occurred while fetching product details.');
    }
  });

router.post('/product-detail/:id/buy', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).send('Product not found.');
    }
    if (req.user.id === product.user.toString()) {
        return res.status(400).send('Cannot buy your own product.');
    }
    if (product.status === 'Sold' || product.status === 'Pending Purchase Approval') {
        return res.status(400).send('Product is not available for purchase.');
    }
    product.status = 'Pending Purchase Approval';
    await product.save();
    res.json({ message: 'Please wait for seller\'s approval.', product });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).send('An error occurred while updating product status.');
  }
  });
  

module.exports = router;