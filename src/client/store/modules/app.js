import {
  GetBlogs, GetTags, GetCompanion, GetAboutUs
} from '@/api/server.js';
import { Message } from 'iview';

export default {
  state: {
    blogs: [],
    blog: {},
    newBlog: '',
    oldBlog: '',
    tags: [],
    currentTitle: '',
    blogsSortByYear: [],
    blogsSortByMonth: []
  },
  mutations: {
    setCurrentTitle: (state, data) => {
      if (data) state.currentTitle = data
    },
    setBlogs: (state, data) => {
      if (data.mes) Message.info(data.mes)
      state.blogs = data.data
    },
    setBlog: (state, title) => {
      state.blogs.forEach(blog => {
        if (blog.title === title) state.blog = blog
      })
      window.setTimeout(() => {
        state.blogs.map((blog, ind) => {
          if (state.blog.title === blog.title) {
            state.newBlog = state.blogs[ind + 1] ? state.blogs[ind + 1].title : ''
            state.oldBlog = state.blogs[ind - 1] ? state.blogs[ind - 1].title : ''
          }
        })
      }, 60)
    },
    setTagsBlogs: (state, data) => {
      state.tags = data.data.map(tag => ({value: tag.value, blogs: []}))
      window.setTimeout(() => {
        state.tags.map((tag, index) => {
          const key = tag.value
          state.blogs.map(blog => {
            blog.tags.map(tag => { if (tag === key) state.tags[index].blogs.push(blog) })
          })
        })
      }, 60)
    },
    setSortBlogsByDate: state => {
      let year = '', blogsDate = state.blogsSortByYear, len = blogsDate.length;
      state.blogs.map(blog => {
        if (year !== blog.createAt.split('-')[0]) {
          year = blog.createAt.split('-')[0]
          blogsDate.push({year, blogs: []});
          len = blogsDate.length;
          blogsDate[len - 1].blogs.push(blog);
        } else blogsDate[len - 1].blogs.push(blog);
      })
    },
    setSortBlogsByMonth: state => {
      let blogsM = state.blogsSortByMonth, len = '';
      state.blogsSortByYear.map((year, index) => {
        let month = '';
        blogsM.push({year: year.year, blogs: []})
        year.blogs.map(monthC => {
          if (month !== monthC.createAt.split('-')[1]) {
            month = monthC.createAt.split('-')[1]
            blogsM[index].blogs.push({month, blogs: []})
            len = blogsM[index].blogs.length;
            blogsM[index].blogs[len - 1].blogs.push(monthC)
          } else {
            blogsM[index].blogs[len - 1].blogs.push(monthC)
          }
        })
      })
    }
  },
  actions: {
    async getBlogs({commit}, data) {
      const res = await GetBlogs(data)
      return res.data
    },
    async getTags({commit}) {
      const res = await GetTags()
      return res.data
    },
    async getCompanion({commit}) {
      const res = await GetCompanion()
      return res.data
    },
    async getAboutUs({commit}) {
      const res = await GetAboutUs()
      return res.data
    },
    getTagsAndBlogs({commit, dispatch, state}, data) {
      Promise.all([dispatch('getBlogs'), dispatch('getTags')])
        .then(data => {
          commit('setBlogs', data[0])
          commit('setTagsBlogs', data[1])
          commit('setSortBlogsByDate')
          commit('setSortBlogsByMonth')
          if (state.currentTitle) commit('setBlog', state.currentTitle)
        })
    }
  },
  getters: {
    blogs: state => state.blogs,
    blog: state => state.blog,
    tags: state => state.tags,
    blogsY: state => state.blogsSortByYear,
    blogsM: state => state.blogsSortByMonth,
    newBlog: state => state.newBlog,
    oldBlog: state => state.oldBlog
  }
};
