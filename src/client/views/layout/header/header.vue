<template>
  <div class="container header">
    <div class="container-inner">
      <div :class="{'header-inner': true, show: isShowNav}">
        <span class="main-nav-toggle" @click="toggleNav">
          <Icon type="navicon" />
        </span>
        <h1 class="logo-wrap">
          <a href="https://www.antpool.com/home.htm" target="_black" class="logo"></a>
        </h1>
        <ul class="main-nav">
          <li class="main-nav-list-item">
            <router-link :to="{ name: 'home'}">{{ $t("header.news") }}</router-link>
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
          <li class="main-nav-list-item">
            <router-link :to="{ name: 'contact'}">{{ $t("header.contact") }}</router-link>
          </li>
        </ul>
        <nav class="sub-nav">
          <Dropdown trigger="click" @on-click="toggleType" placement="bottom-start">
            <Button type="primary">{{type}}<Icon type="arrow-down-b" /></Button>
            <DropdownMenu slot="list">
              <DropdownItem name="news">{{$t("header.news")}}</DropdownItem>
              <DropdownItem name="events">{{$t("header.events")}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input v-model="select" icon="search" placeholder="Search..." @on-keyup="onSelect" />
        </nav>
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
      selectedType: 'news'
    }
  },
  computed: {
    ...mapGetters(['news', 'events']),
    selected() {
      const select = this.select.trim();
      if (this.selectedType === 'news') {
        return this.news.filter(n => {
          if (select) {
            return new RegExp(select, 'gi').test(n.title) ||
              new RegExp(select, 'gi').test(n.author) ||
              n.tags.some(it => {
                return new RegExp(select, 'gi').test(it)
              })
          }
          return false
        })
      } else if (this.selectedType === 'events') {
        return this.events.filter(ev => {
          if (select) {
            return new RegExp(select, 'gi').test(ev.title) ||
              new RegExp(select, 'gi').test(ev.author)
          }
          return false
        })
      }
    },
    type() {
      if (this.selectedType === 'news') return this.$t("header.news")
      else if (this.selectedType === 'events') return this.$t("header.events")
    }
  },
  methods: {
    toggleType(type) {
      this.selectedType = type
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
