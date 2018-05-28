import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Tags from '@/views/tags/tags.vue';
import Tag from '@/views/tag/tag.vue';
import About from '@/views/about/about.vue';
import New from '@/views/news/new.vue';
import News from '@/views/news/news.vue';
import Month from '@/views/month/index.vue';
import Year from '@/views/year/index.vue';
import Partners from '@/views/partners/index.vue';
import Events from '@/views/events/events.vue';
import Event from '@/views/events/event.vue';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: News
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
      path: '/events',
      name: 'events',
      component: Events
    }, {
      path: '/event/:title',
      name: 'event',
      component: Event
    }, {
      path: '/new/:title',
      name: 'new',
      component: New
    }, {
      path: '/:year',
      name: 'year',
      component: Year
    }, {
      path: '/:year/:month',
      name: 'month',
      component: Month
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
  window.scrollTo(0, 0);
});

export default router;
