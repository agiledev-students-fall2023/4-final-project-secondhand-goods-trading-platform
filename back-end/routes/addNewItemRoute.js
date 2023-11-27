const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const { body, validationResult } = require('express-validator');

// hardcode the product information in the back-end for now.
const products = [];

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb (null, file.originalname);
    }
});

const upload = multer({ storage: storage})

const productValidationMiddlewares = [
    body('productName').trim().isLength({ min: 1, max: 20 }).withMessage('Please enter a valid ame.'),
    body('Category').not().isEmpty().withMessage('Please select a category.'),
    body('Price').isFloat({ min: 0.01 }).withMessage('Please enter a valid price.'),
    body('Description').not().isEmpty().withMessage('Description cannot be empty.')
];

router.post('/add-new-item', upload.single('image'), productValidationMiddlewares, (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { productName, Category, Price, Description } = req.body;
    const file = req.file;

    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a picture.' });
    }

    const newProduct = {
        id: products.length + 1, // temporary id
        productName: productName,
        category: Category,
        price: parseFloat(Price).toFixed(2), //two decimal places
        description: Description,
        imagePath: `../uploads/${file.originalname}`
    };
    products.push(newProduct);

    res.status(201).json({
        message: "New product added successfully",
        product: newProduct
    });
});

router.use('../uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;