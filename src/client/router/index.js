import Vue from 'vue';
import { LoadingBar } from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Tags from '@/views/tags/tags.vue';
import Tag from '@/views/tag/tag.vue';
import Contact from '@/views/contact/index.vue';
import About from '@/views/about/index.vue';
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
      meta: { title: 'AntPool - News' },
      component: News
    }, {
      path: '/tags',
      name: 'tags',
      meta: { title: 'AntPool - Tags' },
      component: Tags
    }, {
      path: '/partners',
      name: 'partners',
      meta: { title: 'AntPool - Partners' },
      component: Partners
    }, {
      path: '/contact',
      meta: { title: 'AntPool - Contact Us' },
      name: 'contact',
      component: Contact
    }, {
      path: '/about',
      meta: { title: 'AntPool - About Us' },
      name: 'about',
      component: About
    }, {
      path: '/tags/:tag',
      meta: { title: 'AntPool - Tag' },
      name: 'tag',
      component: Tag
    }, {
      path: '/events',
      meta: { title: 'AntPool - Events' },
      name: 'events',
      component: Events
    }, {
      path: '/event/:id',
      meta: { title: 'AntPool - Event' },
      name: 'event',
      component: Event
    }, {
      path: '/new/:id',
      meta: { title: 'AntPool - New' },
      name: 'new',
      component: New
    }, {
      path: '/:year',
      meta: { title: 'AntPool - Year' },
      name: 'year',
      component: Year
    }, {
      path: '/:year/:month',
      meta: { title: 'AntPool - Month' },
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
  LoadingBar.start();
  next();
  if (to.meta.title) Util.title(to.meta.title);
});

router.afterEach((to) => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
