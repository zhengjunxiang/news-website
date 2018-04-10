<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header">
      <em class="page-title-link" data-url="home">主页</em>
    </h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="archive-year-wrap">
        <a href="/archives/2018" class="archive-year"><i class="icon fa fa-calendar-o"></i>2018</a>
      </div>
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary" v-for="(blog, ind) in blogs">
            <div class="article-summary-inner">
              <a href="/2018/02/11/third/" class="thumbnail">
                <span :style="`background-image:url(${blog.cover})`" class="thumbnail-image"></span>
              </a>
              <div class="article-meta">
                <div class="date">
                  <time :datetime="blog.updateAt" itemprop="datePublished">{{setDate(blog.updateAt)}}</time>
                  <span style="margin-left: 10px;">{{blog.author}}</span>
                </div>
              </div>
              <h2 class="article-title" itemprop="name">
                <a href="/2018/02/11/third/">{{blog.title}}</a>
              </h2>
              <div>
                <a class="article-category-link" v-for="(tag, ind) in blog.tags" :href="`/tags/${tag}/`" v-if="ind < 3">
                  <Tag type="border" color="blue">{{tag}}</Tag>
                </a>
              </div>
              <p class="article-excerpt">
                {{blog.intro}}
              </p>
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
  data() {
    return {};
  },
  methods: {
    setDate(date) {
      return date.split('T')[0]
    }
  }
};
</script>
