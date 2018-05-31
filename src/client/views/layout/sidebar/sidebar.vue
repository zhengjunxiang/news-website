<template>
<div :class="{sidebar: true, show: showSb}">
  <a class="sidebar-toggle" title="Expand Sidebar" @click="toggleSidebar">
    <Icon :type="!showSb ? 'chevron-left' : 'chevron-right'" />
  </a>
  <div class="sidebar-inner">
    <div class="widgets-container">
      <RecentPost />
      <div class="poster-box" v-for="(p, ind) in posters" :key="ind">
        <a :href="p.link" v-if="p.link"><img :src="p.cover" alt="" /></a>
        <img :src="p.cover" alt="" v-else />
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
    ...mapGetters(['tags'])
  },
  data: () => ({
    showSb: false,
    posters: []
  }),
  methods: {
    toggleSidebar() {
      this.showSb = !this.showSb
    }
  },
  async mounted() {
    const posters = await this.$store.dispatch('getPosters');
    this.posters = posters.data || []
  }
}
</script>
<style lang="less">
@import './sidebar.less';
</style>
