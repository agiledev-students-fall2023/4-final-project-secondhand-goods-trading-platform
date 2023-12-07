const express = require('express');
const router = express.Router();
//const users = require('../data/users');
const User = require("../models/User.js");

// Update user profile
router.put('/edit-profile', async (req, res) => {
  const username = req.query.username;
  const updateData = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      updateData,
      { new: true } // Return the updated user
    );

    if (updatedUser) {
      res.json({ message: 'Profile information updated', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error });
  }
});

module.exports = router;
