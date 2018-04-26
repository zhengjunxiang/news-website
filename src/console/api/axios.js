import axios from 'axios';
import { Message } from 'iview';
import vm from '../main';
const baseURL = '';

const instance = axios.create({timeout: 10000});

// 请求统一处理
instance.interceptors.request.use(config => {
  if (config.url && config.url.charAt(0) === '/') config.url = `${baseURL}${config.url}`;
  return config;
}, error => Promise.reject(error));

// 对返回的内容做统一处理
instance.interceptors.response.use(async response => {
  if (response.status === 200) {
    if (response.data.errno !== 0) {
      Message.error({ content: response.data.mes, duration: 3 })
      if (response.data.errno === 2) {
        vm.$store.commit('logout');
        vm.$store.commit('clearOpenedSubmenu');
        vm.$router.push({ name: 'login' });
      }
    } else return response
  };
  return Promise.reject(response);
}, error => {
  if (error) Message.error({ content: error, duration: 5 });
  else Message.error({ content: '出了点问题，暂时加载不出来，请联系技术支持。', duration: 5 });
  return Promise.reject(error);
});

export default instance;
