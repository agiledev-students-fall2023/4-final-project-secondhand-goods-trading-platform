const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint for my selling item listings
router.get('/my-selling-items', async (req, res) => {
    try {
      // use picsum API for demonstration for now
      const response = await axios.get("https://picsum.photos/v2/list?page=3&limit=100");
      // Return the data to the frontend
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching my selling items:', error);
      res.status(500).send('An error occurred while fetching my selling items.');
    }
  });
  
  module.exports = router;