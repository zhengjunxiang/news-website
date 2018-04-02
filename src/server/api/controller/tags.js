var Tags = require('../models/tags');
var Blogs = require('../models/blogs');

module.exports = {
  add: (req, res) => {
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
    Tags.remove({value: {$in: _tags.tags}}, function(err, tags) {
      if (err) global.logger.error(err);
      if (tags.ok === 1) {
        Blogs.updateMany(
          { tags: {$in: _tags.tags} },
          { $pullAll: {tags: _tags.tags} },
          (err, blog) => {
            if (err) global.logger.error(err);
            if (blog.ok === 1) res.json({ errno: 0, mes: `博客和标签${_tags.tags}更新成功` })
            else res.json({ errno: 1, mes: '删除标签成功， 博客标签更新失败' })
          }
        )
      } else res.json({ errno: 1, mes: '删除标签失败' })
    });
  }
}