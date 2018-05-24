var mongoose = require('mongoose');

var PartnersSchema = new mongoose.Schema({
  title: { type: String, unique: false },
  content: { type: String },
  cover: { type: String },
  lan: { type: String, default: 'CN' },
  link: { type: String },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Partners', PartnersSchema);
