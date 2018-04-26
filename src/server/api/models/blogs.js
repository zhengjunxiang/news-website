var mongoose = require('mongoose');

var BlogsSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  content: { type: String },
  intro: { type: String },
  author: { type: String, default: 'Noname' },
  cover: { type: String },
  tags: { type: Array },
  like: { type: Number, default: 0 },
  unlike: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Blogs', BlogsSchema);
