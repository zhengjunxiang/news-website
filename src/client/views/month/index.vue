<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h2 class="header">
      <i class="icon fa fa-calendar-o"></i> <em class="page-title-link" data-url="home">{{$t('content.archive')}}</em>: {{$route.params.month}}/{{$route.params.year}}
    </h2>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <article class="article article-summary" v-for="(ne, ind) in curNews" :key="ind">
        <router-link :to="`/new/${ne.title}`" class="thumbnail">
          <img :src="ne.cover" class="thumbnail-image" v-if="ne.cover" />
          <Icon type="image" v-else></Icon>
        </router-link>
        <div class="article-tro">
          <h2 class="article-title" itemprop="name">
            <router-link :to="`/new/${ne.title}`">{{ne.title}}</router-link>
          </h2>
          <div class="article-meta">
            <div class="date">
              <time :datetime="ne.createAt" itemprop="datePublished">{{$U.fDate(ne.createAt)}}</time>
              <span>{{ne.author}}</span>
              <div class="tags-box">
                <router-link class="article-tag-link" v-for="(tag, ind) in ne.tags" :to="`/tags/${tag}`" :key="ind">
                  {{tag}}
                </router-link>
              </div>
            </div>
          </div>
          <p class="article-excerpt">{{ne.intro}}</p>
        </div>
      </article>
    </section>
  </div>
  <page-nav :datas="news" :size="pageSize" @on-change="onClickPage" />
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'month',
  data() {
    return {
      pageSize: 10,
      curP: 1
    }
  },
  computed: {
    ...mapGetters(['newsM']),
    news() {
      const y = this.newsM.filter(y => y.year === this.$route.params.year);
      let m = [];
      if (y[0]) m = y[0].news.filter(m => m.month === this.$route.params.month);
      return m[0] ? [...m[0].news] : [];
    },
    curNews() {
      return this.news.slice((this.curP-1)*this.pageSize, this.curP*this.pageSize)
    }
  },
  methods: {
    onClickPage(page) {
      this.curP = page
    }
  }
};
</script>
