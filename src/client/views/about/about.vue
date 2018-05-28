<template>
<div>
  <div class="main-body-header">
    <h2 class="header" style="text-align: center;">
      <em class="page-title-link" data-url="home">{{$t('content.aboutUs')}}</em>
    </h2>
  </div>
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="newPost">
      <div class="social-share-box">
        <div class="social-share backg social-share-about show" data-mode="prepend" :data-sites="setSites" />
      </div>
      <div class="article-inner">
        <div class="article-meta">
          <div class="article-author"><Icon type="android-person"></Icon> Antpool</div>
          <span>
            <Icon type="edit" />
            <time :datetime="$U.fDate(curData.updateAt)" itemprop="datePublished">{{$U.fDate(curData.updateAt)}}</time>
          </span>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="curData.content" />
        <footer class="article-footer">

        </footer>
      </div>
    </article>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'about',
  data() {
    return { datas: [] }
  },
  computed: {
    ...mapGetters(['lan']),
    setSites() {
      if (this.lan === 'en') return 'twitter,facebook,google'
      else return 'wechat,qq,weibo,twitter,facebook,google'
    },
    curData() {
      return this.datas.filter(da => da.lan === this.lan)[0] || {};
    }
  },
  async mounted() {
    const res = await this.$store.dispatch('getAbout');
    this.datas = res.data;
    window.socialShare('.social-share-about')
  }
};
</script>
