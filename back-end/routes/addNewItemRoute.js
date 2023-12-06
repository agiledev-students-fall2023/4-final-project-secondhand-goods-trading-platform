const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb (null, file.originalname);
    }
});

const upload = multer({ storage: storage }).array('image', 4); // Allow up to 4 images

const productValidationMiddlewares = [
    body('productName').trim().isLength({ min: 1, max: 20 }).withMessage('Please enter a valid ame.'),
    body('Category').not().isEmpty().withMessage('Please select a category.'),
    body('Price').isFloat({ min: 0.01 }).withMessage('Please enter a valid price.'),
    body('Description').not().isEmpty().withMessage('Description cannot be empty.')
];

router.post('/add-new-item', upload, productValidationMiddlewares, async (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { productName, Category, Price, Description } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Please upload at least one picture.' });
    }

    // Retrieve the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Please log in first.' });
    }

    try {
        // Verify and decode the token to get the user's ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = decoded.id;

        const imagePaths = files.map(file => file.originalname);

        // Create a new product 
        const newProduct = new Product({
            productName: productName,
            category: Category,
            price: parseFloat(Price).toFixed(2),
            description: Description,
            imagePaths: imagePaths,
            user: userId // associate the product with the user's ID
        });
        // Save the product
        const savedProduct = await newProduct.save();

        // Push the product's ObjectId to the user's products array
        await User.findByIdAndUpdate(userId, { $push: { products: savedProduct._id } });

        return res.status(201).json({
            message: "New product added successfully",
            product: newProduct
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        // other errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the product.' });
    }
});

router.use('../uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;