import axios from 'axios';
import vm from '@/main';
const baseURL = '';

const instance = axios.create({timeout: 15000});

// 请求统一处理
instance.interceptors.request.use(function (config) {
  vm.$store.commit('setLoading', true)
  if (config.url && config.url.charAt(0) === '/') config.url = `${baseURL}${config.url}`;
  return config;
}, function (error) {
  return Promise.reject(error)
});

// 对返回的内容做统一处理
instance.interceptors.response.use(response => {
  vm.$store.commit('setLoading', false)
  if (response.status === 200) {
    if (response.data.errno !== 0) response.data.mes && vm.$Message.error({content: response.data.mes})
    else return response
  };
  return Promise.reject(response);
}, error => {
  vm.$store.commit('setLoading', false)
  if (error) vm.$Message.error({content: error});
  else vm.$Message.error('出了点问题，暂时加载不出来，请联系技术支持。');
  return Promise.reject(error);
});

export default instance;
