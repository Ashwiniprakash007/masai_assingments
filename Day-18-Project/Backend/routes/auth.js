const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const router = express.Router();


router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email or password is missing
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const newUser = await User.create({ email, password: hashedPassword });
      newUser.save()
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // ✅ Auto-generate tokens
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
  
      // ✅ Save refresh token in user document
      user.refreshToken = refreshToken;
      await user.save();
  
      // ✅ Set refresh token in cookie (secure + HttpOnly)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // true in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      // ✅ Return access token in response
      res.status(200).json({ accessToken });
  
    } catch (err) {
      console.error('Login Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.post('/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = '';
    await user.save();
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

module.exports = router;