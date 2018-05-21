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
  app.use(passRoutes);
  // user
  router.get('/api/user/get.json', user.get);
  router.post('/api/user/signin.json', user.signin);
  router.post('/api/user/signup.json', user.signup);
  router.delete('/api/user/delete.json', user.delete);
  router.post('/api/user/updateMessage.json', user.updateMessage);
  router.post('/api/user/updatePassW.json', user.updatePassW);
  router.get('/api/user/getUser.json', user.getUser);
  router.get('/api/user/loginOut.json', user.loginOut);
  // news
  router.post('/api/news/add.json', news.add);
  router.post('/api/news/update.json', news.update);
  router.get('/api/news/get.json', news.get);
  router.delete('/api/news/delete.json', news.delete);
  router.put('/api/news/like.json', news.like);
  router.put('/api/news/unlike.json', news.unlike);
  // things
  router.post('/api/things/add.json', things.add);
  router.get('/api/things/get.json', things.get);
  router.delete('/api/things/delete.json', things.delete);
  // tags
  router.post('/api/tags/add.json', tags.add);
  router.get('/api/tags/get.json', tags.get);
  router.delete('/api/tags/delete.json', tags.delete);
  // resouce
  router.post('/api/resouce/addImg.json', upload.upImgs);
  router.get('/api/resouce/getImgs.json', upload.getImgs);
  router.delete('/api/resouce/delImg.json', upload.delImg);
  router.put('/api/resouce/rename.json', upload.rename);
  router.post('/api/resouce/mkdir.json', upload.mkdir);
  router.delete('/api/resouce/delDir.json', upload.delDir);
  // partners
  router.post('/api/partners/add.json', partners.add);
  router.post('/api/partners/update.json', partners.update);
  router.get('/api/partners/get.json', partners.get);
  router.delete('/api/partners/delete.json', partners.delete);
  // about
  router.post('/api/about/update.json', about.update);
  router.get('/api/about/get.json', about.get);
  router.post('/api/about/add.json', about.add);
  router.delete('/api/about/delete.json', about.delete);
  // events
  router.post('/api/events/update.json', events.update);
  router.get('/api/events/get.json', events.get);
  router.post('/api/events/add.json', events.add);
  router.delete('/api/events/delete.json', events.delete);

  app.use(router);
};
