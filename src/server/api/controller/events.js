var Events = require('../models/events');

module.exports = {
  add: (req, res, next) => {
    global.logger.info('events/add.json');
    const _event = req.body;
    Events.findOne({title: _event.title}, function(err, events) {
      if (err) global.logger.error(err);
      if (events) {
        res.json({ errno: 1, mes: '该活动标题已存在' });
      } else {
        let events = new Events(_event);
        events.save((err, events) => {
          if (err) {
            global.logger.error(err);
            res.json({ errno: 1, mes: '发布活动失败' });
          } else {
            res.json({ errno: 0, mes: '发布活动成功' })
            next()
          }
        });
      }
    });
  },
  update: (req, res, next) => {
    global.logger.info('events/update.json');
    const {title, content, intro, tags, author, cover, feature, updateAt} = req.body;
    Events.update(
      {title: {$in: title}},
      { content, intro, tags, author, updateAt, cover, feature },
      (err, ne) => {
        if (err) global.logger.error(err);
        if (ne.ok === 1) {
          res.json({ errno: 0, mes: `活动${title}更新成功` })
          next()
        } else res.json({ errno: 1, mes: '活动更新失败' })
      }
    )
  },
  like(req, res) {
    global.logger.info('news/like.json');
    var {id} = req.body;
    if (!req.session.likeEvents) req.session.likeEvents = [];
    if (req.session.likeEvents.indexOf(id) !== -1) return res.json({ errno: 1, mes: '已经点过' })
    Events.update(
      {_id: {$in: id}},
      {$inc: { like: 1 }},
      (err, event) => {
        if (err) global.logger.error(err);
        if (event.ok === 1) {
          req.session.likeEvents.push(id)
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '点赞失败' })
      }
    );
  },
  unlike(req, res) {
    global.logger.info('events/unlike.json');
    var {title} = req.body;
    if (!req.session.unlikeEvents) req.session.unlikeEvents = [];
    if (req.session.unlikeEvents.indexOf(title) !== -1) return res.json({ errno: 1, mes: '已经点过' })
    Events.update(
      {title: {$in: title}},
      {$inc: { unlike: 1 }},
      (err, event) => {
        if (err) global.logger.error(err);
        if (event.ok === 1) {
          req.session.unlikeEvents.push(title)
          res.json({ errno: 0, mes: '' })
        } else res.json({ errno: 1, mes: '点赞失败' })
      }
    );
  },
  get: (req, res) => {
    global.logger.info('events/get.json');
    const _event = req.query, field = {};
    if (!_event.id) {
      field.content = 0;
      Events.find(_event, field).sort({'updateAt': -1}).exec((err, events) => {
        if (err) global.logger.error(err);
        else res.json({ errno: 0, mse: '', data: events });
      });
    } else {
      Events.findOne({_id: _event.id}).exec((err, events) => {
        if (err) global.logger.error(err);
        else res.json({ errno: 0, mse: '', data: events });
      });
    }
  },
  delete: (req, res, next) => {
    global.logger.info('events/delete.json');
    var _event = req.query;
    Events.remove({title: _event.title}, function(err, events) {
      if (err) global.logger.error(err);
      if (events.ok === 1) {
        res.json({ errno: 0, mes: `删除活动${_event.title}成功` })
        next()
      } else res.json({ errno: 1, mes: `删除活动${_event.title}失败` })
    });
  }
}
