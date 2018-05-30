var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  content: { type: String },
  intro: { type: String },
  author: { type: String, default: 'Noname' },
  cover: { type: String },
  feature: { type: Boolean, default: false },
  lan: { type: String, default: 'zh' },
  tags: { type: Array },
  like: { type: Number, default: 0 },
  unlike: { type: Number, default: 0 },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
