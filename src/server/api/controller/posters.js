var Partners = require('../models/posters');

module.exports = {
  add: (req, res, next) => {
    global.logger.info('posters/add.json');
    const _par = req.body;
    Partners.find({
      $and: [
        {'title': _par.title},
        {'lan': _par.lan}
      ]},
    function(err, posters) {
      if (err) global.logger.error(err);
      if (posters.length) {
        res.json({ errno: 1, mes: '该广告已存在' });
      } else {
        let posters = new Partners(_par);
        posters.save((err, _par) => {
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
  update: (req, res, next) => {
    global.logger.info('posters/update.json');
    const {title, content, link, cover, lan} = req.body;
    Partners.update(
      {$and: [ {title}, {lan} ]},
      { content, updateAt: Date.now(), link, cover, lan },
      (err, par) => {
        if (err) global.logger.error(err);
        if (par.ok === 1) {
          res.json({ errno: 0, mes: `广告${title}更新成功` })
          next()
        } else res.json({ errno: 1, mes: '广告更新失败' })
      }
    )
  },
  get: (req, res) => {
    global.logger.info('posters/get.json');
    const _com = req.query;
    Partners.find(_com).sort({'createAt': -1}).exec((err, posters) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mse: '', data: posters });
    });
  },
  delete: (req, res, next) => {
    global.logger.info('posters/delete.json');
    var { title, lan } = req.query;
    Partners.remove({title: {$in: title}, lan: {$in: lan}}, function(err, posters) {
      if (err) global.logger.error(err);
      if (posters.ok === 1) {
        res.json({ errno: 0, mes: `删除广告${title}成功` })
        next()
      } else res.json({ errno: 1, mes: `删除广告${title}失败` })
    });
  }
}
