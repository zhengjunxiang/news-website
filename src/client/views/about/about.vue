<template>
<div id="blog">
  <div class="main-body-header">
    <h1 class="header">
      <em class="page-title-link" data-url="home">{{$t('content.aboutUs')}}</em>
    </h1>
  </div>
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="blogPost">
      <div class="article-inner">
        <div class="article-meta">
          <div class="article-date">
            <span>
              <i class="fa fa-pencil" aria-hidden="true" />
              <time :datetime="setDate(data.updateAt)" itemprop="datePublished">{{setDate(data.updateAt)}}</time>
            </span>
          </div>
          <div class="article-author"><i class="fa fa-users" aria-hidden="true"></i>Antpool</div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="data.content" />
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
    return { show: false, data: '' }
  },
  async mounted() {
    const res = await this.$store.dispatch('getAboutUs');
    this.data = res.data[0];
  },
  methods: {
    setDate: date => date ? date.split('T')[0] : '',
    handleClickShare() {
      this.show = !this.show;
    }
  }
};
</script>
