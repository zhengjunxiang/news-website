<template>
  <div class="widget-wrap">
    <div class="widget-title">{{$t('siderBar.recent')}}</div>
    <div class="widget-inner">
      <ul class="recent-post">
        <li v-for="(ne, ind) in recentMews" :key="ind" :class="[ne.cover ? '' : 'no-cover']">
          <div class="item-thumbnail" v-if="ne.cover">
            <router-link :to="`/new/${ne.title}`" class="thumbnail">
              <img :src="ne.cover" class="thumbnail-image" />
            </router-link>
          </div>
          <div class="item-inner">
            <p class="item-category" v-if="ne.tags">
              <router-link class="article-tag-link" v-for="(tag, ind) in ne.tags.slice(0, 2)" :to="`/tags/${tag}`" :key="ind">
                {{tag}}
              </router-link>
            </p>
            <p class="item-title">
              <router-link :to="`/new/${ne.title}`">{{ne.title}}</router-link>
            </p>
            <p class="item-date"><time :datetime="ne.updateAt" itemprop="datePublished">{{$U.fDate(ne.updateAt)}}</time></p>
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
    ...mapGetters(['news', 'events']),
    recentMews() {
      return this.news.slice(0,5).concat(this.events.slice(0,5)).sort((pre, old) => old.updateAt - pre.updateAt).slice(0,5)
    }
  }
}
</script>
<style lang="less" scoped>
@import './recent-post.less';
</style>
