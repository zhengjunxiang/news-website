import Vue from 'vue';
import { Row, Col, Dropdown, Button, Icon, Message, Spin, DropdownMenu, Input, ButtonGroup,
  DropdownItem, Table, Page, Tag, FormItem, Form, Card, Notice, MenuItem, Submenu, InputNumber,
  Breadcrumb, BreadcrumbItem, Tooltip, Badge, Avatar, Modal, Checkbox, Menu, Upload, Select, Option
} from 'iview'
import util from '@/libs/util.js';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.component('InputNumber', InputNumber)
Vue.component('Option', Option)
Vue.component('ButtonGroup', ButtonGroup)
Vue.component('Select', Select)
Vue.component('Upload', Upload)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Submenu', Submenu)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Tooltip', Tooltip)
Vue.component('Badge', Badge)
Vue.component('Avatar', Avatar)
Vue.component('Checkbox', Checkbox)
Vue.component('Modal', Modal)
Vue.component('FormItem', FormItem)
Vue.component('Card', Card)
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('Form', Form)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('Table', Table)
Vue.component('Row', Row)
Vue.component('Tag', Tag)
Vue.component('Col', Col)
Vue.component('Message', Message)
Vue.component('Notice', Notice)
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
Vue.component('Spin', Spin)
Vue.component('Dropdown', Dropdown)
Vue.component('Icon', Icon)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Page', Page)
Vue.prototype.$U = util

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
