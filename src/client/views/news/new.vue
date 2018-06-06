<template>
<div>
  <div class="main-body-content">

    <div class="content-header" v-if="ne.cover">
      <img :src="ne.cover" />
      <div class="mark">
        <header class="article-header">
          <h2 class="article-title" itemprop="name">{{ne.title}}</h2>
        </header>
      </div>
    </div>
    <div class="content-header no-cover" v-else>
      <header class="article-header">
        <h2 class="article-title" itemprop="name">{{ne.title}}</h2>
      </header>
    </div>

    <div class="poster-box" v-if="details.cover">
      <a :href="details.link" v-if="details.link" target="_blank"><img :src="details.cover" alt="" /></a>
      <img :src="details.cover" alt="" v-else />
    </div>

    <article class="article article-single article-type-post" itemprop="nePost">
      <div class="social-share-box">
        <div class="social-share backg social-share-new show" data-mode="prepend" :data-sites="setSites" />
      </div>
      <div class="article-inner">
        <div class="article-meta">
          <div class="avatar-box">
            <Avatar :src="avatar" size="large" v-if="avatar" />
            <Avatar icon="person" size="large" v-else />
          </div>
          <div class="article-meta-box">
            <div class="article-author"><Icon type="android-person"></Icon> {{ne.author}}</div>
            <span class="view-box"><Icon type="eye" /> {{ne.view}}</span>
            <span>
              <Icon type="ios-clock" />
              <time :datetime="ne.createAt" itemprop="datePublished">{{$U.fDate(ne.createAt)}}</time>
            </span>
            <span v-if="$U.fDate(ne.createAt) !== $U.fDate(ne.updateAt)" class="edit-date">
              <Icon type="edit" />
              <time :datetime="ne.updateAt" itemprop="datePublished">{{$U.fDate(ne.updateAt)}}</time>
            </span>
            <span v-if="ne.feature" style="float: right;"><Tag>Feature</Tag></span>
          </div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="ne.content" />
        <footer class="article-footer">
          <h3 class="tags-box">
            <Tag v-for="(tag, ind) in ne.tags" :key="ind">
              <router-link :to="`/tags/${tag}`">{{tag}}</router-link>
            </Tag>
          </h3>
          <div class="vue-star-box">
            <vue-star ref="like" animate="animated rubberBand" color="#F05654" :isActive="isActive" :disable="disable">
              <span slot="icon" @click="handleStar"><Icon type="heart" /></span>
            </vue-star>
          </div>
          <div class="star-number-box">
            <span class="star-number like">{{ne.like}}</span>
          </div>
        </footer>
        <NewsNav />
      </div>
    </article>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import NewsNav from './news-nav.vue'
import tLocalStorage from 'time-localstorage'
export default {
  name: "new",
  data() {
    return {
      id: '',
      isActive: false,
      disable: false,
      avatar: ''
    }
  },
  components: {
    NewsNav
  },
  computed: {
    ...mapGetters(['ne', 'lan', 'posters']),
    setSites() {
      if (this.lan === 'en') return 'twitter,facebook,google'
      else return 'wechat,qq,weibo,twitter,facebook,google'
    },
    details() {
      return this.posters.filter(p => p.type === 'details')[0] || {}
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) this.initData(id)
    this.initStar()
  },
  watch: {
    '$route' (to, from) {
      this.show = false
      const id = to.params.id;
      if (id) {
        if (id === this.id) return;
        this.initData(id)
      }
      this.initStar()
    }
  },
  methods: {
    async initData(id) {
      this.id = id;
      await this.$store.dispatch('getNew', {id})
      try {
        const res = await this.$store.dispatch('getUserAvatar', {name: this.ne.userName})
        if (res.data.avatar) this.avatar = res.data.avatar;
        this.$store.commit('setNewnav', id)
        window.socialShare('.social-share-new')
      } catch (err) {
        this.$store.commit('setNewnav', id)
        window.socialShare('.social-share-new')
      }
    },
    initStar() {
      const id = this.$route.params.id,
        storage = tLocalStorage.get('likeNewId');
      let isExist = false,
       isExistUn = false;
      if (storage) {
        storage.forEach(s => {
          if (s === id) return isExist = true;
        })
      }
      this.isActive = isExist;
      this.disable = isExist;
    },
    async handleStar() {
      if (this.disable) {
        this.$Message.warning('已经点过了')
      } else {
        const id = this.$route.params.id
        const LocalS = tLocalStorage.get('likeNewId');
        this.disable = true
        this.isActive = true
        await this.$store.dispatch('likeNew', {id});
        this.$store.dispatch('getNew', {id})
        if (LocalS) tLocalStorage.set('likeNewId', [...LocalS, id], 60*60*12)
        else tLocalStorage.set('likeNewId', [id], 60*60*12)
      }
    }
  }
}
</script>
<style lang="less">
@import '../../styles/prism.css';
</style>
