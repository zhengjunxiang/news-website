const user = require('./user');

module.exports = function(app) {
  app.use(function(req, res, next) {
    app.locals.user = req.session.user;
    next();
  });
  app.use('/user', user);
};
