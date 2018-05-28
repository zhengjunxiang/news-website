<template>
<div :class="{sidebar: true, show: showSb}">
  <a class="sidebar-toggle" title="Expand Sidebar" @click="toggleSidebar">
    <Icon :type="!showSb ? 'chevron-left' : 'chevron-right'" />
  </a>
  <div class="sidebar-inner">
    <div class="widgets-container">
      <RecentPost />
      <Archives />
      <Tags />
    </div>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import RecentPost from './recent-post.vue'
import Tags from './tags.vue'
import Archives from './archives.vue'
export default {
  name: "sidebar",
  components: { RecentPost, Tags, Archives },
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
</style>
