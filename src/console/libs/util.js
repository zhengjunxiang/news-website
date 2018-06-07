/* eslint-disable */
import moment from 'moment'
let util = {};
const pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]");
util.title = function(title) {
  if (title) window.document.title = title
};

util.inOf = function(arr, targetArr) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) res = false;
  });
  return res;
};

util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) return true;
  else return false;
};

util.showThisRoute = function(itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) return util.oneOf(currentAccess, itAccess);
  else return itAccess === currentAccess;
};

util.getRouterObjByName = function(routers, name) {
  if (!name || !routers || !routers.length) return null;
  // debugger;
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) return item;
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) return routerObj;
  }
  return null;
};

util.setCurrentPath = function(vm, name) {
  let title = '';
  let isOtherRouter = false;
  vm.$store.state.app.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = item.title;
        if (item.name === 'otherRouter') isOtherRouter = true;
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = child.title;
          if (item.name === 'otherRouter') isOtherRouter = true;
        }
      });
    }
  });
  let currentPathArr = [];
  if (name === 'home_index') {
    currentPathArr = [
      {
        title: util.getRouterObjByName(vm.$store.state.app.routers, 'home_index').title,
        path: '',
        name: 'home_index'
      }
    ];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
    currentPathArr = [
      {
        title: util.getRouterObjByName(vm.$store.state.app.routers, 'home_index').title,
        path: '/home',
        name: 'home_index'
      }, {
        title: title,
        path: '',
        name: name
      }
    ];
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      } else {
        let i = 0;
        let childArr = item.children;
        let len = childArr.length;
        while (i < len) {
          if (childArr[i].name === name) return true;
          i++;
        }
        return false;
      }
    })[0];
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [
        {
          title: '首页',
          path: '',
          name: 'home_index'
        }
      ];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home_index'
        }, {
          title: currentPathObj.title,
          path: '',
          name: name
        }
      ];
    } else {
      let childObj = currentPathObj.children.filter((child) => child.name === name)[0];
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home_index'
        }, {
          title: currentPathObj.title,
          path: '',
          name: currentPathObj.name
        }, {
          title: childObj.title,
          path: currentPathObj.path + '/' + childObj.path,
          name: name
        }
      ];
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);
  return currentPathArr;
};

util.openNewPage = function(vm, name, argu, query) {
  if (!vm.$store) return;
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagsList.filter((item) => {
      if (item.children) return name === item.children[0].name;
      else return name === item.name;
    });
    tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag;
      if (argu) tag.argu = argu;
      if (query) tag.query = query;
      vm.$store.commit('increateTag', tag);
    }
  }
  vm.$store.commit('setCurrentPageName', name);
};

util.mapScript = str => pattern.test(str)

util.fullscreenEvent = function(vm) {
  vm.$store.commit('initCachepage');
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist');
  // 全屏相关
};

util.fDate = (date, f) => {
  if (date) return moment(date).format(f || 'YYYY-MM-DD HH:mm:ss')
  else return moment().format(f || 'YYYY-MM-DD HH:mm:ss')
}

util.deepCopy = source => {
  if (!source || typeof source !== 'object') {
     throw new Error('error arguments', 'shallowClone');
   }
   var targetObj = source.constructor === Array ? [] : {};
   for (var keys in source) {
      if (source.hasOwnProperty(keys)) {
         if (source[keys] && typeof source[keys] === 'object') {
           targetObj[keys] = source[keys].constructor === Array ? [] : {};
           targetObj[keys] = util.deepCopy(source[keys]);
         } else {
           targetObj[keys] = source[keys];
         }
      }
   }
   return targetObj;
}

export default util;
