const express = require('express');
const router = express.Router();
const users = require('../data/users');

// Update user profile
router.put('/edit-profile', (req, res) => {
  const username = req.query.username; // or get from req.body
  const userIndex = users.findIndex((u) => u.username === username);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Invalid update data' });
  }

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json({ message: 'Profile information updated', user: users[userIndex] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
