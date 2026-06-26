const mongoose = require('mongoose');

const codingProfileSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  profileLink: { type: String, default: '' },
  problemsSolved: { type: String, default: '' },
  badges: [{ type: String }],
  ranking: { type: String, default: '' },
  certificates: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('CodingProfile', codingProfileSchema);
