module.exports = function(req, res, next) {
  if (!req.session.user) {
    const url = req.originalUrl;
    if (url === '/user/signin.json' ||
      url === '/user/signup.json' ||
      url === '/user/loginOut.json' ||
      url === '/blogs/get.json' ||
      url === '/blogs/like.json' ||
      url === '/blogs/unlike.json' ||
      url === '/tags/get.json' ||
      url === '/companion/get.json' ||
      url === '/aboutUs/get.json'
    ) next();
    else {
      req.session.destroy(() => {})
      res.json({ errno: 2, mes: '请先登录' })
    };
  } else next();
}
