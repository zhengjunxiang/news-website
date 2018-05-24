import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';

const initRoute = {
  title: '首页',
  path: '',
  name: 'home_index'
}

export default {
  state: {
    isFullScreen: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: 'dark', // 主题
    themeColor: '',
    pageOpenedList: [initRoute],
    currentPageName: '',
    currentPath: [initRoute], // 面包屑数组
    menuList: [],
    routers: [ otherRouter, ...appRouter ],
    tagsList: [ ...otherRouter.children ]
  },
  mutations: {
    setTagsList(state, list) { state.tagsList.push(...list); },
    updateMenulist(state) {
      let accessCode = parseInt(Cookies.get('access'));
      let menuList = [];
      appRouter.forEach((item, index) => {
        if (item.access !== undefined) {
          if (Util.showThisRoute(item.access, accessCode)) {
            if (item.children.length === 1) {
              menuList.push(item);
            } else {
              let len = menuList.push(item);
              let childrenArr = [];
              childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                  if (child.access === accessCode) return child;
                } else {
                  return child;
                }
              });
              menuList[len - 1].children = childrenArr;
            }
          }
        } else {
          if (item.children.length === 1) {
            menuList.push(item);
          } else {
            let len = menuList.push(item);
            let childrenArr = [];
            childrenArr = item.children.filter(child => {
              if (child.access !== undefined) {
                if (Util.showThisRoute(child.access, accessCode)) return child;
              } else {
                return child;
              }
            });
            if (childrenArr === undefined || childrenArr.length === 0) {
              menuList.splice(len - 1, 1);
            } else {
              let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
              handledItem.children = childrenArr;
              menuList.splice(len - 1, 1, handledItem);
            }
          }
        }
      });
      state.menuList = menuList;
    },
    changeMenuTheme(state, theme) { state.menuTheme = theme; },
    changeMainTheme(state, mainTheme) { state.themeColor = mainTheme; },
    addOpenSubmenu(state, name) {
      let hasThisName = false;
      let isEmpty = false;
      if (name.length === 0) isEmpty = true;
      if (state.openedSubmenuArr.indexOf(name) > -1) hasThisName = true;
      if (!hasThisName && !isEmpty) state.openedSubmenuArr.push(name);
    },
    removeTag(state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) state.pageOpenedList.splice(index, 1);
      });
    },
    pageOpenedList(state, get) {
      let openedPage = state.pageOpenedList[get.index];
      if (get.argu) openedPage.argu = get.argu;
      if (get.query) openedPage.query = get.query;
      state.pageOpenedList.splice(get.index, 1, openedPage);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    clearAllTags(state) {
      state.pageOpenedList.splice(1);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    clearOtherTags(state, vm) {
      let currentName = vm.$route.name;
      let currentIndex = 0;
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) currentIndex = index;
      });
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1);
      } else {
        state.pageOpenedList.splice(currentIndex + 1);
        state.pageOpenedList.splice(1, currentIndex - 1);
      }
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    setOpenedList(state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
    },
    setCurrentPath(state, pathArr) { state.currentPath = pathArr },
    setCurrentPageName(state, name) { state.currentPageName = name; },
    clearOpenedSubmenu(state) { state.openedSubmenuArr.length = 0; },
    increateTag(state, tagObj) {
      state.pageOpenedList.push(tagObj);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    }
  }
};
