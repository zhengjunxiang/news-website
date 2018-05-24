import Vue from 'vue';
import router from './router/index';
import store from './store';
import App from './app.vue';
import Alert from '@/libs/components/alert/alert.js';
import PageNav from '@/libs/components/page-nav/pageNav.vue';
import VueStar from '@/libs/components/star/index.js'
import Span from '@/libs/components/span/span.vue'
import langage from '@/lang/langage'
import VueI18n from 'vue-i18n'
import util from '@/libs/util.js'

Vue.component('VueStar', VueStar)
Vue.component('page-nav', PageNav)
Vue.component('NewSpan', Span)
Vue.use(Alert)
Vue.prototype.$U = util

// 使用VueI18n
Vue.use(VueI18n)
Vue.locale = () => {}

// 实例化语言包
const i18n = new VueI18n({
  locale: util.checkLan(),
  messages: {
    EN: Object.assign(langage.EN),
    CN: Object.assign(langage.CN)
  }
})

const vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});

export default vm;
