import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import posts from './modules/posts';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    posts
  }
});

export default store;
