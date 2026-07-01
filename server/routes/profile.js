const express = require('express');
const fs = require('fs');
const { v2: cloudinary } = require('cloudinary');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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
    
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'profile_images',
    });
    
    profile.profileImage = uploadResult.secure_url;
    await profile.save();
    fs.unlink(req.file.path, () => {});
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
    
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'profile_resumes',
    });
    
    profile.resumeUrl = uploadResult.secure_url;
    await profile.save();
    fs.unlink(req.file.path, () => {});
    res.json({ resumeUrl: profile.resumeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
