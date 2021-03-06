module.exports = function(req, res, next) {
  const path = req.path;
  if (path === '/api/user/delete.json') {
    if (req.session.user.access !== 0) return res.json({ errno: 1, mes: '没有权限' })
    next()
  } else if (path === '/api/user/signup.json') {
    if (req.body.access === 0) next()
    else {
      if (!req.session.user) return res.json({ errno: 1, mes: '请先登录' })
      if (req.session.user.access !== 0) return res.json({ errno: 1, mes: '没有权限' })
      else next()
    }
  } else next()
}
