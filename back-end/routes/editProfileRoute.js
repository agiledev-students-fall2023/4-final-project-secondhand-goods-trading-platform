const express = require('express');
const router = express.Router();

// Import the list of users
const users = require('../data/users');

// Update user profile
router.put('/edit-profile', (req, res) => {
  // For simplicity, let's assume the user is already authenticated

  // Get the user based on some identifier (e.g., username)
  const username = 'user1'; // Replace this with the actual authenticated user

  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex !== -1) {
    // Update the user's profile with the data from the request
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json({ message: 'Profile information updated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
