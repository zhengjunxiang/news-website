const User = require('../models/user');

function addMes(name, mes) {
  User.update({name}, { $push: { messages: {
    $each: [{ mes }],
    $sort: { createAt: -1 }
  } } }, err => { if (err) global.logger.error(err) });
}

module.exports = function(req, res, next) {
  if (req.path === '/api/account/signin.json') next();
  if (!req.session.user) return res.json({ errno: 2, mes: '请先登录' })
  const path = req.path,
    { name } = req.session.user;
  if (path === '/api/user/delete.json') {
    const _user = req.query;
    addMes(name, `删除用户：${_user.name}`)
  } else if (path === '/api/user/signup.json') {
    const _user = req.body;
    addMes(name, `注册用户：${_user.name}`)
  } else if (path === '/api/user/updateMessage.json') {
    addMes(name, '更新了个人信息')
  } else if (path === '/api/user/updatePassW.json') {
    addMes(name, '更新了账号密码')
  } else if (path === '/api/resouce/delImg.json') {
    const _name = req.query;
    addMes(name, `删除图片 ${_name.name}`)
  } else if (path === '/api/resouce/delDir.json') {
    const _name = req.query;
    addMes(name, `删除文件夹 ${_name.name}`)
  } else if (path === '/api/resouce/rename.json') {
    const { origin, newname } = req.body;
    addMes(name, `重命名图片 ${origin} -> ${newname}`)
  } else if (path === '/api/resouce/mkdir.json') {
    const { dirName } = req.body;
    addMes(name, `创建文件夹 ${dirName}`)
  } else if (path === '/api/things/add.json') {
    const _things = req.body;
    addMes(name, `添加事件: ${_things.title}`)
  } else if (path === '/api/things/delete.json') {
    const _things = req.query;
    addMes(name, `删除事件: ${_things.title}`)
  } else if (path === '/api/tags/add.json') {
    const _tag = req.body;
    addMes(name, `添加标签: ${_tag.value}`)
  } else if (path === '/api/tags/delete.json') {
    const _tag = req.query;
    addMes(name, `删除标签: ${_tag.value}`)
  } else if (path === '/api/partners/add.json') {
    const _par = req.body;
    addMes(name, `添加合作伙伴: ${_par.title}`)
  } else if (path === '/api/partners/update.json') {
    const { title } = req.body;
    addMes(name, `修改合作伙伴: ${title}`)
  } else if (path === '/api/partners/delete.json') {
    const { title } = req.query;
    addMes(name, `删除合作伙伴: ${title}`)
  } else if (path === '/api/news/add.json') {
    const { title } = req.body;
    addMes(name, `添加新闻: ${title}`)
  } else if (path === '/api/news/update.json') {
    const { title } = req.body;
    addMes(name, `更新新闻: ${title}`)
  } else if (path === '/api/news/delete.json') {
    const { title } = req.query;
    addMes(name, `删除新闻: ${title}`)
  } else if (path === '/api/events/add.json') {
    const { title } = req.body;
    addMes(name, `添加活动: ${title}`)
  } else if (path === '/api/events/update.json') {
    const { title } = req.body;
    addMes(name, `更新活动: ${title}`)
  } else if (path === '/api/events/delete.json') {
    const { title } = req.query;
    addMes(name, `删除活动: ${title}`)
  } else if (path === '/api/about/add.json') {
    const { lan } = req.body;
    addMes(name, `添加关于我们 ${lan}`)
  } else if (path === '/api/about/update.json') {
    const { lan } = req.body;
    addMes(name, `更新关于我们 ${lan}`)
  } else if (path === '/api/about/delete.json') {
    const { lan } = req.query;
    addMes(name, `删除关于我们 ${lan}`)
  } else if (path === '/api/posters/add.json') {
    const { type } = req.body;
    addMes(name, `更新广告 ${type}`)
  } else if (path === '/api/contact/delete.json') {
    addMes(name, '删除了留言')
  }
}
