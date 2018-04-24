import API from './axios';

// 登录注册
const LoginUser = data => API.post('/user/signin.json', data);
const RegisterUser = data => API.post('/user/signup.json', data);
const GetUser = data => API.get('/user/get.json');
const GetUserOne = data => API.get('/user/getUser.json', {params: data});
const DelUser = data => API.delete('/user/delete.json', {params: data});
const UpdateMes = data => API.post('/user/updateMessage.json', data);
const UpdatePassW = data => API.post('/user/updatePassW.json', data);
// 博客
const AddBlogs = data => API.post('/blogs/add.json', data);
const UpdateBlogs = data => API.post('/blogs/update.json', data);
const GetBlogs = data => API.get('/blogs/get.json', {params: data});
const DelBlogs = data => API.delete('/blogs/delete.json', {params: data});
// 待办事件
const AddThings = data => API.post('/things/add.json', data);
const GetThings = () => API.get('/things/get.json');
const DelThings = data => API.delete('/things/delete.json', {params: data});
// 标签
const AddTags = data => API.post('/tags/add.json', data);
const GetTags = () => API.get('/tags/get.json');
const DelTags = data => API.delete('/tags/delete.json', {params: data});
// 获取已经上传的图片
const GetImgs = data => API.get('/resouce', {params: data})
const DelImg = data => API.delete('/resouce/delImg.json', {params: data})
const Rename = data => API.put('/resouce/rename.json', data);
const Mkdir = data => API.post('/resouce/mkdir.json', data);
const DelDir = data => API.delete('/resouce/delDir.json', {params: data});
// 合作伙伴
const AddCompanion = data => API.post('/companion/add.json', data);
const UpdateCompanion = data => API.post('/companion/update.json', data);
const GetCompanion = data => API.get('/companion/get.json', {params: data});
const DelCompanion = data => API.delete('/companion/delete.json', {params: data});
// 关于我们
const UpdateAboutUs = data => API.post('/aboutUs/update.json', data);
const GetAboutUs = data => API.get('/aboutUs/get.json', {params: data});

export {
  GetImgs, DelImg, Rename, Mkdir, DelDir,
  LoginUser, RegisterUser, GetUser, DelUser, UpdateMes, UpdatePassW, GetUserOne,
  AddBlogs, GetBlogs, DelBlogs, UpdateBlogs,
  AddThings, GetThings, DelThings,
  AddTags, GetTags, DelTags,
  AddCompanion, UpdateCompanion, GetCompanion, DelCompanion,
  UpdateAboutUs, GetAboutUs
};
