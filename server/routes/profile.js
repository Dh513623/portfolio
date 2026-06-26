const express = require('express');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// GET /api/profile - Public
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/profile - Admin
router.put('/', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/profile/upload-image - Admin
router.post('/upload-image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    profile.profileImage = `/uploads/${req.file.filename}`;
    await profile.save();
    res.json({ profileImage: profile.profileImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/profile/upload-resume - Admin
router.post('/upload-resume', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    profile.resumeUrl = `/uploads/${req.file.filename}`;
    await profile.save();
    res.json({ resumeUrl: profile.resumeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
