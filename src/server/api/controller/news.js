var News = require('../models/news');

module.exports = {
  add: (req, res, next) => {
    global.logger.info('news/add.json');
    const _new = req.body;
    News.findOne({title: _new.title}, function(err, news) {
      if (err) global.logger.error(err);
      if (news) {
        res.json({ errno: 1, mes: '该新闻标题已存在' });
      } else {
        let news = new News(_new);
        news.save((err, news) => {
          if (err) {
            global.logger.error(err);
            res.json({ errno: 1, mes: '发布新闻失败' });
          } else {
            res.json({ errno: 0, mes: '发布新闻成功' })
            next()
          }
        });
      }
    });
  },
  update: (req, res, next) => {
    global.logger.info('news/update.json');
    const {title, content, intro, tags, author, cover, feature} = req.body;
    News.update(
      {title: {$in: title}},
      { content, intro, tags, author, updateAt: Date.now(), cover, feature },
      (err, ne) => {
        if (err) global.logger.error(err);
        if (ne.ok === 1) {
          res.json({ errno: 0, mes: `新闻${title}更新成功` })
          next()
        } else res.json({ errno: 1, mes: '新闻更新失败' })
      }
    )
  },
  like(req, res) {
    global.logger.info('news/like.json');
    var {title} = req.body;
    if (!req.session.like) req.session.like = [];
    if (req.session.like.indexOf(title) !== -1) return res.json({ errno: 1, mes: '已经点过' })
    News.update(
      {title: {$in: title}},
      {$inc: { like: 1 }},
      (err, ne) => {
        if (err) global.logger.error(err);
        if (ne.ok === 1) {
          req.session.like.push(title)
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '点赞失败' })
      }
    );
  },
  unlike(req, res) {
    global.logger.info('news/unlike.json');
    var {title} = req.body;
    if (!req.session.unlike) req.session.unlike = [];
    if (req.session.unlike.indexOf(title) !== -1) return res.json({ errno: 1, mes: '已经点过' })
    News.update(
      {title: {$in: title}},
      {$inc: { unlike: 1 }},
      (err, ne) => {
        if (err) global.logger.error(err);
        if (ne.ok === 1) {
          req.session.unlike.push(title)
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '点赞失败' })
      }
    );
  },
  get: (req, res) => {
    global.logger.info('news/get.json');
    const _new = req.query, field = {};
    if (!_new.title) {
      field.content = 0;
      News.find(_new, field).sort({'updateAt': -1}).exec((err, news) => {
        if (err) global.logger.error(err);
        else res.json({ errno: 0, mse: '', data: news });
      });
    } else {
      News.findOne(_new).sort({'updateAt': -1}).exec((err, news) => {
        if (err) global.logger.error(err);
        else res.json({ errno: 0, mse: '', data: news });
      });
    }
  },
  delete: (req, res, next) => {
    global.logger.info('news/delete.json');
    var _new = req.query;
    News.remove({title: _new.title}, function(err, news) {
      if (err) global.logger.error(err);
      if (news.ok === 1) {
        res.json({ errno: 0, mes: `删除新闻${_new.title}成功` })
        next()
      } else res.json({ errno: 1, mes: `删除新闻${_new.title}失败` })
    });
  }
}
