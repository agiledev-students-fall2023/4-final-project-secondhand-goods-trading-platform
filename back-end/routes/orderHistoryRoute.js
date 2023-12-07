const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.get("/order-history", async (req, res) => {
  console.log("Request received for /api/order-history");
  const username = req.query.username;

  try {
    const user = await User.findOne({ username }).populate('orderHistory');  // Populate the products

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming that the user model has a field named 'orderHistory'
    const orderHistory = user.orderHistory || [];

    res.status(200).json(orderHistory);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
