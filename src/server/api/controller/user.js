var User = require('../models/user');
var conf = require('../config');
var bcrypt = require('bcryptjs');
const axios = require('axios');
var SALT_WORK_FACTOR = 10;

module.exports = {
  getUsers: (req, res) => {
    global.logger.info('user/getUsers.json');
    const cond = { access: {'$gt': 0} },
      {access} = req.session.user,
      filter = access === 0 ? { password: 0 } : { password: 0, messages: 0 };
    User.find(cond, filter, (err, user) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mes: '', data: user });
    });
  },
  getUser(req, res) {
    global.logger.info('user/getUser.json');
    const {name} = req.query;
    User.findOne({ name }, { password: 0 }, (err, user) => {
      if (err) global.logger.error(err)
      if (user) {
        user.messages = user.messages.filter(mes => !mes.isRemove)
        res.json({ errno: 0, mes: '', data: user })
      } else res.json({ errno: 1, mes: '没有该用户' })
    });
  },
  getUserAvatar(req, res) {
    global.logger.info('user/getUserAvatar.json');
    const {name} = req.query;
    User.findOne({ name }, { avatar: 1 }, (err, user) => {
      if (err) global.logger.error(err)
      if (user) {
        res.json({ errno: 0, mes: '', data: user })
      } else res.json({ errno: 1, mes: '', data: {} })
    });
  },
  delete: (req, res, next) => {
    global.logger.info('user/delete.json');
    var _user = req.query;
    User.remove({name: _user.name, access: { '$gt': 0 }}, (err, User) => {
      if (err) global.logger.error(err);
      if (User.ok === 1 && User.n) {
        res.json({ errno: 0, mes: `删除用户 ${_user.name} 成功` })
        next()
      } else res.json({ errno: 1, mes: `删除用户 ${_user.name} 失败` })
    });
  },
  readmes: (req, res) => {
    global.logger.info('user/readmes.json');
    var { name, _id } = req.query;
    User.updateOne(
      { name, 'messages._id': _id },
      { $set: { 'messages.$.isReaded': true } },
      (err, user) => {
        if (err) global.logger.error(err);
        if (user.ok === 1) {
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '操作信息更新失败' })
      }
    )
  },
  binmes: (req, res) => {
    global.logger.info('user/binmes.json');
    var { name, _id } = req.query;
    User.updateOne(
      { name, 'messages._id': _id },
      { $set: { 'messages.$.isDelete': true } },
      (err, user) => {
        if (err) global.logger.error(err);
        if (user.ok === 1) {
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '操作信息更新失败' })
      }
    )
  },
  resetmes: (req, res) => {
    global.logger.info('user/resetmes.json');
    var { name, _id } = req.query;
    User.updateOne(
      { name, 'messages._id': _id },
      { $set: { 'messages.$.isDelete': false } },
      (err, user) => {
        if (err) global.logger.error(err);
        if (user.ok === 1) {
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '操作信息更新失败' })
      }
    )
  },
  delmes: (req, res) => {
    global.logger.info('user/delmes.json');
    var { name, _id } = req.query;
    User.updateOne(
      { name, 'messages._id': _id },
      { $set: { 'messages.$.isRemove': true } },
      (err, user) => {
        if (err) global.logger.error(err);
        if (user.ok === 1) {
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '操作信息更新失败' })
      }
    )
  },
  delallmes: (req, res) => {
    global.logger.info('user/delallmes.json');
    var { name } = req.query;
    User.findOne(
      { name },
      (err, user) => {
        if (err) global.logger.error(err);
        if (user) {
          try {
            user.messages.map(m => { if (m.isDelete) m.isRemove = true })
            user.markModified('messages');
            user.save()
            res.json({ errno: 0, mes: '' })
          } catch (err) {
            if (err) global.logger.error(err);
            res.json({ errno: 1, mes: '操作信息更新失败' })
          }
        } else res.json({ errno: 1, mes: '操作信息更新失败' })
      }
    )
  },
  signin: (req, res) => {
    global.logger.info('user/signin.json');
    var { name, password } = req.body;
    User.findOne({name}, (err, user) => {
      if (err) global.logger.error(err);
      if (!user) {
        res.json({ errno: 1, mes: '用户不存在' });
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) global.logger.error(err);
          if (isMatch) {
            const { name, avatar, access, artName } = user;
            req.session.regenerate(err => {
              if (err) global.logger.error(err);
              return null;
            })
            req.session.user = { name, access };
            res.json({ errno: 0, mes: '登录成功', data: {name, avatar, access, artName} });
          } else {
            res.json({ errno: 1, mes: '密码不正确' });
            global.logger.info('password is not meached');
          }
        });
      }
    });
  },
  signup: (req, res, next) => {
    global.logger.info('user/signup.json');
    const _user = req.body;
    User.findOne({ name: _user.name }, (err, user) => {
      if (err) global.logger.error(err);
      if (user) {
        res.json({ errno: 1, mes: '用户名已存在' });
      } else {
        if (_user.access === 0) {
          User.findOne({ access: 0 }, (err, access) => {
            if (err) global.logger.error(err);
            if (access) {
              res.json({ errno: 1, mes: '已经存在超级管理员。' })
            } else {
              let user = new User(_user);
              user.save((err, user) => {
                if (err) global.logger.error(err);
                else res.json({ errno: 0, mes: '注册超级管理员成功' });
              });
            }
          })
        } else {
          let user = new User(_user);
          user.save((err, user) => {
            if (err) global.logger.error(err);
            else {
              res.json({ errno: 0, mes: '注册成功' })
              next()
            };
          });
        }
      }
    });
  },
  updateMessage(req, res, next) {
    global.logger.info('user/updateMessage.json');
    const body = req.body,
      data = { updateAt: Date.now() };
    Object.keys(body).forEach(key => { if (body[key] && key !== 'name') data[key] = body[key] })
    User.update(
      {name: { $in: body.name }}, data,
      (err, ne) => {
        if (err) global.logger.error(err);
        if (ne.ok === 1) {
          res.json({ errno: 0, mes: '信息更新成功' })
          next()
        } else res.json({ errno: 1, mes: '信息更新失败' })
      }
    )
  },
  updatePassW(req, res, next) {
    global.logger.info('user/updatePassW.json');
    const { oldPass, newPass, name } = req.body;
    User.findOne({ name }, (err, user) => {
      if (err) global.logger.error(err);
      else {
        bcrypt.compare(oldPass, user.password, (err, isMatch) => {
          if (err) return global.logger.error(err);
          if (isMatch) {
            bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
              if (err) global.logger.error(err);
              bcrypt.hash(newPass, salt, (err, hash) => {
                if (err) global.logger.error(err);
                User.update(
                  { name: { $in: name } },
                  { password: hash },
                  (err, user) => {
                    if (err) global.logger.error(err);
                    if (user.ok === 1) {
                      res.json({ errno: 0, mes: '密码更新成功' })
                      next()
                    } else res.json({ errno: 1, mes: '密码更新失败' })
                  }
                )
              })
            })
          } else res.json({ errno: 1, mes: '旧密码错误' })
        })
      }
    })
  },
  loginOut(req, res) {
    global.logger.info('user/loginOut.json');
    req.session.user = null
    req.session.destroy(err => {
      if (err) {
        res.json({ errno: 1, mes: '登出失败' })
      } else {
        res.clearCookie(conf.identityKey);
        res.json({ errno: 0, mes: '登出成功' })
      }
    })
  },
  accountSignin(req, res) {
    global.logger.info('account/signin.json');
    const { identify, password } = req.body;
    axios.post('https://account.bitmain.com/api/v1/login', {identify, password})
      .then(response => {
        if (response.data) {
          if (response.data.code === '2000') {
            res.json({ errno: 0, mes: '' })
          } else if (response.data.code === '2011') {
            res.json({ errno: 1, mes: '密码不匹配' })
          } else if (response.data.code === '2403') {
            res.json({ errno: 1, mes: '账户被锁定' })
          } else if (response.data.code === '2404') {
            res.json({ errno: 1, mes: '账户未确认' })
          } else {
            res.json({ errno: 1, mes: '登录失败' })
          }
        }
      }).catch(error => {
        global.logger.error('error', error);
      });
  }
}
