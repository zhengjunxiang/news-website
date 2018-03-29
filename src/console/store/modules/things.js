import { AddThings, GetThings, DelThings } from '@/api/server.js';

export default {
  state: {},
  mutations: {},
  actions: {
    async addThings({commit}, data) {
      const res = await AddThings(data)
      return res.data
    },
    async getThings({commit}) {
      const res = await GetThings()
      return res.data
    },
    async delThings({commit}, data) {
      const res = await DelThings(data)
      return res.data
    }
  }
};
