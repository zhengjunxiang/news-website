import axios from 'axios';
import Vue from 'vue';
const baseURL = '';

const instance = axios.create({timeout: 30000});

// 请求统一处理
instance.interceptors.request.use(config => {
  if (config.url && config.url.charAt(0) === '/') config.url = `${baseURL}${config.url}`;
  return config;
}, error => Promise.reject(error));

// 对返回的内容做统一处理
instance.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.errno !== 0) Vue.$Alert.error({ mes: response.data.mes })
    else return response
  };
  return Promise.reject(response);
}, error => {
  if (error) Vue.$Alert.error({ mes: error, dur: 5 });
  else Vue.$Alert.error({ mes: '出了点问题，暂时加载不出来，请联系技术支持。', dur: 5 });
  return Promise.reject(error);
});

export default instance;
