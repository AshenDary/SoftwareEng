const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:          { type: String, required: true },
  program:       { type: String },
  email:         { type: String },
  contactNumber: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
