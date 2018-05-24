<style lang="less">
@import "./main.less";
</style>
<template>
<div class="main" :class="{'main-hide-text': shrink}">
  <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
    <shrinkable-menu :shrink="shrink" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr" :menu-list="menuList">
      <div slot="top" class="logo-con">
        <img v-show="!shrink" src="../images/logo.png" key="max-logo" style="width: 100%;" />
        <img v-show="shrink" src="../images/logo-min.png" key="min-logo" />
      </div>
    </shrinkable-menu>
  </div>
  <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
    <div class="main-header">
      <div class="navicon-con">
        <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </Button>
      </div>
      <div class="header-middle-con">
        <div class="main-breadcrumb">
          <breadcrumb-nav :currentPath="currentPath" />
        </div>
      </div>
      <div class="header-avator-con">
        <full-screen v-model="isFullScreen" />
        <message-tip />
        <theme-switch />
        <div class="user-dropdown-menu-con">
          <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown transfer @on-click="handleClickUserDropdown">
              <a href="javascript:void(0)">
                <span class="main-user-name">{{ userName }}</span>
                <Icon type="arrow-down-b" />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="ownSpace">个人中心</DropdownItem>
                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar icon="person" :src="avatorPath" style="background: #619fe7;margin-left: 10px;" />
          </Row>
        </div>
      </div>
    </div>
    <div class="tags-con">
      <tags-page-opened :pageTagsList="pageTagsList" />
    </div>
  </div>
  <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
    <div class="single-page">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</div>
</template>
<script>
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import tagsPageOpened from './main-components/tags-page-opened.vue';
import breadcrumbNav from './main-components/breadcrumb-nav.vue';
import fullScreen from './main-components/fullscreen.vue';
import messageTip from './main-components/message-tip.vue';
import themeSwitch from './main-components/theme-switch/theme-switch.vue';
import { mapGetters } from 'vuex'
import util from '@/libs/util.js';

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    messageTip,
    themeSwitch
  },
  data() {
    return {
      shrink: false,
      userName: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    };
  },
  computed: {
    ...mapGetters([ 'userN' ]),
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    }
  },
  methods: {
    async init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit('updateMenulist');
      this.userName = this.userN;
      if (pathArr.length >= 2) this.$store.commit('addOpenSubmenu', pathArr[1].name);
      this.checkTag(this.$route.name);
      const res = await this.$store.dispatch('getUserOne', {name: this.userN});
      if (res.mes) this.$Message.success(res.mes)
      const unreadMes = res.data.messages.filter(m => !m.isReaded)
      this.$store.commit('setMesCount', unreadMes.length)
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    async handleClickUserDropdown(name) {
      if (name === 'ownSpace') {
        util.openNewPage(this, 'ownspace_index');
        this.$router.push({ name: 'ownspace_index' });
      } else if (name === 'loginout') {
        const res = await this.$store.dispatch('loginOut');
        if (res.mes) this.$Message.success(res.mes);
        this.$store.commit('logout');
        this.$store.commit('clearOpenedSubmenu');
        this.$router.push({ name: 'login' });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) return true;
      });
      if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
      }
    },
    beforePush() { return true }
  },
  watch: {
    '$route' (to) {
      this.$store.commit('setCurrentPageName', to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) this.$store.commit('addOpenSubmenu', pathArr[1].name);
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    }
  },
  mounted() { this.init() },
  created() { this.$store.commit('setOpenedList') }
};
</script>
