import Vue from 'vue';
import router from './router/index';
import store from './store';
import iview from 'iview'
import App from './app.vue';
import VueStar from '@/libs/components/star/index.js'
import langage from '@/lang/langage'
import VueI18n from 'vue-i18n'
import util from '@/libs/util.js'
import en from 'iview/dist/locale/en-US';
import zh from 'iview/dist/locale/zh-CN';
import 'iview/dist/styles/iview.css';
import '@/libs/components/share/css/share.less';

Vue.config.productionTip = false

Vue.component('VueStar', VueStar)
Vue.prototype.$U = util

Vue.use(iview)
// 使用VueI18n
Vue.use(VueI18n)
Vue.locale = () => {}

// 实例化语言包
const I18n = new VueI18n({
  locale: util.checkLan(),
  messages: {
    en: Object.assign(langage.en, en),
    zh: Object.assign(langage.zh, zh)
  }
})

iview.i18n((key, value) => I18n.t(key, value))

const vm = new Vue({
  el: '#app',
  router,
  store,
  i18n: I18n,
  render: h => h(App)
});

export default vm;
