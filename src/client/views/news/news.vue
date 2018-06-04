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
      <div v-for="(ne, index) in curNews" :key="index">
        <article class="article-summary feature" v-if="ne.feature">
          <div v-if="ne.cover">
            <router-link :to="`/new/${ne._id}`" class="thumbnail">
              <img :src="ne.cover" class="thumbnail-image" />
              <div class="mark">
                <h2 class="article-title" itemprop="name">
                  <router-link :to="`/new/${ne._id}`">{{ne.title}}</router-link>
                </h2>
                <div class="article-meta">
                  <time :datetime="ne.updateAt" itemprop="datePublished">{{$U.fDate(ne.updateAt)}}</time>
                  <span>{{ne.author}}</span>
                  <div class="tags-box">
                    <router-link class="article-tag-link" v-for="(tag, ind) in ne.tags" :to="`/tags/${tag}`" :key="ind">
                      {{tag}}
                    </router-link>
                  </div>
                </div>
              </div>
            </router-link>
            <div :class="['article-tro', !ne.cover ? 'no-cover' : '']">
              <p class="article-excerpt">{{ne.intro}}</p>
            </div>
          </div>
          <div v-else>
            <div :class="['article-tro', !ne.cover ? 'no-cover' : '']">
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/new/${ne._id}`">{{ne.title}}</router-link>
              </h2>
              <div class="article-meta">
                <time :datetime="ne.updateAt" itemprop="datePublished">{{$U.fDate(ne.updateAt)}}</time>
                <span>{{ne.author}}</span>
                <div class="tags-box">
                  <router-link class="article-tag-link" v-for="(tag, ind) in ne.tags" :to="`/tags/${tag}`" :key="ind">
                    {{tag}}
                  </router-link>
                </div>
              </div>
              <p class="article-excerpt">{{ne.intro}}</p>
            </div>
          </div>
        </article>
        <article class="article-summary" v-else>
          <router-link :to="`/new/${ne._id}`" class="thumbnail" v-if="ne.cover">
            <img :src="ne.cover" class="thumbnail-image" />
          </router-link>
          <div :class="['article-tro', !ne.cover ? 'no-cover' : '']">
            <h2 class="article-title" itemprop="name">
              <router-link :to="`/new/${ne._id}`">{{ne.title}}</router-link>
            </h2>
            <div class="article-meta">
              <time :datetime="ne.updateAt" itemprop="datePublished">{{$U.fDate(ne.updateAt)}}</time>
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
      </div>
    </section>
    <Page size="small" :total="news.length" show-total @on-change="handlePage" :page-size="pageSize" />
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'news',
  data() {
    return { pageSize: 10, curP: 1 }
  },
  computed: {
    ...mapGetters([ 'news', 'posters']),
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
