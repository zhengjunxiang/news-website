var mongoose = require('mongoose');

var PostsSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  content: { type: String },
  tags: { type: Array },
  classifications: { type: Array },
  meta: {
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
  }
});
// 对密码进行加密
PostsSchema.pre('save', function(next) {
  if (this.isNew) this.createAt = this.updateAt = Date.now();
  else this.updateAt = Date.now();
});

module.exports = mongoose.model('Posts', PostsSchema);
