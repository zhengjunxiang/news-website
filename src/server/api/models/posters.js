var mongoose = require('mongoose');

var PostersSchema = new mongoose.Schema({
  title: { type: String, unique: false },
  cover: { type: String },
  lan: { type: String, default: 'zh' },
  link: { type: String },
  type: { type: String },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Posters', PostersSchema);
