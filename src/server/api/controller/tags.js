var Tags = require('../models/tags');
var News = require('../models/news');

module.exports = {
  add: (req, res, next) => {
    global.logger.info('tags/add.json');
    const _tag = req.body;
    Tags.findOne({value: _tag.value}, function(err, tags) {
      if (err) global.logger.error(err);
      if (tags) {
        res.json({ errno: 1, mes: '该标签已存在' });
      } else {
        let tags = new Tags(_tag);
        tags.save((err, tags) => {
          if (err) global.logger.error(err);
          else {
            res.json({ errno: 0, mes: '标签添加成功' })
            next()
          }
        });
      }
    });
  },
  get: (req, res) => {
    global.logger.info('tags/get.json');
    Tags.find({}, function(err, tags) {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mes: '', data: tags });
    });
  },
  delete: (req, res, next) => {
    global.logger.info('tags/delete.json');
    var _tags = req.query;
    Tags.remove({value: {$in: _tags.tags}}, function(err, tags) {
      if (err) global.logger.error(err);
      if (tags.ok === 1) {
        News.updateMany(
          { tags: {$in: _tags.tags} },
          { $pullAll: {tags: _tags.tags} },
          (err, ne) => {
            if (err) global.logger.error(err);
            if (ne.ok === 1) {
              res.json({ errno: 0, mes: `博客和标签${_tags.tags}更新成功` })
              next()
            } else res.json({ errno: 1, mes: '删除标签成功， 博客标签更新失败' })
          }
        )
      } else res.json({ errno: 1, mes: '删除标签失败' })
    });
  }
}
