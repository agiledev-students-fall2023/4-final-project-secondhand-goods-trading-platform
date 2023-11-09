const express = require('express');
const router = express.Router();
const axios = require('axios');

const itemStatuses = {};

router.get('/seller-product-detail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://picsum.photos/id/${id}/info`);
    const productDetail = {
      ...response.data,
      status: itemStatuses[id] || "Available" 
    };
    res.json(productDetail);
  } catch (error) {
    console.error('Error fetching seller product details:', error);
    res.status(500).send('An error occurred while fetching seller product details.');
  }
});

router.post('/seller-product-detail/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  itemStatuses[id] = status;
  res.json({ id, status });
});

module.exports = router;