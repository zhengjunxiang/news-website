import {
  UpdateAboutUs, GetAboutUs
} from '@/api/server.js';

export default {
  actions: {
    async updateAboutUs({commit}, data) {
      const res = await UpdateAboutUs(data)
      return res.data
    },
    async getAboutUs({commit}, data) {
      const res = await GetAboutUs(data)
      return res.data
    }
  }
};
