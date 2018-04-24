const router = require('express').Router();
const user = require('../controller/user');
const blogs = require('../controller/blogs');
const things = require('../controller/things');
const tags = require('../controller/tags');
const upload = require('../controller/upload');
const companion = require('../controller/companion');
const aboutUs = require('../controller/about-us');

module.exports = function(app) {
  app.use(function(req, res, next) {
    app.locals.user = req.session.user;
    next();
  });
  // user
  router.get('/user/get.json', user.get);
  router.post('/user/signin.json', user.signin);
  router.post('/user/signup.json', user.signup);
  router.delete('/user/delete.json', user.delete);
  router.post('/user/updateMessage.json', user.updateMessage);
  router.post('/user/updatePassW.json', user.updatePassW);
  router.get('/user/getUser.json', user.getUser);
  // blogs
  router.post('/blogs/add.json', blogs.add);
  router.post('/blogs/update.json', blogs.update);
  router.get('/blogs/get.json', blogs.get);
  router.delete('/blogs/delete.json', blogs.delete);
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
  // blogs
  router.post('/companion/add.json', companion.add);
  router.post('/companion/update.json', companion.update);
  router.get('/companion/get.json', companion.get);
  router.delete('/companion/delete.json', companion.delete);
  // aboutUs
  router.post('/aboutUs/update.json', aboutUs.update);
  router.get('/aboutUs/get.json', aboutUs.get);

  app.use(router);
};
