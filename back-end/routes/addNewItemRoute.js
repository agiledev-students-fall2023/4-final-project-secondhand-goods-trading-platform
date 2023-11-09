const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

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

router.post('/add-new-item', upload.single('image'), (req, res) => {
    const { productName, Category, Price, Description } = req.body;
    const file = req.file;

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