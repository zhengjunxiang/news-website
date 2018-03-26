var mongoose = require('mongoose');

var PostsSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  content: { type: String },
  intro: { type: String },
  tags: { type: Array },
  meta: {
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
  }
});

module.exports = mongoose.model('Posts', PostsSchema);
