const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  qualification: { type: String, required: true },
  institution: { type: String, default: '' },
  score: { type: String, default: '' },
  year: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
