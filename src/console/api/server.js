import API from './axios';

// 登录注册
const LoginUser = data => API.post('/user/signin.json', data);
const RegisterUser = data => API.post('/user/signup.json', data);
const GetUser = data => API.get('/user/get.json', data);
const DelUser = data => API.delete('/user/delete.json', {params: data});
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
const GetImgs = () => API.get('/resouce')

export {
  GetImgs,
  LoginUser, RegisterUser, GetUser, DelUser,
  AddBlogs, GetBlogs, DelBlogs, UpdateBlogs,
  AddThings, GetThings, DelThings,
  AddTags, GetTags, DelTags
};
