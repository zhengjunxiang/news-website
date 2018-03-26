const user = require('./user');
const posts = require('./posts');

module.exports = function(app) {
  app.use(function(req, res, next) {
    app.locals.user = req.session.user;
    next();
  });
  app.use('/user', user);
  app.use('/posts', posts);
};
