<template>
<div id="new">
  <div class="main-body-header">
    <h1 class="header" style="text-align: center;">
      <em class="page-title-link" data-url="home">{{$t('content.aboutUs')}}</em>
    </h1>
  </div>
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="newPost">
      <div class="article-inner">
        <div class="article-meta">
          <div class="article-date">
            <span>
              <i class="fa fa-pencil" aria-hidden="true" />
              <time :datetime="$U.fDate(curData.updateAt)" itemprop="datePublished">{{$U.fDate(curData.updateAt)}}</time>
            </span>
          </div>
          <div class="article-author"><i class="fa fa-users" aria-hidden="true"></i>Antpool</div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="curData.content" />
        <footer class="article-footer">
          <div class="social-share-box">
            <div class="article-share-link" @click="handleClickShare">
              <i class="fa fa-share"></i>Share
            </div>
            <div :class="['social-share', 'social-share-about', {show}]" data-mode="prepend" :data-sites="setSites" />
          </div>
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
    return { show: false, datas: [] }
  },
  computed: {
    ...mapGetters(['lan']),
    setSites() {
      if (this.lan === 'EN') return 'twitter,facebook,google'
      else return 'wechat,qq,weibo,twitter,facebook,google'
    },
    curData() {
      return this.datas.filter(da => da.lan === this.lan)[0] || {};
    }
  },
  async mounted() {
    this.$store.commit('setLoading', true)
    try {
      const res = await this.$store.dispatch('getAbout');
      this.datas = res.data;
      window.socialShare('.social-share-about')
      this.$store.commit('setLoading', false)
    } catch (err) {
      this.$store.commit('setLoading', false)
    }
  },
  methods: {
    handleClickShare() {
      this.show = !this.show;
    }
  }
};
</script>
