var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.post('/signin.json', (req, res) => {
  global.logger.info('user/signin.json');
  var _user = req.body;
  var name = _user.name;
  var password = _user.password;
  User.findOne({name: name}, function(err, user) {
    if (err) global.logger.error(err);
    if (!user) {
      res.json({ errno: 1, mes: '用户不存在' });
    } else {
      user.comparePassword(password, function(err, isMatch) {
        if (err) global.logger.error(err);
        if (isMatch) {
          req.session.user = user;
          global.logger.info('success');
          res.json({
            errno: 0,
            mes: '登录成功',
            data: {name: name, src: user.src, access: user.access}
          });
        } else {
          res.json({ errno: 1, mes: '密码不正确' });
          global.logger.info('password is not meached');
        }
      });
    }
  });
});

router.post('/signup.json', (req, res) => {
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
              res.json({ errno: 0, mes: '注册成功' });
            });
          }
        })
      } else {
        let user = new User(_user);
        user.save((err, user) => {
          if (err) global.logger.error(err);
          res.json({ errno: 0, mes: '注册成功' });
        });
      }
    }
  });
});

module.exports = router;
