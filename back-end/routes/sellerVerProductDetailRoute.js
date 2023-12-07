const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js'); // ensure this path is correct
const User = require('../models/User.js');

router.get('/seller-product-detail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productDetail = await Product.findById(id);
    if (!productDetail) {
      return res.status(404).send('Product not found.');
    }
    res.json(productDetail); // Directly return the product details
  } catch (error) {
    console.error('Error fetching seller product details:', error);
    res.status(500).send('An error occurred while fetching seller product details.');
  }
});

router.post('/seller-product-detail/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found.');
    }
    product.status = status;
    await product.save();
    res.json({ id, status });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).send('An error occurred while updating product status.');
  }
});

router.post('/seller-product-detail/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    if (product.status !== 'Pending Purchase Approval') {
      return res.status(400).json({ error: 'This item is already sold or not pending approval.' });
    }
    product.status = 'Sold';
    await product.save();
    const buyer = await User.findById(product.buyer);
    if (buyer) {
      console.log(buyer)
      buyer.orderHistory.push(product._id);
      await buyer.save();
    }
    res.json({ message: 'Purchase approved. Product sold.', product });
  } catch (error) {
    console.error('Error approving purchase:', error);

    res.status(500).json({ error: 'An error occurred while approving purchase.' });
  }
});

router.post('/seller-product-detail/:id/deny', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found.');
    }
    if (product.status !== 'Pending Purchase Approval') {
      return res.status(400).send('No pending approval to deny.');
    }
    product.status = 'Available';
    await product.save();
    res.json({ message: 'Purchase denied. Product is now available.', product });
  } catch (error) {
    console.error('Error denying purchase:', error);
    res.status(500).send('An error occurred while denying purchase.');
  }
});

router.delete('/seller-product-detail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found.');
    }
    if (product.status === 'Sold') {
      return res.status(400).send('Cannot delete a sold product.');
    }
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product successfully deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('An error occurred while deleting the product.');
  }
});

module.exports = router;
