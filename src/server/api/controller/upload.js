var {host, port} = require('../../../../config/ip-port'),
  formidable = require('formidable'),
  {root} = require('../config'),
  fs = require('fs'),
  path = require('path'),
  url = `http://${host}:${port.api}/resouce`,
  UPLOAD_IMG = path.resolve(root, 'resouce');

module.exports = {
  upImgs: (req, res) => {
    var form = new formidable.IncomingForm(), // 创建上传表单
      name = '', newPath = '', imgPath = ''; // 图片写入地址；
    form.encoding = 'utf-8'; // 设置编辑
    form.uploadDir = UPLOAD_IMG; // 设置上传目录
    form.keepExtensions = true; // 保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
    form.parse(req, function(err, fields, files) {
      if (err) {
        res.locals.error = err;
        return;
      }
      if (files.upimg.type.indexOf('image') < 0) {
        res.locals.error = '只支持png和jpg格式图片';
        return;
      }
      name = files.upimg.name;
      imgPath = url + '/' + name;
      newPath = form.uploadDir + '/' + name;
      fs.renameSync(files.upimg.path, newPath); // 重命名
      res.json({'newPath': imgPath});
    });
  },
  getImgs: (req, res) => {
    fs.readdir(UPLOAD_IMG, function(err, files) {
      if (err) {
        global.logger.info('err', err)
        res.json({ errno: 1, mes: '获取图片资源失败', data: [] });
      } else {
        const data = files.map(f => ({name: f, url: url + '/' + f}))
        res.json({ errno: 0, mes: '', data })
      };
    })
  }
}
