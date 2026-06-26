const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_jwt_secret_2024';
const DEFAULT_ADMIN_EMAILS = [
  (process.env.DEFAULT_ADMIN_EMAIL || 'priyadharshinim23cseb21@gmail.com').toLowerCase(),
  'rshinim23cseb21@gmail.com'
];
const DEFAULT_ADMIN_PASSWORDS = [process.env.DEFAULT_ADMIN_PASSWORD || 'admin123', '23cseb21', '23cseb21@'];

const isDefaultAdminLogin = (email, password) => {
  const normalizedEmail = (email || '').toLowerCase();
  return DEFAULT_ADMIN_EMAILS.includes(normalizedEmail) && DEFAULT_ADMIN_PASSWORDS.includes(password);
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const email = (req.body?.email || '').trim().toLowerCase();
    const password = req.body?.password;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    let user = await User.findOne({ email });
    const isLegacyAdmin = isDefaultAdminLogin(email, password);

    if (!user) {
      if (!isLegacyAdmin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      user = await User.create({ email, password });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch && !isLegacyAdmin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!isMatch && isLegacyAdmin) {
      user.password = password;
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
