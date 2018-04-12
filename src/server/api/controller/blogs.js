var Blogs = require('../models/blogs');

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
          } else { res.json({ errno: 0, mes: '发布博客成功' }) }
        });
      }
    });
  },
  update: (req, res) => {
    global.logger.info('blogs/update.json');
    const {title, content, intro, tags, author, cover} = req.body;
    Blogs.update(
      {title: {$in: title}},
      { content, intro, tags, author, updateAt: Date.now(), cover },
      (err, blog) => {
        if (err) global.logger.error(err);
        if (blog.ok === 1) res.json({ errno: 0, mes: `博客${title}更新成功` })
        else res.json({ errno: 1, mes: '博客更新失败' })
      }
    )
  },
  get: (req, res) => {
    global.logger.info('blogs/get.json');
    const _blog = req.query;
    Blogs.find(_blog, function(err, blogs) {
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
        res.json({ errno: 0, mes: `删除博客${_blog.title}成功` })
      } else res.json({ errno: 1, mes: `删除博客${_blog.title}失败` })
    });
  }
}
