import Cookies from 'js-cookie';
import { LoginUser, RegisterUser, GetUser, DelUser } from '@/api/server.js';

const user = {
  state: {
    userName: Cookies.get('user')
  },
  mutations: {
    logout(state, vm) {
      Cookies.remove('user');
      Cookies.remove('access');
      // 恢复默认样式
      let themeLink = document.querySelector('link[name="theme"]');
      themeLink.setAttribute('href', '');
      // 清空打开的页面等数据，但是保存主题数据
      let theme = '';
      if (localStorage.theme) {
        theme = localStorage.theme;
      }
      localStorage.clear();
      if (theme) {
        localStorage.theme = theme;
      }
    }
  },
  actions: {
    async login({commit}, data) {
      const res = await LoginUser(data)
      return res.data
    },
    async register({commit}, data) {
      const res = await RegisterUser(data)
      return res.data
    },
    async getUser({commit}, data) {
      const res = await GetUser(data)
      return res.data
    },
    async delUser({commit}, data) {
      const res = await DelUser(data)
      return res.data
    }
  },
  getters: {
    userN: state => state.userName
  }
};

export default user;