var mongoose = require('mongoose');

var PartnersSchema = new mongoose.Schema({
  title: { type: String, unique: false },
  content: { type: String },
  cover: { type: String },
  lan: { type: String, default: 'CN' },
  createAt: { type: Date, default: Date.now() },
  link: { type: String },
  updateAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Partners', PartnersSchema);
