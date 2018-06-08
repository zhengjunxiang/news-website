import Vue from 'vue';
import { Row, Col, Dropdown, Button, Icon, Message, Spin, BackTop, DropdownMenu, Input,
  DropdownItem, Table, Page, DatePicker, Tag, Breadcrumb, BreadcrumbItem, Tooltip, Option,
  Badge, Avatar, Card, FormItem, Select, Modal, MenuItem, Submenu, Notice, Form, Menu, Switch,
  InputNumber, Upload, ButtonGroup, Checkbox
} from 'iview'
import util from '@/libs/util.js';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import '@/styles/common.less';

Vue.prototype.$U = util

Vue.component('InputNumber', InputNumber)
Vue.component('Checkbox', Checkbox)
Vue.component('Upload', Upload)
Vue.component('ButtonGroup', ButtonGroup)
Vue.component('Menu', Menu)
Vue.component('Form', Form)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Tooltip', Tooltip)
Vue.component('Badge', Badge)
Vue.component('Card', Card)
Vue.component('Avatar', Avatar)
Vue.component('FormItem', FormItem)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Submenu', Submenu)
Vue.component('i-switch', Switch)
Vue.component('Modal', Modal)
Vue.component('MenuItem', MenuItem)
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('Table', Table)
Vue.component('BackTop', BackTop)
Vue.component('DatePicker', DatePicker)
Vue.component('Row', Row)
Vue.component('Tag', Tag)
Vue.component('Col', Col)
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
Vue.component('Spin', Spin)
Vue.component('Dropdown', Dropdown)
Vue.component('Icon', Icon)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Page', Page)

const vm = new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted() {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList');
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
  },
  created() {
    let tagsList = [];
    appRouter.map((item) => {
      if (item.children.length <= 1) tagsList.push(item.children[0])
      else tagsList.push(...item.children)
    });
    this.$store.commit('setTagsList', tagsList);
  }
});

export default vm;
