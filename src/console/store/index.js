import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import news from './modules/news';
import things from './modules/things';
import partners from './modules/partners';
import fileUpload from './modules/file-upload';
import about from './modules/about';
import events from './modules/events';
import posters from './modules/posters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { app, user, news, things, partners, fileUpload, about, events, posters }
});

export default store;
