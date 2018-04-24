import Cookies from 'js-cookie';
import { LoginUser, RegisterUser, GetUser, DelUser, UpdateMes, UpdatePassW, GetUserOne } from '@/api/server.js';

const user = {
  state: {
    userName: Cookies.get('user') || '',
    access: parseInt(Cookies.get('access'))
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
      if (localStorage.theme) theme = localStorage.theme;
      localStorage.clear();
      if (theme) localStorage.theme = theme;
    },
    setNameAndAccess(state, d) {
      Cookies.set('user', d.name);
      Cookies.set('access', d.access);
      localStorage.avatorImgPath = d.avatar || '';
      state.userName = d.name;
      state.access = d.access;
    }
  },
  actions: {
    async login({commit}, data) {
      const res = await LoginUser(data),
        d = res.data.data;
      commit('setNameAndAccess', d)
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
    },
    async updateMes({commit}, data) {
      const res = await UpdateMes(data)
      return res.data
    },
    async updatePassW({commit}, data) {
      const res = await UpdatePassW(data)
      return res.data
    },
    async getUserOne({commit}, data) {
      const res = await GetUserOne(data)
      return res.data
    }
  },
  getters: {
    userN: state => state.userName,
    accessCode: state => state.access
  }
};

export default user;
