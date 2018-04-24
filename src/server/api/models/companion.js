var mongoose = require('mongoose');

var CompanionSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  content: { type: String },
  cover: { type: String },
  createAt: { type: Date, default: Date.now() },
  link: { type: String },
  updateAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Companion', CompanionSchema);
