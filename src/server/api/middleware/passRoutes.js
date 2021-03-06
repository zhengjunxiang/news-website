module.exports = function(req, res, next) {
  if (!req.session.user) {
    const path = req.path;
    if (path === '/api/user/signin.json' ||
      path === '/api/account/signin.json' ||
      path === '/api/user/signup.json' ||
      path === '/api/user/loginOut.json' ||
      /^\/api\/news\/get.json/g.test(path) ||
      /^\/api\/events\/get.json/g.test(path) ||
      path === '/api/news/like.json' ||
      path === '/api/news/unlike.json' ||
      path === '/api/tags/get.json' ||
      path === '/api/partners/get.json' ||
      path === '/api/events/get.json' ||
      path === '/api/events/like.json' ||
      path === '/api/events/unlike.json' ||
      path === '/api/about/get.json' ||
      path === '/api/posters/get.json' ||
      path === '/api/contact/add.json' ||
      path === '/api/user/getUserAvatar.json'
    ) next();
    else {
      req.session.destroy(() => {})
      res.json({ errno: 2, mes: '请先登录' })
    };
  } else next();
}
