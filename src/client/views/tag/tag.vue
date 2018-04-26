<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header"><em class="page-title-link" data-url="home">{{$t('content.tagsSort')}}</em></h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="archive-year-wrap">
        <span class="archive-year"><i class="icon fa fa-tags"></i>{{$route.params.tag}}</span>
      </div>
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary" v-for="(blog, ind) in curBlogs" :key="ind">
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
  <page-nav :datas="blogs" :size="pageSize" @on-change="onClickPage" />
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
    ...mapGetters(['tags']),
    blogs() {
      const tag = this.tags.filter(tag => tag.value === this.$route.params.tag);
      return tag[0] ? [...tag[0].blogs] : [];
    },
    curBlogs() {
      return this.blogs.slice((this.curP-1)*this.pageSize, this.curP*this.pageSize)
    }
  },
  methods: {
    setDate: date => date.split('T')[0],
    onClickPage(page) { this.curP = page }
  }
};
</script>
