const express = require('express');
const router = express.Router();
const axios = require('axios');

// Placeholder for item status, in real use this would be replaced with database logic
const itemStatuses = {};

// Endpoint to fetch product details
router.get('/seller-product-detail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Simulate fetching from an external API or database
    const response = await axios.get(`https://picsum.photos/id/${id}/info`);
    const productDetail = {
      ...response.data,
      status: itemStatuses[id] || "Available" // Default status is 'Available'
    };
    res.json(productDetail);
  } catch (error) {
    console.error('Error fetching seller product details:', error);
    res.status(500).send('An error occurred while fetching seller product details.');
  }
});

// Endpoint to update product status
router.post('/seller-product-detail/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  itemStatuses[id] = status; // In a real app, update the database
  res.json({ id, status });
});

module.exports = router;