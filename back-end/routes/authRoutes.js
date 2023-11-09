const express = require('express');
const router = express.Router();

const users = require('../data/users');


// Login endpoint
router.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  const user = users.find(u => u.username === username && u.email === email);

  if (user) {
    if (user.password === password) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } else {
    res.status(401).json({ message: 'User not found' });
  }
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  const userExists = users.some(u => u.username === username || u.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // "Create" the user (just save it temporarily)
  const newUser = { username, email, password };
  users.push(newUser);

  res.status(201).json({ message: 'Thank you for signing up!' });
});



module.exports = router;
