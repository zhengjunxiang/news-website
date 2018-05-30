import {
  AddPosters, GetPosters, DelPosters
} from '@/api/server.js';

export default {
  state: {},
  mutations: {},
  actions: {
    async addPosters({commit}, data) {
      const res = await AddPosters(data)
      return res.data
    },
    async getPosters({commit}, data) {
      const res = await GetPosters(data)
      return res.data
    },
    async delPosters({commit}, data) {
      const res = await DelPosters(data)
      return res.data
    }
  }
};
