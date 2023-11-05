const express = require('express');
const router = express.Router();

// Hardcoded user data
const users = [
  { username: 'user1', email: 'user1@example.com', password: 'pass1' },
  { username: 'user2', email: 'user2@example.com', password: 'pass2' },
  { username: 'user3', email: 'user3@example.com', password: 'pass3' }
];

// Login endpoint
// Login endpoint
router.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  const user = users.find(u => u.username === username && u.email === email && u.password === password);

  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});


module.exports = router;
