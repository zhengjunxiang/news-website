<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header"><em class="page-title-link" data-url="home">{{$t('content.news')}}</em></h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap" v-for="year in newsY" :key="year.year">
      <div class="archive-year-wrap">
        <router-link :to="`/${year.year}`">
          <span class="archive-year"><i class="icon fa fa-calendar-o"></i>{{year.year}}</span>
        </router-link>
      </div>
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary" v-for="(ne, ind) in year.news.slice(0, 10)" :key="ind">
            <div class="article-summary-inner">
                <router-link :to="`/new/${ne.title}`" class="thumbnail">
                  <img :src="ne.cover" class="thumbnail-image" v-if="ne.cover" />
                  <i class="fa fa-picture-o" aria-hidden="true" v-else />
                </router-link>
              <div class="article-meta">
                <div class="date">
                  <time :datetime="ne.createAt" itemprop="datePublished">{{setDate(ne.createAt)}}</time>
                  <span style="margin-left: 10px;">{{ne.author}}</span>
                </div>
              </div>
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/new/${ne.title}`">{{ne.title}}</router-link>
              </h2>
              <div>
                <router-link class="article-tag-link" v-for="(tag, ind) in ne.tags" :to="`/tags/${tag}`" :key="ind">
                  {{tag}}
                </router-link>
              </div>
              <p class="article-excerpt">{{ne.intro}}</p>
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
  name: 'news',
  computed: {
    ...mapGetters([ 'newsY', 'lan'])
  },
  methods: {
    setDate: date => date ? date.split('T')[0] : ''
  }
};
</script>
