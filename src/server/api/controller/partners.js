var Partners = require('../models/partners');

module.exports = {
  add: (req, res, next) => {
    global.logger.info('partners/add.json');
    const _par = req.body;
    Partners.find({
      $and: [
        {'title': _par.title},
        {'lan': _par.lan}
      ]},
    function(err, partners) {
      if (err) global.logger.error(err);
      if (partners.length) {
        res.json({ errno: 1, mes: '该伙伴已存在' });
      } else {
        let partners = new Partners(_par);
        partners.save((err, _par) => {
          if (err) {
            global.logger.error(err);
            res.json({ errno: 1, mes: '伙伴添加失败' });
          } else {
            res.json({ errno: 0, mes: '伙伴添加成功' })
            next()
          }
        });
      }
    });
  },
  update: (req, res, next) => {
    global.logger.info('partners/update.json');
    const {title, content, link, cover, lan} = req.body;
    Partners.update(
      {$and: [ {title}, {lan} ]},
      { content, updateAt: Date.now(), link, cover, lan },
      (err, par) => {
        if (err) global.logger.error(err);
        if (par.ok === 1) {
          res.json({ errno: 0, mes: `伙伴${title}更新成功` })
          next()
        } else res.json({ errno: 1, mes: '伙伴更新失败' })
      }
    )
  },
  get: (req, res) => {
    global.logger.info('partners/get.json');
    const _com = req.query;
    Partners.find(_com).sort({'createAt': -1}).exec((err, partners) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mse: '', data: partners });
    });
  },
  delete: (req, res, next) => {
    global.logger.info('partners/delete.json');
    var { title, lan } = req.query;
    Partners.remove({title: {$in: title}, lan: {$in: lan}}, function(err, partners) {
      if (err) global.logger.error(err);
      if (partners.ok === 1) {
        res.json({ errno: 0, mes: `删除伙伴${title}成功` })
        next()
      } else res.json({ errno: 1, mes: `删除伙伴${title}失败` })
    });
  }
}
