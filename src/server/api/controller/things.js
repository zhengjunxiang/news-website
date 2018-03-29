var Things = require('../models/things');

module.exports = {
  add: (req, res) => {
    global.logger.info('things/add.json');
    var _things = req.body;
    let thing = new Things(_things);
    Things.findOne({title: _things.title}, (err, things) => {
      if (err) {
        global.logger.error(err);
      } else {
        if (things) res.json({ errno: 1, mes: '该代办事已经存在' })
        else {
          thing.save((err, thing) => {
            if (err) global.logger.error(err);
            else res.json({ errno: 0, mes: '添加代办事件成功' });
          });
        }
      }
    })
  },
  get: (req, res) => {
    global.logger.info('things/get.json');
    Things.find({}, function(err, things) {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mes: '', data: things });
    });
  },
  delete: (req, res) => {
    global.logger.info('things/delete.json');
    var _things = req.query;
    Things.remove({title: _things.title}, function(err, things) {
      if (err) global.logger.error(err);
      if (things.ok === 1) res.json({ errno: 0, mes: '' })
      else res.json({ errno: 1, mes: `删除${_things.title}代办事件失败` })
    });
  }
}
