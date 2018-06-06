import { UpdateContact, GetContact, DelContact } from '@/api/server.js';
import { Notice } from 'iview';

export default {
  state: {
    contact: []
  },
  mutations: {
    setContact(state, data) { state.contact = data }
  },
  actions: {
    async getContact({commit, dispatch}, data) {
      Notice.destroy()
      const res = await GetContact(data)
      if (res.data.data) {
        commit('setContact', res.data.data)
        res.data.data.map(con => {
          if (con.isWatch === false) {
            Notice.info({
              title: `未读留言: ${con.name}`,
              desc: con.message,
              duration: 0,
              onClose() { dispatch('updateContact', {id: con._id, type: 'watch'}) }
            });
          }
        })
      }
      return res.data
    },
    async updateContact({commit}, data) {
      const res = await UpdateContact(data)
      return res.data
    },
    async delContact({commit}, data) {
      const res = await DelContact(data)
      return res.data
    }
  },
  getters: {
    contact: state => state.contact
  }
};
