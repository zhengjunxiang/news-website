import Main from '@/views/Main.vue';
import login from '@/views/login.vue'
import p404 from '@/views/error-page/404.vue'
import p403 from '@/views/error-page/403.vue'
import p500 from '@/views/error-page/500.vue'
import home from '@/views/home/home.vue'
import ownSpace from '@/views/own-space/own-space.vue'
import message from '@/views/message/message.vue'
import access from '@/views/access/access.vue'
import imagesEditor from '@/views/my-components/image-editor/image-editor.vue'
import fileUpload from '@/views/my-components/file-upload/file-upload.vue'
import newPublish from '@/views/news/publish/new-publish.vue'
import newsList from '@/views/news/list/news-list.vue'
import partners from '@/views/partners/partners.vue'
import about from '@/views/about/about.vue'
import eventPublish from '@/views/events/publish/index.vue'
import eventsList from '@/views/events/list/index.vue'
import posters from '@/views/posters/index.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: { title: 'Login - 登录' },
  component: login
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: { title: '404-页面不存在' },
  component: p404
};

export const page403 = {
  path: '/403',
  meta: { title: '403-权限不足' },
  name: 'error-403',
  component: p403
};

export const page500 = {
  path: '/500',
  meta: { title: '500-服务端错误' },
  name: 'error-500',
  component: p500
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: 'home',
      title: '首页',
      name: 'home_index',
      meta: { title: 'Home - 首页' },
      component: home
    }, {
      path: 'ownspace',
      title: '个人中心',
      meta: { title: 'Ownspace - 个人中心' },
      name: 'ownspace_index',
      component: ownSpace
    },
    { // 用于展示带参路由
      path: 'message',
      title: '消息中心',
      meta: { title: 'Message - 消息中心' },
      name: 'message_index',
      component: message
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/access',
    icon: 'key',
    name: 'access',
    title: '权限管理',
    component: Main,
    children: [
      {
        path: 'index',
        title: '权限管理',
        name: 'access-index',
        meta: { title: 'Access - 权限管理' },
        component: access
      }
    ]
  }, {
    path: '/component',
    icon: 'social-buffer',
    name: 'component',
    title: '资源管理',
    component: Main,
    children: [
      {
        path: 'file-upload',
        icon: 'android-upload',
        name: 'file-upload',
        meta: { title: 'Image-Upload - 图片上传' },
        title: '图片上传',
        component: fileUpload
      }, {
        path: 'image-editor',
        icon: 'crop',
        name: 'image-editor',
        title: '图片预览编辑',
        meta: { title: 'Image-Editor - 图片预览编辑' },
        component: imagesEditor
      }
    ]
  }, {
    path: '/news',
    icon: 'ios-book',
    name: 'news',
    title: '新闻',
    component: Main,
    children: [
      {
        path: 'publish',
        title: '新闻发布',
        name: 'new-publish',
        meta: { title: 'New-Publish - 新闻发布' },
        icon: 'compose',
        component: newPublish
      }, {
        path: 'list',
        title: '新闻列表',
        name: 'news-list',
        meta: { title: 'News-List - 新闻列表' },
        icon: 'ios-list',
        component: newsList
      }
    ]
  }, {
    path: '/events',
    icon: 'ios-paperplane',
    name: 'events',
    title: '活动',
    component: Main,
    children: [
      {
        path: 'publish',
        title: '活动发布',
        name: 'event-publish',
        meta: { title: 'Event-Publish - 活动发布' },
        icon: 'compose',
        component: eventPublish
      }, {
        path: 'list',
        title: '活动列表',
        name: 'events-list',
        meta: { title: 'Events-List - 活动列表' },
        icon: 'ios-list',
        component: eventsList
      }
    ]
  }, {
    path: '/partners',
    icon: 'person-stalker',
    name: 'partners',
    title: '合作伙伴',
    component: Main,
    children: [
      {
        path: 'partners-index',
        title: '合作伙伴',
        meta: { title: 'Partners - 合作伙伴' },
        name: 'partners-index',
        component: partners
      }
    ]
  },
  {
    path: '/posters',
    icon: 'android-add',
    name: 'posters',
    title: '添加广告',
    component: Main,
    children: [
      {
        path: 'posters-index',
        title: '添加广告',
        meta: { title: 'Posters - 添加广告' },
        name: 'posters-index',
        component: posters
      }
    ]
  },
  {
    path: '/about',
    icon: 'android-contacts',
    name: 'about',
    title: '关于我们',
    component: Main,
    children: [
      {
        path: 'index',
        title: '关于我们',
        meta: { title: 'About - 关于我们' },
        name: 'about-index',
        component: about
      }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter, otherRouter, ...appRouter,
  page500, page403, page404
];
