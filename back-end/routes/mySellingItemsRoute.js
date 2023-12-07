const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

// authenticate 
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

// Endpoint for my selling item listings
router.get('/my-selling-items', authenticate, async (req, res) => {

  const userId = req.user.id;
  
  try {
    const products = await Product.find({ user: userId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching my selling items:', error);
    res.status(500).send('An error occurred while fetching my selling items.');
  }
  
});
  
  module.exports = router;