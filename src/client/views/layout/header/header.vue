<template>
<div id="header" class="header">
  <div class="header-outer">
    <div class="container">
      <div class="container-inner" style="position: relative">
        <div class="header-title">
          <h1 class="logo-wrap">
            <a href="https://www.antpool.com/home.htm" target="_black" class="logo"></a>
          </h1>
          <h2 class="subtitle-wrap">
            <p class="subtitle">{{ $t('header.tro') }}</p>
          </h2>
          <div :class="['change-lan-box', {show: isShowLan}]" @click="toggleLan">
            <span class="change-lan-btn">{{lan}}</span>
            <ul class="lan-box" @click="handleChangeLangage">
              <li class="lan-item bor-bottom" data-name="CN">中文</li>
              <li class="lan-item" data-name="EN">English</li>
            </ul>
          </div>
        </div>
        <div :class="{'header-inner': true, show: isShowNav}">
          <a class="main-nav-toggle nav-icon fa fa-bars" @click="toggleNav" />
          <ul class="main-nav">
            <li class="main-nav-list-item">
              <router-link to="/">{{ $t("header.home") }}</router-link>
            </li>
            <li class="main-nav-list-item">
              <router-link to="/news">{{ $t("header.news") }}</router-link>
            </li>
            <li class="main-nav-list-item">
              <router-link :to="{ name: 'events'}">{{ $t("header.events") }}</router-link>
            </li>
            <li class="main-nav-list-item">
              <router-link :to="{ name: 'partners'}">{{ $t("header.partners") }}</router-link>
            </li>
            <li class="main-nav-list-item">
              <router-link :to="{ name: 'about'}">{{ $t("header.about") }}</router-link>
            </li>
          </ul>
          <nav class="sub-nav">
            <div class="search-form-wrap">
              <select v-model="selectedType" class="search-select">
                <option value ="news">{{ $t("header.news") }}</option>
                <option value ="events">{{ $t("header.events") }}</option>
              </select>
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
      select: '',
      selectedType: 'news',
      langage: 'CN',
      isShowLan: false
    }
  },
  computed: {
    ...mapGetters(['news', 'lan', 'events']),
    selected() {
      if (this.selectedType === 'news') {
        return this.news.filter(n => {
          if (this.select) return new RegExp(this.select, 'gi').test(n.title) || new RegExp(this.select, 'gi').test(n.author)
          return false
        })
      } else if (this.selectedType === 'events') {
        return this.events.filter(ev => {
          if (this.select) return new RegExp(this.select, 'gi').test(ev.title) || new RegExp(this.select, 'gi').test(ev.author)
          return false
        })
      }
    }
  },
  methods: {
    toggleLan() {
      this.isShowLan = !this.isShowLan
    },
    handleChangeLangage(ev) {
      const target = ev.target;
      if (target.nodeName.toLowerCase() === 'li') {
        const lang = target.getAttribute('data-name') || 'CN';
        this.$i18n.locale = lang;
        this.$store.commit('setLan', lang)
        localStorage.setItem('language', lang)
        this.$store.commit('setNews')
        this.$store.commit('setTagsNews')
        this.$store.commit('setEvents')
        this.$store.commit('setSortNewsByDate')
        this.$store.commit('setSortNewsByMonth')
        this.$store.commit('setNewnav')
        if (/^\/new\//.test(this.$route.path)) this.$router.push({name: 'home'})
        else if (/^\/event\//.test(this.$route.path)) this.$router.push({name: 'events'})
      }
    },
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
