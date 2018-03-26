var express = require('express');
var Posts = require('../models/posts');
var router = express.Router();

router.post('/add.json', (req, res) => {
  global.logger.info('posts/add.json');
  const _post = req.body;
  Posts.findOne({title: _post.title}, function(err, posts) {
    if (err) global.logger.error(err);
    if (posts) {
      res.json({ errno: 1, mes: '该博客标题已存在' });
    } else {
      let posts = new Posts(_post);
      posts.save((err, posts) => {
        if (err) global.logger.error(err);
        res.json({ errno: 0, mes: '发布博客成功' });
      });
    }
  });
});

module.exports = router;
