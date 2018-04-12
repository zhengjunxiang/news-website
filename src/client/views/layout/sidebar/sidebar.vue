<template>
<div :class="{sidebar: true, show: showSb}">
  <a class="sidebar-toggle" title="Expand Sidebar" @click="toggleSidebar"><i class="toggle icon"></i></a>
  <div class="widgets-container">
    <SidebarTop />
    <RecentPost />
    <Tags />
    <div class="widget-wrap">
      <h3 class="widget-title">标签云</h3>
      <div  class="widget tagcloud">
        <a v-for="(tag, ind) in tags" :href="`/tags/${tag.value}/`">
          {{tag.value}}
        </a>
      </div>
    </div>
    <div class="widget-wrap widget-list">
      <h3 class="widget-title">链接</h3>
      <div class="widget">
        <ul>
          <li>
            <a href="https://www.antpool.com">Antpool</a>
          </li>
          <li>
            <a href="https://www.bitmain.com">Bitmain</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import SidebarTop from './sidebar-top.vue'
import RecentPost from './recent-post.vue'
import Tags from './tags.vue'
export default {
  name: "sidebar",
  components: { SidebarTop, RecentPost, Tags },
  computed: {
    ...mapGetters(['tags'])
  },
  data: () => ({
    showSb: false
  }),
  methods: {
    toggleSidebar() {
      this.showSb = !this.showSb
    }
  }
}
</script>
<style lang="less">
@import './sidebar.less';
.widget-list ol li a:before,
.widget-list ul li a:before {
    color: #ccc;
    content: "\f0da";
    font-size: 12px;
    margin-right: 6px;
    font-family: FontAwesome;
    -webkit-transition: 0.2s ease;
    -moz-transition: 0.2s ease;
    -ms-transition: 0.2s ease;
    transition: 0.2s ease;
}
</style>
