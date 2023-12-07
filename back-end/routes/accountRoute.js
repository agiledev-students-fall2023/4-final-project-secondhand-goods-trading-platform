const express = require('express');
const router = express.Router();

// Import the list of users
const User = require("../models/User.js");

// Get user account info
router.get('/account', async (req, res) => {
  const username = req.query.username;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the query
    res.status(500).json({ message: 'Error fetching user account info', error });
  }
});

module.exports = router;
