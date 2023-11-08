const express = require('express');
const router = express.Router();

router.post('/add-new-item', (req, res) => {
    const { productName, Category, Price, Description } = req.body;




});

module.exports = router;