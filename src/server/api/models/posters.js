var mongoose = require('mongoose');

var PostersSchema = new mongoose.Schema({
  title: { type: String },
  cover: { type: String },
  link: { type: String },
  type: { type: String },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Posters', PostersSchema);
