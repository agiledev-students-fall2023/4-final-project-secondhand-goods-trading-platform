const express = require('express');
const router = express.Router();

// Hardcoded user data
const users = [
  {
    username: 'user1',
    phone: '(+1)123-456-7890',
    addressLine1: '872C Apple Hall',
    addressLine2: 'New York NY12345',
    payment: '1234',
  },
  {
    username: 'user2',
    phone: '987-654-3210',
    addressLine1: '456 Elm St',
    addressLine2: '',
    payment: '5678',
  },
];

// Get user account info
router.get('/account', (req, res) => {
  // For simplicity, let's assume the user is already authenticated

  // Get the user based on some identifier (e.g., username)
  const username = 'user1'; //replace this with the actual authenticated user

  const user = users.find((u) => u.username === username);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update user account info
/*
router.put('/account', (req, res) => {
  // For simplicity, let's assume the user is already authenticated

  // Get the user based on some identifier (e.g., username)
  const username = 'user1'; //replace this with the actual authenticated user

  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex !== -1) {
    // Update the user's account info with the data from the request
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json({ message: 'Account information updated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});*/

module.exports = router;
