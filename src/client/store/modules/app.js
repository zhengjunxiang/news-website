import {
  GetBlogs, GetTags
} from '@/api/server.js';
import { Message } from 'iview';

export default {
  state: {
    blogs: [],
    blog: {},
    tags: []
  },
  mutations: {
    setBlogs: (state, data) => {
      if (data.mes) Message.info(data.mes)
      if (data.data.length === 1) state.blog = data.data[0]
      else state.blogs = data.data
    },
    setTags: (state, data) => {
      state.tags = data.data.map(tag => ({value: tag.value, blogs: []}))
    },
    setTagsBlogs: (state) => {
      state.tags.map((tag, index) => {
        const key = tag.value
        state.blogs.map(blog => {
          blog.tags.map(tag => {
            if (tag === key) state.tags[index].blogs.push(blog)
          })
        })
      })
    }
  },
  actions: {
    async getBlogs({commit}, data) {
      const res = await GetBlogs(data)
      commit('setBlogs', res.data)
      return res.data
    },
    async getTags({commit}) {
      const res = await GetTags()
      commit('setTags', res.data)
      return res.data
    },
    getTagsAndBlogs({commit, dispatch, state}, data) {
      Promise.all([dispatch('getBlogs'), dispatch('getTags')])
        .then(data => {
          commit('setTagsBlogs')
        })
    }
  },
  getters: {
    blogs: state => state.blogs,
    blog: state => state.blog,
    tags: state => state.tags
  }
};
