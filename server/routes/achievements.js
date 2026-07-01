const express = require('express');
const fs = require('fs');
const { v2: cloudinary } = require('cloudinary');
const Certificate = require('../models/Certificate');
const CodingProfile = require('../models/CodingProfile');
const Education = require('../models/Education');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const normalizeCertificatePayload = (body = {}) => {
  const payload = { ...body };
  if (payload.order !== undefined && payload.order !== '') {
    payload.order = Number(payload.order);
  }
  return payload;
};

// ── Certificates ──
router.get('/certificates', async (req, res) => {
  try {
    const certs = await Certificate.find().sort('order');
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/certificates', auth, upload.single('image'), async (req, res) => {
  try {
    const payload = normalizeCertificatePayload(req.body);
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        folder: 'achievement_certificates',
      });
      payload.image = uploadResult.secure_url;
      fs.unlink(req.file.path, () => {});
    }

    const item = new Certificate(payload);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/certificates/:id', auth, async (req, res) => {
  try {
    const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/certificates/:id', auth, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/certificates/:id/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Not found' });
    
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'achievement_certificates',
    });
    
    cert.image = uploadResult.secure_url;
    await cert.save();
    fs.unlink(req.file.path, () => {});
    res.json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── Coding Profiles ──
router.get('/coding-profiles', async (req, res) => {
  try {
    const profiles = await CodingProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/coding-profiles', auth, async (req, res) => {
  try {
    const item = new CodingProfile(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/coding-profiles/:id', auth, async (req, res) => {
  try {
    const item = await CodingProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/coding-profiles/:id', auth, async (req, res) => {
  try {
    await CodingProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── Education ──
router.get('/education', async (req, res) => {
  try {
    const edu = await Education.find().sort('order');
    res.json(edu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/education', auth, async (req, res) => {
  try {
    const item = new Education(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/education/:id', auth, async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/education/:id', auth, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
