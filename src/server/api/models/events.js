var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  content: { type: String },
  author: { type: String, default: 'Noname' },
  cover: { type: String },
  lan: { type: String, default: 'CN' },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Events', EventsSchema);
