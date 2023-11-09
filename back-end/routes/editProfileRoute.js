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
  // Add more user data as needed
];

// Update user profile
router.put('/edit-profile', (req, res) => {
  // For simplicity, let's assume the user is already authenticated
  // You can add authentication logic here if needed

  // Get the user based on some identifier (e.g., username)
  const username = 'user1'; // You can replace this with the actual authenticated user

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
