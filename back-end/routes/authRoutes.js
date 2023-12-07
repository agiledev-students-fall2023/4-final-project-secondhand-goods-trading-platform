const express = require('express');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

const router = express.Router();
const User = require("../models/User.js");




// Login endpoint
router.post('/login', [
  body('username').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty(),
], async (req, res) => {
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



router.post('/signup', [
  body('username')
    .not().isEmpty().withMessage('Username cannot be empty')
    .trim().escape()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email')
    .isEmail().withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('password')
    .isStrongPassword().withMessage('Password must be strong (at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 symbol)'),
], async (req, res) => {

  const { username, email, password } = req.body;
  console.log('we are in signup!');

  // Check if the user already exists
  const userExists = await User.findOne({ $or: [{ email }] });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({ msg: err.msg, param: err.param }));
    return res.status(400).json({ message: 'Validation errors', errors: errorMessages });
  }


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
