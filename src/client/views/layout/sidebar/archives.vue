<template>
<div class="widget-wrap widget-list">
  <h3 class="widget-title">{{$t('siderBar.archive')}}</h3>
  <ul class="tag-list">
    <li class="tag-list-item" v-for="year in newsM" >
      <span v-for="month in year.news">
        <router-link class="tag-list-link" :to="`/${year.year}/${month.month}`">
          {{`${year.year}-${month.month}`}}
        </router-link>
        <span class="tag-list-count">{{month.news.length}}</span>
      </span>
    </li>
  </ul>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "archives",
  computed: {
    ...mapGetters(['newsM'])
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
