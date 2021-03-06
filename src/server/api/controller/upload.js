const User = require('../models/user');
const mongoose = require('mongoose');
var formidable = require('formidable'),
  {root} = require('../config'),
  fs = require('fs'),
  path = require('path'),
  rimraf = require('rimraf'),
  url = '/resouce',
  UPLOAD_IMG = path.resolve(root, 'resouce');

module.exports = {
  addImg(req, res) {
    var form = new formidable.IncomingForm(), // 创建上传表单
      name = '', newPath = '', imgPath = ''; // 图片写入地址；
    form.encoding = 'utf-8'; // 设置编辑
    form.uploadDir = UPLOAD_IMG; // 设置上传目录
    form.keepExtensions = true; // 保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
    form.parse(req, function(err, fields, files) {
      const {inserDir} = fields;
      if (err) {
        res.locals.error = err;
        return;
      }
      if (files.upimg.type.indexOf('image') < 0) {
        res.locals.error = '只支持png和jpg格式图片';
        return;
      }
      name = files.upimg.name;
      imgPath = `${url}/${name}`;
      newPath = `${form.uploadDir}/${inserDir ? inserDir + '/' : ''}${name}`;
      fs.rename(files.upimg.path, newPath, (err) => {
        if (err) global.logger.error('err', err);
        else {
          const { name } = req.session.user;
          res.json({'newPath': imgPath})
          User.update({name}, { $push: { messages: {
            _id: mongoose.Types.ObjectId(),
            title: 'Upload Image',
            mes: `上传了图片 ${files.upimg.name}`,
            isReaded: false,
            createAt: Date.now()
          } } }, (err, user) => { if (err) global.logger.error(err) });
        };
      });
    });
  },
  getImgs(req, res) {
    var { path } = req.query, p = path ? `${UPLOAD_IMG}/${path}` : UPLOAD_IMG;
    fs.readdir(p, function(err, files) {
      if (err) {
        global.logger.error('err', err)
        res.json({ errno: 1, mes: '获取图片资源失败', data: [] });
      } else {
        const data = files.map(f => ({name: f, url: `${url}/${path ? path + '/' : ''}${f}`}))
        res.json({ errno: 0, mes: '', data })
      };
    })
  },
  delImg(req, res, next) {
    global.logger.info('resouce/delImg.json');
    var _name = req.query;
    fs.unlink(`${UPLOAD_IMG}/${_name.name}`, (err, f) => {
      if (err) {
        global.logger.error('err', err)
        res.json({ errno: 1, mes: '删除失败' })
      } else {
        res.json({ errno: 0, mes: `删除 ${_name.name} 成功` })
        next()
      }
    })
  },
  delDir(req, res, next) {
    global.logger.info('resouce/delDir.json');
    var _name = req.query;
    rimraf(`${UPLOAD_IMG}/${_name.name}`, (err, f) => {
      if (err) {
        global.logger.error('err', err)
        res.json({ errno: 1, mes: '删除失败' })
      } else {
        res.json({ errno: 0, mes: `删除 ${_name.name} 成功` })
        next()
      }
    })
  },
  rename(req, res, next) {
    global.logger.info('resouce/rename.json');
    var {origin, newname} = req.body;
    fs.rename(`${UPLOAD_IMG}/${origin}`, `${UPLOAD_IMG}/${newname}`, err => {
      if (err) {
        global.logger.error('err', err)
        res.json({ errno: 1, mes: `重命名 ${origin} 失败` })
      } else {
        res.json({ errno: 0, mes: `重命名 ${origin} 成功` })
        next()
      }
    })
  },
  mkdir(req, res, next) {
    global.logger.info('resouce/mkdir.json');
    var {dirName} = req.body;
    fs.mkdir(`${UPLOAD_IMG}/${dirName}`, '0777', function (err) {
      if (err) {
        global.logger.error('err', err)
        res.json({ errno: 1, mes: `创建文件夹 ${dirName} 失败` })
      } else {
        res.json({ errno: 0, mes: `创建文件夹 ${dirName} 成功` })
        next()
      }
    });
  }
}
