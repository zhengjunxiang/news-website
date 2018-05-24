var About = require('../models/about');

module.exports = {
  add(req, res) {
    global.logger.info('about/add.json');
    const _about = req.body;
    About.findOne({lan: _about.lan}, (err, us) => {
      if (err) {
        global.logger.error(err);
        res.json({ errno: 1, mes: '添加失败' });
      } else {
        if (us) {
          res.json({ errno: 1, mes: '该语言已经存在' })
        } else {
          let about = new About(_about);
          about.save((err, news) => {
            if (err) {
              global.logger.error(err);
              res.json({ errno: 1, mes: '添加失败' });
            } else { res.json({ errno: 0, mes: '添加成功' }) }
          });
        }
      }
    })
  },
  update: (req, res, next) => {
    global.logger.info('about/update.json');
    const {content, lan} = req.body;
    About.update(
      {lan: {$in: lan}},
      { content, updateAt: Date.now() },
      (err, ne) => {
        if (err) global.logger.error(err);
        if (ne.ok === 1) {
          res.json({ errno: 0, mes: '关于我们更新成功' })
          next()
        } else res.json({ errno: 1, mes: '关于我们更新失败' })
      }
    )
  },
  get: (req, res) => {
    global.logger.info('about/get.json');
    About.find().exec((err, about) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mse: '', data: about });
    });
  },
  delete: (req, res) => {
    global.logger.info('about/delete.json');
    var { lan } = req.query;
    About.remove({ lan }, function(err, about) {
      if (err) global.logger.error(err);
      if (about.ok === 1) res.json({ errno: 0, mes: '删除成功' })
      else res.json({ errno: 1, mes: '删除失败' })
    });
  }
}
