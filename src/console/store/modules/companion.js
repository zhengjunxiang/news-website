import {
  AddCompanion, UpdateCompanion, GetCompanion, DelCompanion
} from '@/api/server.js';

export default {
  state: {},
  mutations: {},
  actions: {
    async addCompanion({commit}, data) {
      const res = await AddCompanion(data)
      return res.data
    },
    async updateCompanion({commit}, data) {
      const res = await UpdateCompanion(data)
      return res.data
    },
    async getCompanion({commit}, data) {
      const res = await GetCompanion(data)
      return res.data
    },
    async delCompanion({commit}, data) {
      const res = await DelCompanion(data)
      return res.data
    }
  }
};
