import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: { title: 'Login - 登录' },
  component: () => import ('@/views/login.vue')
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: { title: '404-页面不存在' },
  component: () => import ('@/views/error-page/404.vue')
};

export const page403 = {
  path: '/403',
  meta: { title: '403-权限不足' },
  name: 'error-403',
  component: () => import ('@/views/error-page/403.vue')
};

export const page500 = {
  path: '/500',
  meta: { title: '500-服务端错误' },
  name: 'error-500',
  component: () => import ('@/views/error-page/500.vue')
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
      component: () => import ('@/views/home/home.vue')
    }, {
      path: 'ownspace',
      title: '个人中心',
      name: 'ownspace_index',
      component: () => import ('@/views/own-space/own-space.vue')
    },
    // { // 用于展示带参路由
    //   path: 'message',
    //   title: '消息中心',
    //   name: 'message_index',
    //   component: () => import ('@/views/message/message.vue')
    // }
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
        component: () => import ('@/views/access/access.vue')
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
        path: 'image-editor',
        icon: 'crop',
        name: 'image-editor',
        title: '图片预览编辑',
        component: () => import ('@/views/my-components/image-editor/image-editor.vue')
      }, {
        path: 'file-upload',
        icon: 'android-upload',
        name: 'file-upload',
        title: '图片上传',
        component: () => import ('@/views/my-components/file-upload/file-upload.vue')
      }
    ]
  }, {
    path: '/blog',
    icon: 'ios-book',
    name: 'blog',
    title: '博客',
    component: Main,
    children: [
      {
        path: 'publish',
        title: '博客发布',
        name: 'blog-publish',
        icon: 'compose',
        component: () => import ('@/views/blog/publish/blog-publish.vue')
      }, {
        path: 'list',
        title: '博客列表',
        name: 'blog-list',
        icon: 'ios-list',
        component: () => import ('@/views/blog/list/blogs-list.vue')
      }
    ]
  }, {
    path: '/companion',
    icon: 'person-stalker',
    name: 'companion',
    title: '合作伙伴',
    component: Main,
    children: [
      {
        path: 'companion-index',
        title: '合作伙伴',
        name: 'companion-index',
        component: () => import ('@/views/companion/companion.vue')
      }
    ]
  }, {
    path: '/about-us',
    icon: 'android-contacts',
    name: 'about-us',
    title: '关于我们',
    component: Main,
    children: [
      {
        path: 'index',
        title: '关于我们',
        name: 'about-us-index',
        component: () => import ('@/views/about-us/about-us.vue')
      }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter, otherRouter, ...appRouter,
  page500, page403, page404
];
