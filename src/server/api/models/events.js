var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  content: { type: String },
  intro: { type: String },
  author: { type: String, default: 'Noname' },
  userName: { type: String, default: '' },
  cover: { type: String },
  feature: { type: Boolean, default: false },
  lan: { type: String, default: 'zh' },
  like: { type: Number, default: 0 },
  unlike: { type: Number, default: 0 },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Events', EventsSchema);
