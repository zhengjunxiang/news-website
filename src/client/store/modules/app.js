import {
  GetBlogs, GetTags
} from '@/api/server.js';
import { Message } from 'iview';

export default {
  state: {
    blogs: [],
    blog: {},
    newBlog: '',
    oldBlog: '',
    tags: [],
    blogsSortByYear: [],
    blogsSortByMonth: []
  },
  mutations: {
    setBlogs: (state, data) => {
      if (data.mes) Message.info(data.mes)
      if (data.data.length === 1) {
        if (state.blogs.length === 0) state.blogs = data.data
        state.blog = data.data[0];
        setTimeout(() => {
          state.blogs.map((blog, ind) => {
            if (state.blog.title === blog.title) {
              state.newBlog = state.blogs[ind + 1] ? state.blogs[ind + 1].title : ''
              state.oldBlog = state.blogs[ind - 1] ? state.blogs[ind - 1].title : ''
            }
          })
        }, 60)
      } else state.blogs = data.data
    },
    setTags: (state, data) => {
      state.tags = data.data.map(tag => ({value: tag.value, blogs: []}))
    },
    setTagsBlogs: state => {
      state.tags.map((tag, index) => {
        const key = tag.value
        state.blogs.map(blog => {
          blog.tags.map(tag => { if (tag === key) state.tags[index].blogs.push(blog) })
        })
      })
    },
    setSortBlogsByDate: state => {
      let year = '', blogs = state.blogs, blogsDate = state.blogsSortByYear, len = blogsDate.length;
      blogs.map(blog => {
        if (year !== blog.createAt.split('-')[0]) {
          year = blog.createAt.split('-')[0]
          blogsDate.push({year, blogs: []});
          len = blogsDate.length;
          blogsDate[len - 1].blogs.push(blog);
        } else blogsDate[len - 1].blogs.push(blog);
      })
    },
    setSortBlogsByMonth: state => {
      let blogsD = state.blogsSortByYear, blogsM = state.blogsSortByMonth, len = '';
      blogsD.map((year, index) => {
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
      if (data) commit('setBlogs', res.data)
      return res.data
    },
    async getTags({commit}) {
      const res = await GetTags()
      return res.data
    },
    getTagsAndBlogs({commit, dispatch, state}, data) {
      Promise.all([dispatch('getBlogs'), dispatch('getTags')])
        .then(data => {
          commit('setBlogs', data[0])
          commit('setTags', data[1])
          commit('setTagsBlogs')
          commit('setSortBlogsByDate')
          commit('setSortBlogsByMonth')
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
