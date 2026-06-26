const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  technologies: [{ type: String }],
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  logo: { type: String, default: '' },
  screenshot: { type: String, default: '' },
  images: [{ type: String }],
  status: { type: String, enum: ['completed', 'in-progress', 'planned'], default: 'completed' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
