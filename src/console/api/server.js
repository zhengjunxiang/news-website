import API from './axios';

const LoginUser = data => API.post('/user/signin.json', data);
const RegisterUser = data => API.post('/user/signup.json', data);
const AddPosts = data => API.post('/posts/add.json', data);

export { LoginUser, RegisterUser, AddPosts };
