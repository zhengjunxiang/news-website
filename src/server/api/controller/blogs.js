var Blogs = require('../models/blogs');
var Tags = require('../models/tags');

module.exports = {
  add: (req, res) => {
    global.logger.info('blogs/add.json');
    const _blog = req.body;
    Blogs.findOne({title: _blog.title}, function(err, blogs) {
      if (err) global.logger.error(err);
      if (blogs) {
        res.json({ errno: 1, mes: '该博客标题已存在' });
      } else {
        let blogs = new Blogs(_blog);
        blogs.save((err, blogs) => {
          if (err) {
            global.logger.error(err);
            res.json({ errno: 1, mes: '发布博客失败' });
          } else {
            let _tags = _blog.tags;
            if (_tags && _tags.length) {
              Tags.updateMany(
                {value: {$in: _tags}},
                {$push: {blogs: blogs.title}},
                (err, tags) => {
                  if (err) global.logger.error(err);
                  if (tags.ok === 1) res.json({ errno: 0, mes: '发布博客成功' })
                  else res.json({ errno: 1, mes: '发布博客成功，标签关联失败' })
                }
              )
            } else { res.json({ errno: 0, mes: '发布博客成功' }) }
          }
        });
      }
    });
  },
  get: (req, res) => {
    global.logger.info('blogs/get.json');
    const _blog = req.query, cond = {};
    if (_blog.title) cond.title = _blog.title
    Blogs.find(cond, function(err, blogs) {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mse: '', data: blogs });
    });
  },
  delete: (req, res) => {
    global.logger.info('blogs/delete.json');
    var _blog = req.query;
    Blogs.remove({title: _blog.title}, function(err, blogs) {
      if (err) global.logger.error(err);
      if (blogs.ok === 1) {
        let tags = _blog.tags;
        if (tags && tags.length) {
          Tags.updateMany(
            {value: {$in: tags}},
            {$pull: {blogs: _blog.title}},
            (err, tags) => {
              if (err) global.logger.error(err);
              if (tags.ok === 1) res.json({ errno: 0, mes: `删除博客${_blog.title}成功` })
              else res.json({ errno: 1, mes: '删除博客成功，删除关联标签失败' })
            }
          )
        } else res.json({ errno: 0, mes: `删除博客${_blog.title}成功` })
      } else res.json({ errno: 1, mes: `删除博客${_blog.title}失败` })
    });
  }
}
