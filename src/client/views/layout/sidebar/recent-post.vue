<template>
  <div class="widget-wrap">
    <div class="widget-title">{{$t('siderBar.recent')}}</div>
    <div class="widget-inner">
      <ul class="recent-post">
        <li v-for="(ne, ind) in recentMews" :key="ind">
          <div class="item-thumbnail">
            <router-link :to="`/new/${ne.title}`" class="thumbnail">
              <span :style="`background-image:url(${ne.cover})`" class="thumbnail-image" v-if="ne.cover" />
              <i class="fa fa-picture-o" aria-hidden="true" v-else />
            </router-link>
          </div>
          <div class="item-inner">
            <p class="item-category">
              <router-link class="article-tag-link" v-for="(tag, ind) in ne.tags.slice(0, 2)" :to="`/tags/${tag}`" :key="ind">
                {{tag}}
              </router-link>
            </p>
            <p class="item-title">
              <router-link :to="`/new/${ne.title}`">{{ne.title}}</router-link>
            </p>
            <p class="item-date"><time :datetime="ne.createAt" itemprop="datePublished">{{setDate(ne.createAt)}}</time></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "widget",
  computed: {
    ...mapGetters(['news']),
    recentMews() {
        return this.news.slice(0,5)
    }
  },
  methods: {
    setDate: date => date.split('T')[0] || ''
  }
}
</script>
<style lang="less" scoped>
@import './recent-post.less';
</style>
