<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header">
      <i class="icon fa fa-calendar-o"></i> <em class="page-title-link" data-url="home">{{$t('content.archive')}}</em>: {{$route.params.month}}/{{$route.params.year}}

    </h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
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
  name: 'month',
  data() {
    return {
      pageSize: 10,
      curP: 1
    }
  },
  computed: {
    ...mapGetters(['blogsM']),
    blogs() {
      const y = this.blogsM.filter(y => y.year === this.$route.params.year);
      let m = [];
      if (y[0]) m = y[0].blogs.filter(m => m.month === this.$route.params.month);
      return m[0] ? [...m[0].blogs] : [];
    },
    curBlogs() {
      return this.blogs.slice((this.curP-1)*this.pageSize, this.curP*this.pageSize)
    }
  },
  methods: {
    setDate: date => date.split('T')[0],
    onClickPage(page) {
      this.curP = page
    }
  }
};
</script>
