module.exports = function(req, res, next) {
  const path = req.path;
  if (path === '/api/user/delete.json' || path === '/api/user/signup.json') {
    if (req.session.user.access !== 0) return res.json({ errno: 1, mes: '没有权限' })
    next()
  } else next()
}
