var mongoose = require('mongoose');

// 用于md5加密
var bcrypt = require('bcryptjs');
// 加盐数
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
  name: { unique: true, type: String },
  userName: { type: String, default: '' },
  department: { type: String, default: '' },
  password: String,
  messages: [{
    mes: { type: String },
    isReaded: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    createAt: { type: Number, default: Date.now }
  }],
  avatar: { type: String, default: '' },
  access: { type: Number },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: Date.now }
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
  fetch: (cb) => this.find({}).sort('updateAt').exec(cb),
  findById: (id, cb) => this.findOne({_id: id}).exec(cb)
};

module.exports = mongoose.model('User', UserSchema);
