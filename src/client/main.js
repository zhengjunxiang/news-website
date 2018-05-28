import Vue from 'vue';
import router from './router/index';
import store from './store';
import {
  Button, Table, i18n, Select, Option, Input, Icon, Message, Spin, Dropdown, DropdownMenu,
  DropdownItem, BackTop, Page, Tag
} from 'iview';
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

Vue.component('Tag', Tag);
Vue.component('Page', Page);
Vue.component('BackTop', BackTop);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Spin', Spin);
Vue.component('Icon', Icon);
Vue.component('Input', Input);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.prototype.$Message = Message;

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
