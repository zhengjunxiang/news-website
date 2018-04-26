<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header"><em class="page-title-link" data-url="home">{{$t('content.tagsSort')}}</em></h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap" v-for="tag in tags" :key="tag.value">
      <div class="archive-year-wrap">
        <span class="archive-year"><i class="icon fa fa-tags"></i>{{tag.value}}</span>
      </div>
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary" v-for="(blog, ind) in tag.blogs.slice(0, 10)" :key="ind">
            <div class="article-summary-inner">
                <router-link :to="`/blog/${blog.title}`" class="thumbnail">
                  <span :style="`background-image:url(${blog.cover})`" class="thumbnail-image" v-if="blog.cover" />
                  <i class="fa fa-picture-o" aria-hidden="true" v-else />
                </router-link>
              <div class="article-meta">
                <div class="date">
                  <time :datetime="blog.createAt" itemprop="datePublished">{{setDate(blog.createAt)}}</time>
                  <span style="margin-left: 10px;">{{blog.author}}</span>
                </div>
              </div>
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/blog/${blog.title}`">{{blog.title}}</router-link>
              </h2>
              <div>
                <router-link class="article-tag-link" v-for="(tag, ind) in blog.tags" :to="`/tags/${tag}`" :key="ind">
                  {{tag}}
                </router-link>
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
  name: 'tags',
  computed: {
    ...mapGetters(['tags'])
  },
  methods: {
    setDate: date => date.split('T')[0]
  }
};
</script>
