<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header"><em class="page-title-link" data-url="home">{{$t('content.home')}}</em></h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary" v-for="(n, ind) in recentNews" :key="ind">
            <div class="article-summary-inner">
                <router-link :to="`/new/${n.title}`" class="thumbnail">
                  <img :src="n.cover" class="thumbnail-image" v-if="n.cover" />
                  <i class="fa fa-picture-o" aria-hidden="true" v-else />
                </router-link>
              <div class="article-meta">
                <div class="date">
                  <time :datetime="n.createAt" itemprop="datePublished">{{setDate(n.createAt)}}</time>
                  <span style="margin-left: 10px;">{{n.author}}</span>
                </div>
              </div>
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/new/${n.title}`">{{n.title}}</router-link>
              </h2>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters([ 'news', 'lan']),
    recentNews() {
        return this.news.slice(0,5)
    }
  },
  methods: {
    setDate: date => date ? date.split('T')[0] : ''
  }
};
</script>
