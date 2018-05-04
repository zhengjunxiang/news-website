import API from './axios';

// 登录注册
const LoginUser = data => API.post('/user/signin.json', data);
const RegisterUser = data => API.post('/user/signup.json', data);
const GetUser = data => API.get('/user/get.json');
const GetUserOne = data => API.get('/user/getUser.json', {params: data});
const DelUser = data => API.delete('/user/delete.json', {params: data});
const UpdateMes = data => API.post('/user/updateMessage.json', data);
const UpdatePassW = data => API.post('/user/updatePassW.json', data);
const LoginOut = () => API.get('/user/loginOut.json');
// 新闻
const AddNews = data => API.post('/news/add.json', data);
const UpdateNews = data => API.post('/news/update.json', data);
const GetNews = data => API.get('/news/get.json', {params: data});
const DelNews = data => API.delete('/news/delete.json', {params: data});
// 待办事件
const AddThings = data => API.post('/things/add.json', data);
const GetThings = () => API.get('/things/get.json');
const DelThings = data => API.delete('/things/delete.json', {params: data});
// 标签
const AddTags = data => API.post('/tags/add.json', data);
const GetTags = () => API.get('/tags/get.json');
const DelTags = data => API.delete('/tags/delete.json', {params: data});
// 获取已经上传的图片
const GetImgs = data => API.get('/resouce/getImgs.json', {params: data})
const DelImg = data => API.delete('/resouce/delImg.json', {params: data})
const Rename = data => API.put('/resouce/rename.json', data);
const Mkdir = data => API.post('/resouce/mkdir.json', data);
const DelDir = data => API.delete('/resouce/delDir.json', {params: data});
// 合作伙伴
const AddPartners = data => API.post('/partners/add.json', data);
const UpdatePartners = data => API.post('/partners/update.json', data);
const GetPartners = data => API.get('/partners/get.json', {params: data});
const DelPartners = data => API.delete('/partners/delete.json', {params: data});
// 关于我们
const UpdateAbout = data => API.post('/about/update.json', data);
const GetAbout = data => API.get('/about/get.json', {params: data});
const AddAbout = data => API.post('/about/add.json', data);
const DelAbout = data => API.delete('/about/delete.json', {params: data});
// 活动
const UpdateEvents = data => API.post('/events/update.json', data);
const GetEvents = data => API.get('/events/get.json', {params: data});
const AddEvents = data => API.post('/events/add.json', data);
const DelEvents = data => API.delete('/events/delete.json', {params: data});

export {
  GetImgs, DelImg, Rename, Mkdir, DelDir,
  LoginUser, RegisterUser, GetUser, DelUser, UpdateMes, UpdatePassW, GetUserOne, LoginOut,
  AddNews, GetNews, DelNews, UpdateNews,
  AddThings, GetThings, DelThings,
  AddTags, GetTags, DelTags,
  AddPartners, UpdatePartners, GetPartners, DelPartners,
  UpdateAbout, GetAbout, AddAbout, DelAbout,
  UpdateEvents, GetEvents, AddEvents, DelEvents
};
