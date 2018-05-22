module.exports = function(req, res, next) {
  if (!req.session.user) {
    const url = req.originalUrl;
    if (url === '/api/user/signin.json' ||
      url === '/api/user/signup.json' ||
      url === '/api/user/loginOut.json' ||
      /^\/api\/news\/get.json/g.test(url) ||
      /^\/api\/events\/get.json/g.test(url) ||
      url === '/api/news/like.json' ||
      url === '/api/news/unlike.json' ||
      url === '/api/tags/get.json' ||
      url === '/api/partners/get.json' ||
      url === '/api/events/get.json' ||
      url === '/api/about/get.json'
    ) next();
    else {
      req.session.destroy(() => {})
      res.json({ errno: 2, mes: '请先登录' })
    };
  } else next();
}
