const express = require('express');
const fs = require('fs');
const { v2: cloudinary } = require('cloudinary');
const Internship = require('../models/Internship');
const Event = require('../models/Event');
const Timeline = require('../models/Timeline');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ── Internships ──
router.get('/internships', async (req, res) => {
  try {
    const internships = await Internship.find().sort('order');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/internships', auth, async (req, res) => {
  try {
    const item = new Internship(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/internships/:id', auth, async (req, res) => {
  try {
    const item = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/internships/:id', auth, async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload certificate for an internship
router.post('/internships/:id/certificate', auth, upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'internship_certificates',
    });

    internship.certificate = uploadResult.secure_url;
    await internship.save();

    fs.unlink(req.file.path, () => {});
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── Events ──
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort('order');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/events', auth, async (req, res) => {
  try {
    const item = new Event(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/events/:id', auth, async (req, res) => {
  try {
    const item = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/events/:id', auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload certificate for an event
router.post('/events/:id/certificate', auth, upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'event_certificates',
    });

    event.certificate = uploadResult.secure_url;
    await event.save();

    fs.unlink(req.file.path, () => {});
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── Timeline ──
router.get('/timeline', async (req, res) => {
  try {
    const timeline = await Timeline.find().sort('order');
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/timeline', auth, async (req, res) => {
  try {
    const item = new Timeline(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/timeline/:id', auth, async (req, res) => {
  try {
    const item = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/timeline/:id', auth, async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
