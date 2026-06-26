const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Timeline', timelineSchema);
