<template>
<div id="blog">
  <div class="main-body-header">
    <h1 class="header">
      <a v-for="(tag, ind) in blog.tags" :href="`/tags/${tag}/`" style="margin-right: 5px;">
        {{tag}}
      </a>
    </h1>
  </div>
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="blogPost">
      <div class="article-inner">
        <header class="article-header">
          <h1 class="article-title" itemprop="name">
            {{blog.title}}
          </h1>
        </header>
        <div class="article-meta">
          <div class="article-date">
            <time :datetime="blog.updateAt" itemprop="datePublished">{{setDate(blog.updateAt)}}</time>
          </div>
          <div class="article-author">{{blog.author}}</div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="blog.content" />
        <footer class="article-footer">
          <div class="article-share-link" @click="handleClickShare">
            <i class="fa fa-share"></i>Share
          </div>
          <div :class="{}">
            <div :class="['social-share', {show}]" data-mode="prepend" data-sites="wechat,qq,weibo,twitter,facebook,google" />
          </div>
        </footer>
      </div>
    </article>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "blog",
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(['blog'])
  },
  activated() {
    const title = this.$route.params.title;
    if (title) this.$store.dispatch('getBlogs', {title})
    window.socialShare('.social-share')
  },
  methods: {
    setDate: date => {
      if (date) return date.split('T')[0]
      return ''
    },
    handleClickShare() {
      this.show = !this.show;
    }
  }
}
</script>
<style lang="less">
@import './index.less';
</style>
