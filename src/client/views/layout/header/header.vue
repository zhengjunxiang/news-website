<template>
<div id="header" class="header">
  <div class="header-outer">
    <div class="container">
      <div class="container-inner">
        <div class="header-title">
          <h1 class="logo-wrap">
            <a href="/" class="logo"></a>
          </h1>
          <h2 class="subtitle-wrap">
            <p class="subtitle">欢迎来到蚂蚁矿池博客</p>
          </h2>
        </div>
        <div :class="{'header-inner': true, show: isShowNav}">
          <a class="main-nav-toggle nav-icon fa fa-bars" @click="toggleNav" />
          <ul class="main-nav" :active-name="$route.name">
            <li class="main-nav-list-item" name="home">
              <router-link to="/">首页</router-link>
            </li>
            <li class="main-nav-list-item" name="tags-list">
              <router-link to="/tags-list" exact>标签归类</router-link>
            </li>
            <li class="main-nav-list-item" name="about">
              <router-link to="/about" exact>关于</router-link>
            </li>
          </ul>
          <nav class="sub-nav">
            <div class="search-form-wrap">
              <Icon type="search margin-right-10"></Icon>
              <input type="text" class="search-form-input" placeholder="Search..." />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "antheader",
  data: () => ({
    isShowNav: false
  }),
  methods: {
    toggleNav() {
      this.isShowNav = !this.isShowNav
    }
  }
}
</script>
<style lang="less" scoped>
@import './header.less';
</style>
