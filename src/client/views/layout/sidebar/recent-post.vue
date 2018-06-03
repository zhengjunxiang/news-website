<template>
  <div class="widget-wrap">
    <div class="widget-title">{{$t('siderBar.recent')}}</div>
    <div class="widget-inner">
      <ul class="recent-post">
        <li v-for="(re, ind) in recent" :key="ind" :class="[re.cover ? '' : 'no-cover']">
          <div v-if="re.tags">
            <div class="item-thumbnail" v-if="re.cover">
              <router-link :to="`/new/${re._id}`" class="thumbnail"><img :src="re.cover" class="thumbnail-image" /></router-link>
            </div>
            <div class="item-inner">
              <p class="item-category">
                <router-link class="article-tag-link" v-for="(tag, ind) in re.tags.slice(0, 2)" :to="`/tags/${tag}`" :key="ind">{{tag}}</router-link>
              </p>
              <p class="item-title"><router-link :to="`/new/${re._id}`">{{re.title}}</router-link></p>
              <p class="item-date"><time :datetime="re.updateAt" itemprop="datePublished">{{$U.fDate(re.updateAt)}}</time></p>
            </div>
          </div>
          <div v-else>
            <div class="item-thumbnail" v-if="re.cover">
              <router-link :to="`/event/${re._id}`" class="thumbnail"><img :src="re.cover" class="thumbnail-image" /></router-link>
            </div>
            <div class="item-inner">
              <p class="item-title"><router-link :to="`/event/${re._id}`">{{re.title}}</router-link></p>
              <p class="item-date"><time :datetime="re.updateAt" itemprop="datePublished">{{$U.fDate(re.updateAt)}}</time></p>
            </div>
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
    recent() {
      return this.news.slice(0,5).concat(this.events.slice(0,5)).sort((pre, old) => old.updateAt - pre.updateAt).slice(0,5)
    }
  }
}
</script>
<style lang="less" scoped>
@import './recent-post.less';
</style>
