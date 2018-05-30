const User = require('../models/user');

module.exports = function(req, res, next) {
  const path = req.path,
    { name } = req.session.user;
  if (path === '/api/user/delete.json') {
    const _user = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除用户：${_user.name}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/user/signup.json') {
    const _user = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `注册用户：${_user.name}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/user/updateMessage.json') {
    User.update({name}, { $push: { messages: {
      $each: [{ mes: '更新了个人信息' }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/user/updatePassW.json') {
    User.update({name}, { $push: { messages: {
      $each: [{ mes: '更新了账号密码' }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/resouce/delImg.json') {
    const _name = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除图片 ${_name.name}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/resouce/delDir.json') {
    const _name = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除文件夹 ${_name.name}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/resouce/rename.json') {
    const { origin, newname } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `重命名图片 ${origin} -> ${newname}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/resouce/mkdir.json') {
    const { dirName } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `创建文件夹 ${dirName}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/things/add.json') {
    const _things = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `添加事件: ${_things.title}` }],
      $sort: { createAt: -1 }
    }}}, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/things/delete.json') {
    const _things = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除事件: ${_things.title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/tags/add.json') {
    const _tag = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `添加标签: ${_tag.value}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/tags/delete.json') {
    const _tag = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除标签: ${_tag.value}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/partners/add.json') {
    const _par = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `添加合作伙伴: ${_par.title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/partners/update.json') {
    const { title } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `修改合作伙伴: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/partners/delete.json') {
    const { title } = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除合作伙伴: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/news/add.json') {
    const { title } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `添加新闻: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/news/update.json') {
    const { title } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `更新新闻: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/news/delete.json') {
    const { title } = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除新闻: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/events/add.json') {
    const { title } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `添加活动: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/events/update.json') {
    const { title } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `更新活动: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/events/delete.json') {
    const { title } = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除活动: ${title}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/about/add.json') {
    const { lan } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `添加关于我们 ${lan}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/about/update.json') {
    const { lan } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `更新关于我们 ${lan}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/about/delete.json') {
    const { lan } = req.query;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `删除关于我们 ${lan}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  } else if (path === '/api/posters/add.json') {
    const { type } = req.body;
    User.update({name}, { $push: { messages: {
      $each: [{ mes: `更新广告 ${type}` }],
      $sort: { createAt: -1 }
    } } }, err => { if (err) global.logger.error(err) });
  }
}
