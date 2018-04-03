const router = require('express').Router();
const user = require('../controller/user');
const blogs = require('../controller/blogs');
const things = require('../controller/things');
const tags = require('../controller/tags');
const upload = require('../controller/upload');

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
  // upload
  router.post('/resouce', upload.upImgs);
  router.get('/resouce', upload.getImgs);
  router.delete('/resouce/delete.json', upload.delImg);

  app.use(router);
};
