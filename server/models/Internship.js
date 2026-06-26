const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, default: '' },
  description: { type: String, default: '' },
  skills: [{ type: String }],
  certificate: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
