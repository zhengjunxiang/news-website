const router = require('express').Router();
const passRoutes = require('../middleware/passRoutes/index')
const user = require('../controller/user');
const news = require('../controller/news');
const things = require('../controller/things');
const tags = require('../controller/tags');
const upload = require('../controller/upload');
const partners = require('../controller/partners');
const about = require('../controller/about');
const events = require('../controller/events');

module.exports = function(app) {
  // app.use(passRoutes);
  // user
  router.get('/user/get.json', user.get);
  router.post('/user/signin.json', user.signin);
  router.post('/user/signup.json', user.signup);
  router.delete('/user/delete.json', user.delete);
  router.post('/user/updateMessage.json', user.updateMessage);
  router.post('/user/updatePassW.json', user.updatePassW);
  router.get('/user/getUser.json', user.getUser);
  router.get('/user/loginOut.json', user.loginOut);
  // news
  router.post('/news/add.json', news.add);
  router.post('/news/update.json', news.update);
  router.get('/news/get.json', news.get);
  router.delete('/news/delete.json', news.delete);
  router.put('/news/like.json', news.like);
  router.put('/news/unlike.json', news.unlike);
  // things
  router.post('/things/add.json', things.add);
  router.get('/things/get.json', things.get);
  router.delete('/things/delete.json', things.delete);
  // tags
  router.post('/tags/add.json', tags.add);
  router.get('/tags/get.json', tags.get);
  router.delete('/tags/delete.json', tags.delete);
  // uploadImg
  router.post('/resouce', upload.upImgs);
  router.get('/resouce', upload.getImgs);
  router.delete('/resouce/delImg.json', upload.delImg);
  router.put('/resouce/rename.json', upload.rename);
  router.post('/resouce/mkdir.json', upload.mkdir);
  router.delete('/resouce/delDir.json', upload.delDir);
  // partners
  router.post('/partners/add.json', partners.add);
  router.post('/partners/update.json', partners.update);
  router.get('/partners/get.json', partners.get);
  router.delete('/partners/delete.json', partners.delete);
  // about
  router.post('/about/update.json', about.update);
  router.get('/about/get.json', about.get);
  router.post('/about/add.json', about.add);
  router.delete('/about/delete.json', about.delete);
  // events
  router.post('/events/update.json', events.update);
  router.get('/events/get.json', events.get);
  router.post('/events/add.json', events.add);
  router.delete('/events/delete.json', events.delete);

  app.use(router);
};
