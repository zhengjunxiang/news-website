<template>
<div id="blog">
  <div class="main-body-header">
    <h1 class="header">
      <em class="page-title-link" data-url="home">关于我们</em>
    </h1>
  </div>
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="blogPost">
      <div class="article-inner">
        <div class="article-meta">
          <div class="article-date">
            <span>
              <i class="fa fa-pencil" aria-hidden="true" />
              <time datetime="2018-4-16" itemprop="datePublished">2018-4-16</time>
            </span>
          </div>
          <div class="article-author"><i class="fa fa-users" aria-hidden="true"></i>Antpool</div>
        </div>
        <!-- <div class="article-entry" itemprop="articleBody" v-html="" /> -->
        <div class="article-entry" itemprop="articleBody">
          <p>我们是蚂蚁矿池团队！！</p>
        </div>
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
export default {
  name: 'about',
  data() {
    return {
      show: false
    }
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
};
</script>
