<template>
<div id="blog">
  <div class="main-body-header">
    <h3 class="header">
      <span v-for="(tag, ind) in blog.tags" class="tags-list">{{tag}}</span>
    </h3>
  </div>
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="blogPost">
      <div class="article-inner">
        <header class="article-header">
          <h2 class="article-title" itemprop="name">
            {{blog.title}}
          </h2>
        </header>
        <div class="article-meta">
          <div class="article-date">
            <span>
              <i class="fa fa-plus" aria-hidden="true" />
              <time :datetime="blog.createAt" itemprop="datePublished">{{setDate(blog.createAt)}}</time>
            </span>
            <span v-if="setDate(blog.createAt) !== setDate(blog.updateAt)">
              <i class="fa fa-pencil" aria-hidden="true" />
              <time :datetime="blog.updateAt" itemprop="datePublished">{{setDate(blog.updateAt)}}</time>
            </span>
          </div>
          <div class="article-author"><i class="fa fa-user" aria-hidden="true"></i>{{blog.author}}</div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="blog.content" />
        <footer class="article-footer">
          <div class="article-share-link" @click="handleClickShare">
            <i class="fa fa-share"></i>Share
          </div>
          <div :class="['social-share', {show}]" data-mode="prepend" data-sites="wechat,qq,weibo,twitter,facebook,google" />
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
    return { show: false }
  },
  computed: {
    ...mapGetters(['blog'])
  },
  mounted() {
    const title = this.$route.params.title;
    if (title) {
      this.$store.commit('setCurrentTitle', title)
      window.socialShare('.social-share')
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.title) {
        this.$store.commit('setBlog', to.params.title)
        window.socialShare('.social-share')
      }
    }
  },
  methods: {
    setDate: date => date ? date.split('T')[0] : '',
    handleClickShare() {
      this.show = !this.show;
    }
  }
}
</script>
<style lang="less">
@import '../../styles/prism.css';
</style>
