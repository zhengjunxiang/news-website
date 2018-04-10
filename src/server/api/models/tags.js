var mongoose = require('mongoose');

var TagsSchema = new mongoose.Schema({
  value: { unique: true, type: String },
  createAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Tags', TagsSchema);
