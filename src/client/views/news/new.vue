<template>
<div id="new">
  <div class="main-body-header" v-if="ne.tags && ne.tags.length">
    <h3 class="header">
      <span v-for="(tag, ind) in ne.tags" class="tags-list">{{tag}}</span>
    </h3>
  </div>
  <div class="main-body-content">
    <article class="article article-single article-type-post" itemprop="nePost">
      <div class="article-inner">
        <header class="article-header">
          <h2 class="article-title" itemprop="name">
            {{ne.title}}
          </h2>
        </header>
        <div class="article-meta">
          <div class="article-date">
            <span>
              <i class="fa fa-plus" aria-hidden="true" />
              <time :datetime="ne.createAt" itemprop="datePublished">{{$U.fDate(ne.createAt)}}</time>
            </span>
            <span v-if="$U.fDate(ne.createAt) !== $U.fDate(ne.updateAt)">
              <i class="fa fa-pencil" aria-hidden="true" />
              <time :datetime="ne.updateAt" itemprop="datePublished">{{$U.fDate(ne.updateAt)}}</time>
            </span>
          </div>
          <div class="article-author"><i class="fa fa-user" aria-hidden="true"></i>{{ne.author}}</div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="ne.content" />
        <footer class="article-footer">
          <div class="vue-star-box">
            <vue-star ref="like" animate="animated rubberBand" color="#F05654" :isActive="isActive" :disable="disable">
              <a slot="icon" class="fa fa-heart" @click="handleStar"></a>
            </vue-star>
          </div>
          <div class="star-number-box">
            <span class="star-number like">{{ne.like}}</span>
          </div>
          <div class="social-share-box">
            <div class="article-share-link" @click="handleClickShare">
              <i class="fa fa-share"></i>Share
            </div>
            <div :class="['social-share', 'social-share-new', {show}]" data-mode="prepend" :data-sites="setSites" />
          </div>
        </footer>
      </div>
    </article>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import tLocalStorage from 'time-localstorage'
export default {
  name: "new",
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
    ...mapGetters(['ne', 'lan']),
    setSites() {
      if (this.lan === 'EN') return 'twitter,facebook,google'
      else return 'wechat,qq,weibo,twitter,facebook,google'
    }
  },
  async mounted() {
    const title = this.$route.params.title
    if (title) {
      this.title = title;
      this.$store.commit('setCurrentTitle', title)
      this.$store.commit('setNewnav', title)
      this.$store.commit('setLoading', true)
      try {
        const res = await this.$store.dispatch('getNew', {title})
        window.socialShare('.social-share-new')
        this.$store.commit('setLoading', false)
      } catch (err) {
        this.$store.commit('setLoading', false)
      }
    }
    this.initStar()
  },
  watch: {
    async '$route' (to, from) {
      this.show = false
      const title = to.params.title;
      if (title) {
        if (title === this.title) return;
        this.title = title;
        this.$store.commit('setCurrentTitle', title)
        this.$store.commit('setNewnav', to.params.title)
        this.$store.commit('setLoading', true)
        try {
          const res = await this.$store.dispatch('getNew', {title})
          window.socialShare('.social-share-new')
          this.$store.commit('setLoading', false)
        } catch (err) {
          this.$store.commit('setLoading', false)
        }
        this.initStar()
      }
    }
  },
  methods: {
    initStar() {
      const title = this.$route.params.title,
        storage = tLocalStorage.get('likeTitle'),
        storageUn = tLocalStorage.get('unlikeTitle');
      let isExist = false,
       isExistUn = false;
      if (storage) {
        storage.forEach(s => {
          if (s === title) return isExist = true;
        })
      }
      if (storageUn) {
        storageUn.forEach(s => {
          if (s === title) return isExistUn = true;
        })
      }
      this.isActive = isExist;
      this.disable = isExist;
      this.isActiveUn = isExistUn;
      this.disableUn = isExistUn;
    },
    async handleStar() {
      if (this.disable) {
        this.$Alert('已经点过了')
      } else {
        const title = this.$route.params.title
        const LocalS = tLocalStorage.get('likeTitle');
        this.disable = true
        this.isActive = true
        await this.$store.dispatch('likeNew', {title});
        this.$store.dispatch('getNew', {title})
        if (LocalS) {
          tLocalStorage.set('likeTitle', [...LocalS, title], 60*60*12)
        } else {
          tLocalStorage.set('likeTitle', [title], 60*60*12)
        }
      }
    },
    async handleDown() {
      if (this.disableUn) {
        this.$Alert('已经点过了')
      } else {
        const title = this.$route.params.title
        const LocalS = tLocalStorage.get('unlikeTitle');
        this.disableUn = true
        this.isActiveUn = true
        await this.$store.dispatch('unlikeNew', {title})
        this.$store.dispatch('getNew', {title})
        if (LocalS) {
          tLocalStorage.set('unlikeTitle', [...LocalS, title], 60*60*12)
        } else {
          tLocalStorage.set('unlikeTitle', [title], 60*60*12)
        }
      }
    },
    handleClickShare() {
      this.show = !this.show;
    }
  }
}
</script>
<style lang="less">
@import '../../styles/prism.css';
</style>
