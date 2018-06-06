var Contact = require('../models/contact');

module.exports = {
  add: (req, res, next) => {
    global.logger.info('contact/add.json');
    const body = req.body;
    let contact = new Contact(body);
    contact.save((err, contact) => {
      if (err) global.logger.error(err);
      else {
        res.json({ errno: 0, mes: 'Thinks' })
        next()
      }
    });
  },
  get: (req, res) => {
    global.logger.info('contact/get.json');
    Contact.find({}).sort({'createAt': -1}).exec((err, contact) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mes: '', data: contact });
    });
  },
  update: (req, res) => {
    global.logger.info('contact/update.json');
    var { id, type } = req.body, update = {};
    if (type === 'watch') update.isWatch = true;
    else if (type === 'deal') update.isDeal = true;
    Contact.update({ _id: id }, update, function(err, contact) {
      if (err) global.logger.error(err);
      if (contact.ok === 1) res.json({ errno: 0, mes: '' })
      else res.json({ errno: 1, mes: '设置为已读失败' });
    });
  },
  delete: (req, res, next) => {
    global.logger.info('contact/delete.json');
    var query = req.query;
    Contact.remove({_id: {$in: query.id}}, function(err, contact) {
      if (err) global.logger.error(err);
      if (contact.ok === 1) res.json({ errno: 0, mes: '删除成功' })
      else res.json({ errno: 1, mes: '删除失败' })
    });
  }
}
