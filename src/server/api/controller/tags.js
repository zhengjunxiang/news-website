var Tags = require('../models/tags');

module.exports = {
  add: (req, res) => {
    global.logger.info('tags/add.json');
    const _post = req.body;
    Tags.findOne({value: _post.value}, function(err, tags) {
      if (err) global.logger.error(err);
      if (tags) {
        res.json({ errno: 1, mes: '该标签已存在' });
      } else {
        let tags = new Tags(_post);
        tags.save((err, tags) => {
          if (err) global.logger.error(err);
          else res.json({ errno: 0, mes: '标签添加成功' });
        });
      }
    });
  },
  get: (req, res) => {
    global.logger.info('tags/get.json');
    Tags.find({}, function(err, tags) {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mse: '', data: tags });
    });
  },
  delete: (req, res) => {
    global.logger.info('tags/delete.json');
    var _tags = req.query;
    Tags.remove({value: {$in: _tags.tag}}, function(err, tags) {
      if (err) global.logger.error(err);
      if (tags.ok === 1) res.json({ errno: 0, mes: '删除标签成功' })
      else res.json({ errno: 1, mes: '删除标签失败' })
    });
  }
}
