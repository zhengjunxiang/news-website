<style lang="less">
@import "./home.less";
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header"><em class="page-title-link" data-url="home">主页</em></h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="archive-year-wrap">
        <a href="" class="archive-year"><i class="icon fa fa-calendar-o"></i>2018</a>
      </div>
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary" v-for="(blog, ind) in blogs">
            <div class="article-summary-inner">
                <router-link :to="`/blog/${blog.title}`" class="thumbnail">
                  <span :style="`background-image:url(${blog.cover})`" class="thumbnail-image"></span>
                </router-link>
              <div class="article-meta">
                <div class="date">
                  <time :datetime="blog.updateAt" itemprop="datePublished">{{setDate(blog.updateAt)}}</time>
                  <span style="margin-left: 10px;">{{blog.author}}</span>
                </div>
              </div>
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/blog/${blog.title}`">{{blog.title}}</router-link>
              </h2>
              <div>
                <a class="article-tag-link" v-for="(tag, ind) in blog.tags" :href="`/tags/${tag}/`" v-if="ind < 3">
                  {{tag}}
                </a>
              </div>
              <p class="article-excerpt">{{blog.intro}}</p>
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
    ...mapGetters(['blogs'])
  },
  methods: {
    setDate: date => date.split('T')[0]
  }
};
</script>
