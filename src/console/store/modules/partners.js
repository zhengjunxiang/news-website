import {
  AddPartners, UpdatePartners, GetPartners, DelPartners
} from '@/api/server.js';

export default {
  state: {},
  mutations: {},
  actions: {
    async addPartners({commit}, data) {
      const res = await AddPartners(data)
      return res.data
    },
    async updatePartners({commit}, data) {
      const res = await UpdatePartners(data)
      return res.data
    },
    async getPartners({commit}, data) {
      const res = await GetPartners(data)
      return res.data
    },
    async delPartners({commit}, data) {
      const res = await DelPartners(data)
      return res.data
    }
  }
};
