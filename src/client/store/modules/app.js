import {
  GetNews, GetTags, GetPartners, GetAbout, LikeNew, UnlikeNew, GetEvents
} from '@/api/server.js';
import vm from '@/main';
import util from '@/libs/util.js'

export default {
  state: {
    isLoading: true,
    allNews: [],
    news: [],
    ne: {},
    allEvents: [],
    events: [],
    event: {},
    newNew: {},
    oldNew: {},
    newEvent: {},
    oldEvent: {},
    tags: [],
    lan: util.checkLan(),
    currentNewTitle: '',
    newsSortByYear: [],
    newsSortByMonth: []
  },
  mutations: {
    setLoading(state, bool) { state.isLoading = bool },
    setLan(state, lan) { if (lan) state.lan = lan },
    setCurrentNewTitle: (state, title) => { if (title) state.currentNewTitle = title },
    setEvents: (state, data) => {
      if (data) {
        if (data.mes) vm.$Message.error(data.mes)
        state.allEvents = data.data
        state.events = data.data.filter(d => d.lan === state.lan)
      } else {
        state.events = state.allEvents.filter(d => d.lan === state.lan)
      }
    },
    setNews: (state, data) => {
      if (data) {
        if (data.mes) vm.$Message.error(data.mes)
        state.allNews = data.data;
        const newsLan = data.data.filter(d => d.lan === state.lan),
          newsFeature = newsLan.filter(d => d.feature),
          newsNoF = newsLan.filter(d => !d.feature);
        state.news = [...newsFeature, ...newsNoF]
      } else {
        const newsLan = state.allNews.filter(d => d.lan === state.lan),
          newsFeature = newsLan.filter(d => d.feature),
          newsNoF = newsLan.filter(d => !d.feature);
        state.news = [...newsFeature, ...newsNoF]
      }
    },
    setNewnav: (state, title) => {
      state.news.map((ne, ind) => {
        if (title === ne.title) {
          state.news[ind + 1] ? state.newNew = state.news[ind + 1] : state.newNew = {}
          state.news[ind - 1] ? state.oldNew = state.news[ind - 1] : state.oldNew = {}
        }
      })
    },
    setEventnav: (state, title) => {
      state.events.map((ne, ind) => {
        if (title === ne.title) {
          state.events[ind + 1] ? state.newEvent = state.events[ind + 1] : state.newEvent = {}
          state.events[ind - 1] ? state.oldEvent = state.events[ind - 1] : state.oldEvent = {}
        }
      })
    },
    setTagsNews: (state, data) => {
      if (data) {
        state.tags = data.data.map(tag => ({value: tag.value, news: []}))
        window.setTimeout(() => {
          state.tags.map((tag, index) => {
            const key = tag.value
            state.news.map(ne => {
              ne.tags.map(tag => { if (tag === key) state.tags[index].news.push(ne) })
            })
          })
        }, 60)
      } else {
        state.tags.map((tag, index) => {
          const key = tag.value;
          tag.news = [];
          state.news.map(ne => {
            ne.tags.map(tag => { if (tag === key) state.tags[index].news.push(ne) })
          })
        })
      }
    },
    setSortNewsByDate: state => {
      state.newsSortByYear = [];
      let year = '', newsDate = state.newsSortByYear, len = newsDate.length;
      state.news.map(ne => {
        if (year !== util.fDate(ne.createAt, 'YYYY')) {
          year = util.fDate(ne.createAt, 'YYYY')
          newsDate.push({year, news: []});
          len = newsDate.length;
          newsDate[len - 1].news.push(ne);
        } else newsDate[len - 1].news.push(ne);
      })
    },
    setSortNewsByMonth: state => {
      state.newsSortByMonth = []
      let newsM = state.newsSortByMonth, len = '';
      state.newsSortByYear.map((year, index) => {
        let month = '';
        newsM.push({year: year.year, news: []})
        year.news.map(monthC => {
          if (month !== util.fDate(monthC.createAt, 'MM')) {
            month = util.fDate(monthC.createAt, 'MM')
            newsM[index].news.push({month, news: []})
            len = newsM[index].news.length;
            newsM[index].news[len - 1].news.push(monthC)
          } else {
            newsM[index].news[len - 1].news.push(monthC)
          }
        })
      })
    }
  },
  actions: {
    async getEvents({commit}, data) {
      const res = await GetEvents(data);
      commit('setEvents', res.data)
    },
    async getEvent({commit, dispatch, state}, data) {
      const res = await GetEvents(data)
      state.event = res.data.data || {}
    },
    async getNews({commit}, data) {
      const res = await GetNews(data)
      return res.data
    },
    async getNew({commit, dispatch, state}, data) {
      const res = await GetNews(data)
      state.ne = res.data.data || {}
    },
    async getTags({commit}) {
      const res = await GetTags()
      return res.data
    },
    async getPartners({commit}) {
      const res = await GetPartners()
      return res.data
    },
    async getAbout({commit}) {
      const res = await GetAbout()
      return res.data
    },
    async likeNew({commit}, data) {
      const res = await LikeNew(data)
      return res.data
    },
    async unlikeNew({commit}, data) {
      const res = await UnlikeNew(data)
      return res.data
    },
    getTagsAndNews({commit, dispatch, state}, data) {
      Promise.all([dispatch('getNews'), dispatch('getTags')])
        .then(data => {
          commit('setNews', data[0])
          commit('setTagsNews', data[1])
          commit('setSortNewsByDate')
          commit('setSortNewsByMonth')
          if (state.currentNewTitle) commit('setNewnav', state.currentNewTitle)
        })
    }
  },
  getters: {
    news: state => state.news,
    ne: state => state.ne,
    tags: state => state.tags,
    newsY: state => state.newsSortByYear,
    newsM: state => state.newsSortByMonth,
    newNew: state => state.newNew,
    oldNew: state => state.oldNew,
    newEvent: state => state.newEvent,
    oldEvent: state => state.oldEvent,
    events: state => state.events,
    event: state => state.event,
    lan: state => state.lan,
    isLoading: state => state.isLoading
  }
};
