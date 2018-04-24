import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import blogs from './modules/blogs';
import things from './modules/things';
import companion from './modules/companion';
import fileUpload from './modules/file-upload';
import aboutUs from './modules/about-us';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { app, user, blogs, things, companion, fileUpload, aboutUs }
});

export default store;
