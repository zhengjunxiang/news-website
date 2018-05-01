import {
  UpdateEvents, GetEvents, AddEvents, DelEvents
} from '@/api/server.js';

export default {
  actions: {
    async updateEvents({commit}, data) {
      const res = await UpdateEvents(data)
      return res.data
    },
    async getEvents({commit}, data) {
      const res = await GetEvents(data)
      return res.data
    },
    async addEvents({commit}, data) {
      const res = await AddEvents(data)
      return res.data
    },
    async delEvents({commit}, data) {
      const res = await DelEvents(data)
      return res.data
    }
  }
};
