<template>
<div class="widget-wrap widget-list">
  <h3 class="widget-title">{{$t('siderBar.tags')}}</h3>
  <ul class="tag-list">
    <li class="tag-list-item" v-for="tag in tags" v-show="tag.news.length">
      <router-link :to="`/tags/${tag.value}`">{{tag.value}}</router-link>
      <span class="tag-list-count">{{tag.news.length}}</span>
    </li>
  </ul>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "tags",
  computed: {
    ...mapGetters(['tags'])
  }
}
</script>
<style lang="less" scoped>
.tag-list-item {
    padding: 10px 0;
    font-size: 15px;
    border-bottom: 1px solid #e4e4e4;
    a {
        color: #777;
        text-decoration: none;
    }
}
</style>
