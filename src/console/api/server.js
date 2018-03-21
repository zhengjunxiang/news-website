import API from './axios';

const LoginUser = data => API.post('/user/signin.json', data);
const RegisterUser = data => API.post('/user/signup.json', data);

export { LoginUser, RegisterUser };
