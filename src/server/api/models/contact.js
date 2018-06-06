var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: { type: String },
  mail: { type: String },
  industry: { type: String },
  country: { type: String },
  city: { type: String },
  interest: { type: Array },
  message: { type: String },
  isWatch: { type: Boolean, default: false },
  isDeal: { type: Boolean, default: false },
  createAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);
