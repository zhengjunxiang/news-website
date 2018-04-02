var mongoose = require('mongoose');
// 用于md5加密
var bcrypt = require('bcryptjs');
// 加盐数
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
  name: { unique: true, type: String },
  password: String,
  src: String,
  access: { type: Number },
  createAt: { type: Date, default: Date.now() }
});
// 对密码进行加密
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isNew) this.createAt = this.updateAt = Date.now();
  else this.updateAt = Date.now();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      user.src = '/static/img/' + Math.ceil(Math.random() * 10) + '.jpg';
      next();
    });
  });
});
// 用于比较密码是否正确
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }
};

UserSchema.statics = {
  fetch: (cb) => this.find({}).sort('meta.updateAt').exec(cb),
  findById: (id, cb) => this.findOne({_id: id}).exec(cb)
};

module.exports = mongoose.model('User', UserSchema);