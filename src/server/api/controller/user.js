var User = require('../models/user');
var conf = require('../config');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

module.exports = {
  get: (req, res) => {
    global.logger.info('user/get.json');
    const cond = {access: {'$gt': 0}};
    User.find(cond, function(err, user) {
      if (err) global.logger.error(err);
      else {
        const users = user.map(u => {
          u.password = ''
          return u;
        });
        res.json({ errno: 0, mse: '', data: users });
      }
    });
  },
  getUser(req, res) {
    global.logger.info('user/getUser.json');
    const {name} = req.query;
    User.findOne({name}, {password: 0}, function(err, user) {
      if (err) global.logger.error(err)
      else res.json({ errno: 0, mse: '', data: user });
    });
  },
  delete: (req, res) => {
    global.logger.info('User/delete.json');
    var _user = req.query;
    User.remove({name: _user.name, access: {'$gt': 0}}, function(err, User) {
      if (err) global.logger.error(err);
      if (User.ok === 1 && User.n) res.json({ errno: 0, mes: `删除用户 ${_user.name} 成功` })
      else res.json({ errno: 1, mes: `删除用户 ${_user.name} 失败` })
    });
  },
  signin: (req, res) => {
    global.logger.info('user/signin.json');
    var {name, password} = req.body;
    User.findOne({name}, function(err, user) {
      if (err) global.logger.error(err);
      if (!user) {
        res.json({ errno: 1, mes: '用户不存在' });
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if (err) global.logger.error(err);
          if (isMatch) {
            const { name, avatar, access } = user;
            req.session.regenerate(err => {
              if (err) global.logger.error(err);
              return null;
            })
            req.session.user = { name, access };
            res.json({ errno: 0, mes: '登录成功', data: {name, avatar, access} });
          } else {
            res.json({ errno: 1, mes: '密码不正确' });
            global.logger.info('password is not meached');
          }
        });
      }
    });
  },
  signup: (req, res) => {
    global.logger.info('user/signup.json');
    const _user = req.body;
    User.findOne({name: _user.name}, function(err, user) {
      if (err) global.logger.error(err);
      if (user) {
        res.json({ errno: 1, mes: '用户名已存在' });
      } else {
        if (_user.access === 0) {
          User.findOne({access: 0}, function(err, access) {
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
            else res.json({ errno: 0, mes: '注册成功' });
          });
        }
      }
    });
  },
  updateMessage(req, res) {
    global.logger.info('user/updateMessage.json');
    const {userName, department, name, avatar} = req.body;
    User.update(
      {name: {$in: name}},
      { userName, department, avatar },
      (err, ne) => {
        if (err) global.logger.error(err);
        if (ne.ok === 1) res.json({ errno: 0, mes: '信息更新成功' })
        else res.json({ errno: 1, mes: '信息更新失败' })
      }
    )
  },
  updatePassW(req, res) {
    global.logger.info('user/updatePassW.json');
    const {oldPass, newPass, name} = req.body;
    User.findOne({name}, function(err, user) {
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
                  { name: {$in: name} },
                  { password: hash },
                  (err, user) => {
                    if (err) global.logger.error(err);
                    if (user.ok === 1) res.json({ errno: 0, mes: '密码更新成功' })
                    else res.json({ errno: 1, mes: '密码更新失败' })
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
  addMessage(req, res) {
    global.logger.info('user/addMessage.json');
    const {opt, name, title} = req.body;
    User.findOne({name}, function(err, user) {
      if (err) global.logger.error(err);
      else {
        global.logger.info('addMessage', user);
        res.json({ errno: 0, mes: 'addMessage' })
      }
    })
  }
}
