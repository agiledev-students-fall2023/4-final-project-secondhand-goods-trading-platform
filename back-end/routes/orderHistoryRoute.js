const express = require("express");
const jwt = require('jsonwebtoken'); // Ensure you have installed the jsonwebtoken package
const router = express.Router();
const User = require("../models/User.js");

router.get("/order-history", async (req, res) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }

    try {
      // Use the user ID from the decoded token
      const user = await User.findById(decoded.id).populate('orderHistory');

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const orderHistory = user.orderHistory || [];
      res.status(200).json(orderHistory);
    } catch (error) {
      console.error("Error fetching order history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

module.exports = router;
