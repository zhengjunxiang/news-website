module.exports = function(req, res, next) {
  const path = req.path;
  if (path === '/api/user/delete.json') {
    if (req.session.user.access !== 0) return res.json({ errno: 1, mes: '没有权限' })
    next()
  } else if (path === '/api/user/signup.json') {
    if (req.body.access === 0) return next()
    else if (req.session.user.access !== 0) return res.json({ errno: 1, mes: '没有权限' })
  } else next()
}
