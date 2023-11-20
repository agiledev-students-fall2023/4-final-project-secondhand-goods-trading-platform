const express = require('express');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const router = express.Router();
const User = require("../models/User.js");



// Login endpoint
router.post('/login', async (req, res) => {
  console.log("we are in login!");
  const { username, email, password } = req.body;

  // Find the user by username and email
  const user = await User.findOne({ username, email });

  if (user) {
    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = user.generateJWT(); // Generate a token
      res.json({ message: 'Login successful', token, username: user.username, email: user.email });
    } else {
      console.log(password);
      console.log(user.password);
      console.log(user.username);
      console.log("hi");
      res.status(401).json({ message: 'Invalid password' });
    }
  } else {
    res.status(401).json({ message: 'User not found' });
  }
});


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Signup route hit');

  // Check if the user already exists
  const userExists = await User.findOne({ $or: [{ username }, { email }] });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password

  // Create a new user instance and save to the database
  const newUser = new User({ username, email, password});

  try {
    const savedUser = await newUser.save();
    // Generate JWT token after successful signup
    const token = savedUser.generateJWT(); 

    res.status(201).json({
      message: 'Thank you for signing up!',
      token: token, // Send the token to the client
      username: savedUser.username,
      email: savedUser.email
    });
  } catch (err) {
    console.error(`Failed to save user: ${err}`);
    res.status(500).json({
      message: "Error saving user to database.",
      error: err,
    });
  }

});



module.exports = router;
