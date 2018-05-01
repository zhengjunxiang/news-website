var mongoose = require('mongoose');

var AboutSchema = new mongoose.Schema({
  title: { type: String, default: 'about' },
  content: { type: String },
  lan: { type: String, default: 'CN' },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('About', AboutSchema);
