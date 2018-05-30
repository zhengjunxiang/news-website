import API from './axios';

// 用户
const LoginUser = data => API.post('/api/user/signin.json', data);
const RegisterUser = data => API.post('/api/user/signup.json', data);
const GetUser = data => API.get('/api/user/getUsers.json');
const GetUserOne = data => API.get('/api/user/getUser.json', {params: data});
const DelUser = data => API.delete('/api/user/delete.json', {params: data});
const UpdateMes = data => API.post('/api/user/updateMessage.json', data);
const UpdatePassW = data => API.post('/api/user/updatePassW.json', data);
const LoginOut = () => API.get('/api/user/loginOut.json');
const ReadMes = data => API.get('/api/user/readmes.json', {params: data});
const BinMes = data => API.get('/api/user/binmes.json', {params: data});
const ResetMes = data => API.get('/api/user/resetmes.json', {params: data});
const DelMes = data => API.get('/api/user/delmes.json', {params: data});
const DelAllMes = data => API.get('/api/user/delallmes.json', {params: data});
// 新闻
const AddNews = data => API.post('/api/news/add.json', data);
const UpdateNews = data => API.post('/api/news/update.json', data);
const GetNews = data => API.get('/api/news/get.json', {params: data});
const DelNews = data => API.delete('/api/news/delete.json', {params: data});
// 待办事件
const AddThings = data => API.post('/api/things/add.json', data);
const GetThings = () => API.get('/api/things/get.json');
const DelThings = data => API.delete('/api/things/delete.json', {params: data});
// 标签
const AddTags = data => API.post('/api/tags/add.json', data);
const GetTags = () => API.get('/api/tags/get.json');
const DelTags = data => API.delete('/api/tags/delete.json', {params: data});
// 获取已经上传的图片
const GetImgs = data => API.get('/api/resouce/getImgs.json', {params: data})
const DelImg = data => API.delete('/api/resouce/delImg.json', {params: data})
const Rename = data => API.put('/api/resouce/rename.json', data);
const Mkdir = data => API.post('/api/resouce/mkdir.json', data);
const DelDir = data => API.delete('/api/resouce/delDir.json', {params: data});
// posters
const AddPosters = data => API.post('/api/posters/add.json', data);
const UpdatePosters = data => API.post('/api/posters/update.json', data);
const GetPosters = data => API.get('/api/posters/get.json', {params: data});
const DelPosters = data => API.delete('/api/posters/delete.json', {params: data});
// 合作伙伴
const AddPartners = data => API.post('/api/partners/add.json', data);
const UpdatePartners = data => API.post('/api/partners/update.json', data);
const GetPartners = data => API.get('/api/partners/get.json', {params: data});
const DelPartners = data => API.delete('/api/partners/delete.json', {params: data});
// 关于我们
const UpdateAbout = data => API.post('/api/about/update.json', data);
const GetAbout = data => API.get('/api/about/get.json', {params: data});
const AddAbout = data => API.post('/api/about/add.json', data);
const DelAbout = data => API.delete('/api/about/delete.json', {params: data});
// 活动
const UpdateEvents = data => API.post('/api/events/update.json', data);
const GetEvents = data => API.get('/api/events/get.json', {params: data});
const AddEvents = data => API.post('/api/events/add.json', data);
const DelEvents = data => API.delete('/api/events/delete.json', {params: data});

export {
  GetImgs, DelImg, Rename, Mkdir, DelDir,
  LoginUser, RegisterUser, GetUser, DelUser, UpdateMes, UpdatePassW, GetUserOne, LoginOut,
  ReadMes, BinMes, ResetMes, DelMes, DelAllMes,
  AddNews, GetNews, DelNews, UpdateNews,
  AddThings, GetThings, DelThings,
  AddTags, GetTags, DelTags,
  AddPartners, UpdatePartners, GetPartners, DelPartners,
  AddPosters, UpdatePosters, GetPosters, DelPosters,
  UpdateAbout, GetAbout, AddAbout, DelAbout,
  UpdateEvents, GetEvents, AddEvents, DelEvents
};
