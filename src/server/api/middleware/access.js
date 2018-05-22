module.exports = function(req, res, next) {
  const path = req.path;
  if (
    path === '/api/about/add.json' ||
    path === '/api/about/update.json' ||
    path === '/api/about/delete.json' ||
    path === '/api/events/delete.json' ||
    path === '/api/news/delete.json' ||
    path === '/api/user/delete.json' ||
    path === '/api/user/signup.json'
  ) {
    if (req.session.user.access !== 0) return res.json({ errno: 1, mes: '没有权限' })
    next()
  } else if (
    path === '/api/events/update.json' ||
    path === '/api/news/update.json' ||
    path === '/api/resouce/delImg.json' ||
    path === '/api/resouce/delDir.json' ||
    path === '/api/resouce/rename.json'
  ) {
    if (req.session.user.access > 1) return res.json({ errno: 1, mes: '没有权限' })
    next()
  } else next()
}
