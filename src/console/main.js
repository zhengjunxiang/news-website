import Vue from 'vue';
import iview from 'iview'
import util from '@/libs/util.js';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.prototype.$U = util

Vue.use(iview)

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
