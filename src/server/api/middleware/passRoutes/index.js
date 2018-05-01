module.exports = function(req, res, next) {
  if (!req.session.user) {
    const url = req.originalUrl;
    if (url === '/user/signin.json' ||
      url === '/user/signup.json' ||
      url === '/user/loginOut.json' ||
      /^\/news\/get.json/g.test(url) ||
      /^\/events\/get.json/g.test(url) ||
      url === '/news/like.json' ||
      url === '/news/unlike.json' ||
      url === '/tags/get.json' ||
      url === '/partners/get.json' ||
      url === '/events/get.json' ||
      url === '/about/get.json'
    ) next();
    else {
      req.session.destroy(() => {})
      res.json({ errno: 2, mes: '请先登录' })
    };
  } else next();
}
