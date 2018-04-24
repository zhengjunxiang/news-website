var Companion = require('../models/companion');

module.exports = {
  add: (req, res) => {
    global.logger.info('companion/add.json');
    const _com = req.body;
    Companion.findOne({title: _com.title}, function(err, companion) {
      if (err) global.logger.error(err);
      if (companion) {
        res.json({ errno: 1, mes: '该伙伴已存在' });
      } else {
        let companion = new Companion(_com);
        companion.save((err, companion) => {
          if (err) {
            global.logger.error(err);
            res.json({ errno: 1, mes: '伙伴添加失败' });
          } else { res.json({ errno: 0, mes: '伙伴添加成功' }) }
        });
      }
    });
  },
  update: (req, res) => {
    global.logger.info('companion/update.json');
    const {title, content, link, cover} = req.body;
    Companion.update(
      {title: {$in: title}},
      { content, updateAt: Date.now(), link, cover },
      (err, blog) => {
        if (err) global.logger.error(err);
        if (blog.ok === 1) res.json({ errno: 0, mes: `伙伴${title}更新成功` })
        else res.json({ errno: 1, mes: '伙伴更新失败' })
      }
    )
  },
  get: (req, res) => {
    global.logger.info('companion/get.json');
    const _com = req.query;
    Companion.find(_com).sort({'createAt': -1}).exec((err, companion) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mse: '', data: companion });
    });
  },
  delete: (req, res) => {
    global.logger.info('companion/delete.json');
    var _com = req.query;
    Companion.remove({title: _com.title}, function(err, companion) {
      if (err) global.logger.error(err);
      if (companion.ok === 1) {
        res.json({ errno: 0, mes: `删除伙伴${_com.title}成功` })
      } else res.json({ errno: 1, mes: `删除伙伴${_com.title}失败` })
    });
  }
}
