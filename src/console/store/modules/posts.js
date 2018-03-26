import { AddPosts } from '@/api/server.js';

const posts = {
  state: {},
  mutations: {
  },
  actions: {
    async addPosts({commit}, data) {
      const res = await AddPosts(data)
      return res.data
    }
  }
};

export default posts;
