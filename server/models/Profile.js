const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  designation: { type: String, default: '' },
  location: { type: String, default: '' },
  summary: { type: String, default: '' },
  objective: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  address: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  resumeUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
