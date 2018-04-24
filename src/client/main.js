import Vue from 'vue';
import router from './router/index';
import store from './store';
import App from './app.vue';
import Alert from '@/libs/components/alert/alert.js';
import PageNav from '@/libs/components/page-nav/pageNav.vue';

Vue.component('page-nav', PageNav)
Vue.use(Alert)

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

export default vm;
