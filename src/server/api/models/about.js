var mongoose = require('mongoose');

var AboutSchema = new mongoose.Schema({
  title: { type: String, default: 'about' },
  content: { type: String },
  lan: { type: String, default: 'zh' },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('About', AboutSchema);
