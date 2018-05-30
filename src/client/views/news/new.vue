<template>
<div>
  <div class="main-body-content">

    <div class="content-header" v-if="ne.cover">
      <img :src="ne.cover" />
      <div class="mark">
        <header class="article-header">
          <h2 class="article-title" itemprop="name">
            {{ne.title}}
          </h2>
        </header>
      </div>
    </div>
    <div class="content-header no-cover" v-else>
      <header class="article-header">
        <h2 class="article-title" itemprop="name">
          {{ne.title}}
        </h2>
      </header>
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
            <span>
              <Icon type="ios-clock" />
              <time :datetime="ne.createAt" itemprop="datePublished">{{$U.fDate(ne.createAt)}}</time>
            </span>
            <span v-if="$U.fDate(ne.createAt) !== $U.fDate(ne.updateAt)" class="edit-date">
              <Icon type="edit" />
              <time :datetime="ne.updateAt" itemprop="datePublished">{{$U.fDate(ne.updateAt)}}</time>
            </span>
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
      title: '',
      isActive: false,
      disable: false,
      avatar: ''
    }
  },
  components: {
    NewsNav
  },
  computed: {
    ...mapGetters(['ne', 'lan']),
    setSites() {
      if (this.lan === 'en') return 'twitter,facebook,google'
      else return 'wechat,qq,weibo,twitter,facebook,google'
    }
  },
  mounted() {
    const title = this.$route.params.title
    if (title) {
      this.initData(title)
    }
    this.initStar()
  },
  watch: {
    '$route' (to, from) {
      this.show = false
      const title = to.params.title;
      if (title) {
        if (title === this.title) return;
        this.initData(title)
      }
      this.initStar()
    }
  },
  methods: {
    async initData(title) {
      this.title = title;
      await this.$store.dispatch('getNew', {title})
      try {
        const res = await this.$store.dispatch('getUserAvatar', {name: this.ne.userName})
        if (res.data.avatar) this.avatar = res.data.avatar;
        this.$store.commit('setCurrentNewTitle', title)
        this.$store.commit('setNewnav', title)
        window.socialShare('.social-share-new')
      } catch (err) {
        this.$store.commit('setCurrentNewTitle', title)
        this.$store.commit('setNewnav', title)
        window.socialShare('.social-share-new')
      }
    },
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
    },
    async handleStar() {
      if (this.disable) {
        this.$Message.warning('已经点过了')
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
    }
  }
}
</script>
<style lang="less">
@import '../../styles/prism.css';
</style>
