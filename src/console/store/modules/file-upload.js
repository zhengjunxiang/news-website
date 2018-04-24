import {
  GetImgs, DelImg, Rename, Mkdir, DelDir
} from '@/api/server.js';

export default {
  state: {},
  mutations: {},
  actions: {
    async getImgs({commit}, data) {
      const res = await GetImgs(data)
      return res.data
    },
    async delImg({commit}, data) {
      const res = await DelImg(data)
      return res.data
    },
    async rename({commit}, data) {
      const res = await Rename(data)
      return res.data
    },
    async mkdir({commit}, data) {
      const res = await Mkdir(data)
      return res.data
    },
    async delDir({commit}, data) {
      const res = await DelDir(data)
      return res.data
    }
  }
};
