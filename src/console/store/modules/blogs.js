import {
  AddBlogs, GetBlogs, DelBlogs, UpdateBlogs,
  AddTags, GetTags, DelTags
} from '@/api/server.js';

export default {
  actions: {
    async addBlogs({commit}, data) {
      const res = await AddBlogs(data)
      return res.data
    },
    async updateBlogs({commit}, data) {
      const res = await UpdateBlogs(data)
      return res.data
    },
    async getBlogs({commit}, data) {
      const res = await GetBlogs(data)
      return res.data
    },
    async delBlogs({commit}, data) {
      const res = await DelBlogs(data)
      return res.data
    },
    async addTags({commit}, data) {
      const res = await AddTags(data)
      return res.data
    },
    async getTags({commit}) {
      const res = await GetTags()
      return res.data
    },
    async delTags({commit}, data) {
      const res = await DelTags(data)
      return res.data
    }
  }
};
