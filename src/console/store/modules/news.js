import {
  AddNews, GetNews, DelNews, UpdateNews,
  AddTags, GetTags, DelTags
} from '@/api/server.js';

export default {
  actions: {
    async addNews({commit}, data) {
      const res = await AddNews(data)
      return res.data
    },
    async updateNews({commit}, data) {
      const res = await UpdateNews(data)
      return res.data
    },
    async getNews({commit}, data) {
      const res = await GetNews(data)
      return res.data
    },
    async delNews({commit}, data) {
      const res = await DelNews(data)
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
