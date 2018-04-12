import Vue from 'vue';
import router from './router/index';
import store from './store';
import App from './app.vue';
import Alert from '@/libs/components/alert/alert.js';

Vue.use(Alert)

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

export default vm;
