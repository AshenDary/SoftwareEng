const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  author:   { type: String, required: true },
  date:     { type: String, required: true },
  category: { type: String, required: true },
  excerpt:  { type: String },
  content:  { type: String, required: true },
  views:    { type: Number, default: 0 },
  likes:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
