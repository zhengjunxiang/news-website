<style lang="less">
</style>
<template>
<div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="poster-box" v-if="lists.cover">
        <a :href="lists.link" v-if="lists.link" target="_blank"><img :src="lists.cover" alt="" /></a>
        <img :src="lists.cover" alt="" v-else />
      </div>
    </section>
  </div>
  <div class="main-body-header">
    <h2 class="header"><Icon type="ios-pricetag"></Icon> {{$route.params.tag}}</h2>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <article class="article article-summary" v-for="(ne, ind) in curNews" :key="ind">
        <router-link :to="`/new/${ne._id}`" class="thumbnail" v-if="ne.cover">
          <img :src="ne.cover" class="thumbnail-image" />
        </router-link>
        <div :class="['article-tro', !ne.cover ? 'no-cover' : '']">
          <h2 class="article-title" itemprop="name">
            <router-link :to="`/new/${ne._id}`">{{ne.title}}</router-link>
          </h2>
          <div class="article-meta">
            <time :datetime="ne.createAt" itemprop="datePublished">{{$U.fDate(ne.createAt)}}</time>
            <span>{{ne.author}}</span>
            <div class="tags-box">
              <router-link class="article-tag-link" v-for="(tag, ind) in ne.tags" :to="`/tags/${tag}`" :key="ind">
                {{tag}}
              </router-link>
            </div>
          </div>
          <p class="article-excerpt">{{ne.intro}}</p>
        </div>
      </article>
    </section>
    <Page size="small" :total="news.length" show-total @on-change="handlePage" :page-size="pageSize" />
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'tags',
  data() {
    return { pageSize: 10, curP: 1 }
  },
  computed: {
    ...mapGetters(['tags', 'posters']),
    news() {
      const tag = this.tags.filter(tag => tag.value === this.$route.params.tag);
      return tag[0] ? [...tag[0].news] : [];
    },
    curNews() {
      return this.news.slice((this.curP-1)*this.pageSize, this.curP*this.pageSize)
    },
    lists() {
      return this.posters.filter(p => p.type === 'lists')[0] || {}
    }
  },
  methods: {
    handlePage(page) {
      this.curP = page
    }
  }
};
</script>
