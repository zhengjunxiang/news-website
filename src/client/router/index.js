import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Home from '@/views/home/home.vue';
import Tags from '@/views/tags/tags.vue';
import Tag from '@/views/tag/tag.vue';
import About from '@/views/about/about.vue';
import Blog from '@/views/blog/index.vue';
import Month from '@/views/month/index.vue';
import Year from '@/views/year/index.vue';
import Partners from '@/views/partners/index.vue';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/tags',
      name: 'tags',
      component: Tags
    }, {
      path: '/partners',
      name: 'partners',
      component: Partners
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '/tags/:tag',
      name: 'tag',
      component: Tag
    }, {
      path: '/blog/:title',
      name: 'blog',
      component: Blog
    }, {
      path: '/:year/:month',
      name: 'month',
      component: Month
    }, {
      path: '/:year',
      name: 'year',
      component: Year
    }, {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  next();
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
});

export default router;
