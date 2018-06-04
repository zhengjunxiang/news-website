<template>
<div id="new">
  <div class="main-body-content">

    <div class="content-header" v-if="event.cover">
      <img :src="event.cover" />
      <div class="mark">
        <header class="article-header">
          <h2 class="article-title" itemprop="name">{{event.title}}</h2>
        </header>
      </div>
    </div>
    <div class="content-header no-cover" v-else>
      <header class="article-header">
        <h2 class="article-title" itemprop="name">{{event.title}}</h2>
      </header>
    </div>

    <div class="poster-box" v-if="details.cover">
      <a :href="details.link" v-if="details.link" target="_blank"><img :src="details.cover" alt="" /></a>
      <img :src="details.cover" alt="" v-else />
    </div>

    <article class="article article-single article-type-post" itemprop="nePost">
      <div class="social-share-box">
        <div class="social-share backg social-share-event show" data-mode="prepend" :data-sites="setSites" />
      </div>
      <div class="article-inner">
        <div class="article-meta">
          <div class="avatar-box">
            <Avatar :src="avatar" size="large" v-if="avatar" />
            <Avatar icon="person" size="large" v-else />
          </div>
          <div class="article-meta-box">
            <div class="article-author"><Icon type="android-person"></Icon> {{event.author}}</div>
            <span>
              <Icon type="ios-clock" />
              <time :datetime="event.createAt" itemprop="datePublished">{{$U.fDate(event.createAt)}}</time>
            </span>
            <span v-if="$U.fDate(event.createAt) !== $U.fDate(event.updateAt)" class="edit-date">
              <Icon type="edit" />
              <time :datetime="event.updateAt" itemprop="datePublished">{{$U.fDate(event.updateAt)}}</time>
            </span>
          </div>
        </div>
        <div class="article-entry" itemprop="articleBody" v-html="event.content" />
        <footer class="article-footer">
          <div class="vue-star-box">
            <vue-star ref="like" animate="animated rubberBand" color="#F05654" :isActive="isActive" :disable="disable">
              <span slot="icon" @click="handleStar"><Icon type="heart" /></span>
            </vue-star>
          </div>
          <div class="star-number-box">
            <span class="star-number like">{{event.like}}</span>
          </div>
          <EventsNav />
        </footer>
      </div>
    </article>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import EventsNav from './events-nav.vue'
import tLocalStorage from 'time-localstorage'
export default {
  name: "event",
  data() {
    return {
      id: '',
      isActive: false,
      disable: false,
      avatar: ''
    }
  },
  components: {
    EventsNav
  },
  computed: {
    ...mapGetters(['event', 'lan', 'posters']),
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
    if (id) this.initDate(id)
    this.initStar()
  },
  watch: {
    '$route' (to, from) {
      this.show = false
      const id = to.params.id;
      if (id) {
        if (id === this.id) return;
        this.initDate(id)
      }
      this.initStar()
    }
  },
  methods: {
    async initDate(id) {
      this.id = id;
      await this.$store.dispatch('getEvent', {id})
      try {
        const res = await this.$store.dispatch('getUserAvatar', {name: this.event.userName})
        if (res.data.avatar) this.avatar = res.data.avatar;
        this.$store.commit('setEventnav', id)
        window.socialShare('.social-share-event')
      } catch (err) {
        window.socialShare('.social-share-event')
        this.$store.commit('setEventnav', id)
      }
    },
    initStar() {
      const id = this.$route.params.id,
        storage = tLocalStorage.get('likeEventId');
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
        const LocalS = tLocalStorage.get('likeEventId');
        this.disable = true
        this.isActive = true
        await this.$store.dispatch('likeEvent', {id});
        this.$store.dispatch('getEvent', {id})
        if (LocalS) tLocalStorage.set('likeEventId', [...LocalS, id], 60*60*12)
        else tLocalStorage.set('likeEventId', [id], 60*60*12)
      }
    }
  }
}
</script>
<style lang="less">
@import '../../styles/prism.css';
</style>
