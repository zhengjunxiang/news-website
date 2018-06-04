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
  <div class="main-body-content" v-for="tag in tags" :key="tag.value" v-show="tag.news.length">
    <div class="main-body-header">
      <h2 class="header"><Icon type="ios-pricetag"></Icon> {{tag.value}}</h2>
    </div>
    <section class="archives-wrap">
      <article class="article article-summary" v-for="(ne, ind) in tag.news.slice(0, 5)" :key="ind">
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
      <p style="text-align: center;" v-if="tag.news.length > 5">
        <router-link style="font-size: 14px;" :to="`/tags/${tag.value}`">
          more...
        </router-link>
      </p>
    </section>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'tags',
  computed: {
    ...mapGetters(['tags', 'posters']),
    lists() {
      return this.posters.filter(p => p.type === 'lists')[0] || {}
    }
  }
};
</script>
