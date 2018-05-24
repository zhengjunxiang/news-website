import Cookies from 'js-cookie';
import {
  LoginUser, RegisterUser, GetUser, DelUser, UpdateMes, UpdatePassW, GetUserOne, LoginOut,
  ReadMes, BinMes, ResetMes, DelMes
} from '@/api/server.js';

const user = {
  state: {
    userName: Cookies.get('user') || '',
    access: parseInt(Cookies.get('access')),
    mesCount: 0
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
      Cookies.set('user', d.name, { expires: 0.3 });
      Cookies.set('access', d.access, { expires: 0.3 });
      localStorage.avatorImgPath = d.avatar || '';
      state.userName = d.name;
      state.access = d.access;
    },
    setMesCount(state, num) {
      state.mesCount = num
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
    },
    async loginOut({commit}, data) {
      const res = await LoginOut(data)
      return res.data
    },
    async readMes({commit}, data) {
      const res = await ReadMes(data)
      return res.data
    },
    async binMes({commit}, data) {
      const res = await BinMes(data)
      return res.data
    },
    async resetMes({commit}, data) {
      const res = await ResetMes(data)
      return res.data
    },
    async delMes({commit}, data) {
      const res = await DelMes(data)
      return res.data
    }
  },
  getters: {
    userN: state => state.userName,
    accessCode: state => state.access,
    mesCount: state => state.mesCount
  }
};

export default user;
