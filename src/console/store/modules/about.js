import {
  UpdateAbout, GetAbout, AddAbout, DelAbout
} from '@/api/server.js';

export default {
  actions: {
    async updateAbout({commit}, data) {
      const res = await UpdateAbout(data)
      return res.data
    },
    async getAbout({commit}, data) {
      const res = await GetAbout(data)
      return res.data
    },
    async addAbout({commit}, data) {
      const res = await AddAbout(data)
      return res.data
    },
    async delAbout({commit}, data) {
      const res = await DelAbout(data)
      return res.data
    }
  }
};
