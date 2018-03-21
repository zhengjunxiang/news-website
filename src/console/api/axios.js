import axios from 'axios';
import {Message} from 'iview';
const baseURL = '';

const instance = axios.create({timeout: 10000});

// 请求统一处理
instance.interceptors.request.use(config => {
  if (config.url && config.url.charAt(0) === '/') config.url = `${baseURL}${config.url}`;
  return config;
}, error => Promise.reject(error));

// 对返回的内容做统一处理
instance.interceptors.response.use(response => {
  if (response.status === 200) return response;
  return Promise.reject(response);
}, error => {
  if (error) Message.error({ content: JSON.stringify(error), duration: 3 });
  else Message.error({ content: '出了点问题，暂时加载不出来，请稍后再来吧', duration: 3 });
  return Promise.reject(error);
});

export default instance;
