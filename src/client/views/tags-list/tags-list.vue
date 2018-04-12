<style lang="less">
@import "./tags-list.less";
@import "../../styles/common.less";
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header">
      <em class="page-title-link" data-url="tags-list">标签归类</em>
    </h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="archive-year-wrap">
        <a href="/archives/2018" class="archive-year"><i class="icon fa fa-calendar-o"></i>2018</a>
      </div>
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary">
            <div class="article-summary-inner">
              <a href="/2018/02/11/third/" class="thumbnail">
                <span style="background-image:url(/css/images/us.jpeg)" alt="第三篇博客" class="thumbnail-image"></span>
              </a>
              <div class="article-meta">
                <div class="category">
                  <a class="article-tag-link" href="/categories/后台/">后台</a><i class="icon fa fa-angle-right"></i><a class="article-tag-link" href="/categories/后台/部署/">部署</a>
                </div>
                <div class="date"><time datetime="2018-02-11T09:04:27.000Z" itemprop="datePublished">2018-02-11</time></div>
              </div>
              <h1 class="article-title" itemprop="name">
                <a href="/2018/02/11/third/">第三篇博客</a>
              </h1>
              <p class="article-excerpt">
                Welcome to Hexo! This is your very first post. Check documentation for more info. If you get any problems when using Hexo, you can find the answer in troubleshooting or you can ask me on GitHub.
              </p>
            </div>
          </article>
          <article class="article article-summary">
            <div class="article-summary-inner">
              <a href="/2018/02/10/second/" class="thumbnail">
              <span style="background-image:url(/css/images/us.jpeg)" alt="第二篇博客" class="thumbnail-image"></span>
              </a>
              <div class="article-meta">
                <div class="category">
                  <a class="article-tag-link" href="/categories/前端/">前端</a>
                </div>
                <div class="date"><time datetime="2018-02-10T09:04:27.000Z" itemprop="datePublished">2018-02-10</time></div>
              </div>
              <h1 class="article-title" itemprop="name">
                <a href="/2018/02/10/second/">第二篇博客</a>
              </h1>
              <p class="article-excerpt">
                Welcome to Hexo! This is your very first post. Check documentation for more info. If you get any problems when using Hexo, you can find the answer in troubleshooting or you can ask me on GitHub.
              </p>
            </div>
          </article>
        </div>
        <div class="article-row">
          <article class="article article-summary">
            <div class="article-summary-inner">
              <a href="/2018/02/05/first/" class="thumbnail">
              <span style="background-image:url(/css/images/us.jpeg)" alt="第一篇博客" class="thumbnail-image"></span>
              </a>
              <div class="article-meta">
                <div class="category">
                  <a class="article-tag-link" href="/categories/语言/">语言</a>
                </div>
                <div class="date"><time datetime="2018-02-05T09:04:27.000Z" itemprop="datePublished">2018-02-05</time></div>
              </div>
              <h1 class="article-title" itemprop="name">
                <a href="/2018/02/05/first/">第一篇博客</a>
              </h1>
              <p class="article-excerpt">
                Welcome to Hexo! This is your very first post. Check documentation for more info. If you get any problems when using Hexo, you can find the answer in troubleshooting or you can ask me on GitHub.
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
export default {
  name: 'tags-list',
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
