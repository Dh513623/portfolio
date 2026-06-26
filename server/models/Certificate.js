const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, default: '' },
  issueDate: { type: String, default: '' },
  image: { type: String, default: '' },
  credentialLink: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
