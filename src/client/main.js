import Vue from 'vue';
import iView from 'iview';
import router from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

export default vm;
