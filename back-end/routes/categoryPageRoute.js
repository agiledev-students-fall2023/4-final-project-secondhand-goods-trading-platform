const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint for item listings, can filter category during database integration
router.get('/category/:category', async (req, res) => {
    //const { category } = req.params;
  try {
    // Fake it with picsum API
    const response = await axios.get("https://picsum.photos/v2/list?page=3&limit=100");
    // Return the data to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching item listings:', error);
    res.status(500).send('An error occurred while fetching item listings.');
  }
});

module.exports = router;
