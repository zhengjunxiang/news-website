var AboutUs = require('../models/about-us');

module.exports = {
  update: (req, res) => {
    global.logger.info('aboutUs/update.json');
    const {content} = req.body;
    AboutUs.find({}, (err, us) => {
      if (err) global.logger.error(err);
      if (us.length > 0) {
        AboutUs.update(
          {title: {$in: 'aboutUs'}},
          { content, updateAt: Date.now() },
          (err, blog) => {
            if (err) global.logger.error(err);
            if (blog.ok === 1) res.json({ errno: 0, mes: '关于我们更新成功' })
            else res.json({ errno: 1, mes: '关于我们更新失败' })
          }
        )
      } else {
        const _aboutUs = req.body;
        let aboutUs = new AboutUs(_aboutUs);
        aboutUs.save((err, blogs) => {
          if (err) {
            global.logger.error(err);
            res.json({ errno: 1, mes: '发布博客失败' });
          } else { res.json({ errno: 0, mes: '发布博客成功' }) }
        });
      }
    })
  },
  get: (req, res) => {
    global.logger.info('aboutUs/get.json');
    AboutUs.find().exec((err, aboutUs) => {
      if (err) global.logger.error(err);
      else res.json({ errno: 0, mse: '', data: aboutUs });
    });
  }
}
