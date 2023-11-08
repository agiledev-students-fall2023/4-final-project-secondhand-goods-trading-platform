const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint to fetch product details
router.get('/product-detail/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Using Picsum for illustration as per existing frontend logic
      const response = await axios.get(`https://picsum.photos/id/${id}/info`);
      const productDetail = response.data;
      // Here you can format or select specific fields to send
      res.json(productDetail);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send('An error occurred while fetching product details.');
    }
  });
  
  module.exports = router;