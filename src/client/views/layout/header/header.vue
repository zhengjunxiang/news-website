<template>
<div id="header" class="header">
  <div class="header-outer">
    <div class="container">
      <div class="container-inner">
        <div class="header-title">
          <h1 class="logo-wrap">
            <a href="https://www.antpool.com/home.htm" target="_black" class="logo"></a>
          </h1>
          <h2 class="subtitle-wrap">
            <p class="subtitle">欢迎来到蚂蚁矿池博客</p>
          </h2>
        </div>
        <div :class="{'header-inner': true, show: isShowNav}">
          <a class="main-nav-toggle nav-icon fa fa-bars" @click="toggleNav" />
          <ul class="main-nav">
            <li class="main-nav-list-item">
              <router-link to="/">首页</router-link>
            </li>
            <li class="main-nav-list-item">
              <router-link to="/tags">标签归类</router-link>
            </li>
            <li class="main-nav-list-item">
              <router-link :to="{ name: 'companion'}">合作伙伴</router-link>
            </li>
            <li class="main-nav-list-item">
              <router-link :to="{ name: 'about'}">关于</router-link>
            </li>
          </ul>
          <nav class="sub-nav">
            <div class="search-form-wrap">
              <i class="fa fa-search"></i>
              <input type="text" v-model="select" class="search-form-input" placeholder="Search..." @keyup="onSelect" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "antheader",
  data() {
    return {
      isShowNav: false,
      select: ''
    }
  },
  computed: {
    ...mapGetters(['blogs']),
    selected() {
      return this.blogs.filter(blog => {
        if (this.select) return new RegExp(this.select, 'gi').test(blog.title) || new RegExp(this.select, 'gi').test(blog.author)
        return false
      })
    }
  },
  methods: {
    toggleNav() {
      this.isShowNav = !this.isShowNav
    },
    onSelect() {
      this.$emit('getEelected', this.selected)
    },
    onResetSelect() {
      this.select = ''
    }
  }
}
</script>
<style lang="less" scoped>
@import './header.less';
</style>
