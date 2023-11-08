const express = require('express');
const router = express.Router();

// hardcode the product information in the back-end for now.
const products = [];

router.post('/add-new-item', (req, res) => {
    const { productName, Category, Price, Description } = req.body;

    const newProduct = {
        id: products.length + 1, // temporary id
        productName: productName,
        category: Category,
        price: parseFloat(Price).toFixed(2), //two decimal places
        description: Description,
        
    };
    products.push(newProduct);

    res.status(201).json({
        message: "New product added successfully",
        product: newProduct
    });



});

module.exports = router;