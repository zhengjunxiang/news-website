import Vue from 'vue';
import router from './router/index';
import store from './store';
import { Row, Col, Dropdown, Button, Icon, Message, Spin, BackTop, DropdownMenu, Input,
  DropdownItem, Page, Tag, Avatar, i18n } from 'iview'
import App from './app.vue';
import VueStar from '@/libs/components/star/index.js'
import langage from '@/langs/langage'
import VueI18n from 'vue-i18n'
import util from '@/libs/util.js'
import en from 'iview/dist/locale/en-US';
import zh from 'iview/dist/locale/zh-CN';
import 'iview/dist/styles/iview.css';
import '@/libs/components/share/css/share.less';
import '@/libs/components/share/js/qrcode.js';
import '@/libs/components/share/js/social-share.js';

Vue.config.productionTip = false

Vue.component('VueStar', VueStar)
Vue.prototype.$U = util

Vue.component('Avatar', Avatar)
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('BackTop', BackTop)
Vue.component('Row', Row)
Vue.component('Tag', Tag)
Vue.component('Col', Col)
Vue.prototype.$Message = Message
Vue.component('Spin', Spin)
Vue.component('Dropdown', Dropdown)
Vue.component('Icon', Icon)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Page', Page)

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

i18n((key, value) => I18n.t(key, value))

const vm = new Vue({
  el: '#app',
  router,
  store,
  i18n: I18n,
  render: h => h(App)
});

export default vm;
