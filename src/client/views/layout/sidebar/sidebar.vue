<template>
<div :class="{sidebar: true, show: showSb}">
  <a class="sidebar-toggle" title="Expand Sidebar" @click="toggleSidebar">
    <Icon :type="!showSb ? 'chevron-left' : 'chevron-right'" />
  </a>
  <div class="sidebar-inner">
    <div class="widgets-container">
      <RecentPost />
      <div class="poster-box" v-if="posterTop.cover">
        <a :href="posterTop.link" v-if="posterTop.link" target="_blank"><img :src="posterTop.cover" alt="" /></a>
        <img :src="posterTop.cover" alt="" v-else />
      </div>
      <div class="poster-box" v-if="posterBottom.cover">
        <a :href="posterBottom.link" v-if="posterBottom.link" target="_blank"><img :src="posterBottom.cover" alt="" /></a>
        <img :src="posterBottom.cover" alt="" v-else />
      </div>
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
    ...mapGetters(['tags', 'posters']),
    posterTop() {
      return this.posters.filter(p => p.type === 'side-bar')[0] || {}
    },
    posterBottom() {
      return this.posters.filter(p => p.type === 'side-bar-b')[0] || {}
    }
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
