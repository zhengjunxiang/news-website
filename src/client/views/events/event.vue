<template>
<div id="new">
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="nePost">
      <div class="article-inner">
        <header class="article-header">
          <h2 class="article-title" itemprop="name">
            {{event.title}}
          </h2>
        </header>
        <div class="article-meta">
          <div class="article-date">
            <span>
              <i class="fa fa-plus" aria-hidden="true" />
              <time :datetime="event.createAt" itemprop="datePublished">{{$U.fDate(event.createAt)}}</time>
            </span>
            <span v-if="$U.fDate(event.createAt) !== $U.fDate(event.updateAt)">
              <i class="fa fa-pencil" aria-hidden="true" />
              <time :datetime="event.updateAt" itemprop="datePublished">{{$U.fDate(event.updateAt)}}</time>
            </span>
          </div>
          <div class="article-author"><i class="fa fa-user" aria-hidden="true"></i>{{event.author}}</div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="event.content" />
        <footer class="article-footer">
          <div class="social-share-box">
            <div class="article-share-link" @click="handleClickShare">
              <i class="fa fa-share"></i>Share
            </div>
            <div :class="['social-share', 'social-share-event', {show}]" data-mode="prepend" :data-sites="setSites" />
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
  name: "event",
  data() {
    return {
      title: '',
      show: false,
      isActive: false,
      disable: false,
      isActiveUn: false,
      disableUn: false
    }
  },
  computed: {
    ...mapGetters(['event', 'lan']),
    setSites() {
      if (this.lan === 'EN') return 'twitter,facebook,google'
      else return 'wechat,qq,weibo,twitter,facebook,google'
    }
  },
  async mounted() {
    const title = this.$route.params.title
    if (title) {
      this.title = title;
      this.$store.commit('setLoading', true)
      try {
        const res = await this.$store.dispatch('getEvent', {title})
        window.socialShare('.social-share-event')
        this.$store.commit('setLoading', false)
      } catch (err) {
        this.$store.commit('setLoading', false)
      }
    }
  },
  watch: {
    async '$route' (to, from) {
      this.show = false
      const title = to.params.title;
      if (title) {
        if (title === this.title) return;
        this.title = title;
        this.$store.commit('setLoading', true)
        try {
          const res = await this.$store.dispatch('getEvent', {title})
          window.socialShare('.social-share-event')
          this.$store.commit('setLoading', false)
        } catch (err) {
          this.$store.commit('setLoading', false)
        }
      }
    }
  },
  methods: {
    handleClickShare() {
      this.show = !this.show;
    }
  }
}
</script>
<style lang="less">
@import '../../styles/prism.css';
</style>
