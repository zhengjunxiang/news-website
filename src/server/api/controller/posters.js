var Posters = require('../models/posters');

module.exports = {
  add: (req, res, next) => {
    global.logger.info('posters/add.json');
    const _poster = req.body;
    Posters.find({
      $and: [{'type': _poster.type}]
    },
    function(err, posters) {
      if (err) global.logger.error(err);
      if (posters.length) {
        Posters.update(
          {$and: [ {type: _poster.type} ]},
          { updateAt: Date.now(), link: _poster.link, cover: _poster.cover, title: _poster.title },
          (err, par) => {
            if (err) global.logger.error(err);
            if (par.ok === 1) {
              res.json({ errno: 0, mes: '广告更新成功' })
              next()
            } else res.json({ errno: 1, mes: '广告更新失败' })
          }
        )
      } else {
        let posters = new Posters(_poster);
        posters.save((err, _poster) => {
          if (err) {
            global.logger.error(err);
            res.json({ errno: 1, mes: '广告添加失败' });
          } else {
            res.json({ errno: 0, mes: '广告添加成功' })
            next()
          }
        });
      }
    });
  },
  get: (req, res) => {
    global.logger.info('posters/get.json');
    const _com = req.query;
    Posters.find(_com).sort({'updateAt': -1}).exec((err, posters) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mes: '', data: posters });
    });
  },
  delete: (req, res, next) => {
    global.logger.info('posters/delete.json');
    var { title, type } = req.query;
    Posters.remove({type: {$in: type}}, function(err, posters) {
      if (err) global.logger.error(err);
      if (posters.ok === 1) {
        res.json({ errno: 0, mes: `删除广告${title}成功` })
        next()
      } else res.json({ errno: 1, mes: `删除广告${title}失败` })
    });
  }
}
