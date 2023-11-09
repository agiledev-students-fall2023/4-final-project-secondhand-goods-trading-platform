const express = require('express');
const router = express.Router();

// Import the list of users
const users = require('../data/users');

// Get user account info
router.get('/account', (req, res) => {
  // For simplicity, let's assume the user is already authenticated

  // Get the user based on some identifier (e.g., username)
  const username = 'user1'; // Replace this with the actual authenticated user

  const user = users.find((u) => u.username === username);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


module.exports = router;
