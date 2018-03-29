var mongoose = require('mongoose');

var TagsSchema = new mongoose.Schema({
  value: { type: String },
  blogs: { type: Array, default: [] },
  createAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Tags', TagsSchema);
