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
export default {
  name: "event",
  data() {
    return {
      id: '',
      isActive: false,
      disable: false,
      isActiveUn: false,
      disableUn: false,
      avatar: ''
    }
  },
  components: {
    EventsNav
  },
  computed: {
    ...mapGetters(['event', 'lan']),
    setSites() {
      if (this.lan === 'en') return 'twitter,facebook,google'
      else return 'wechat,qq,weibo,twitter,facebook,google'
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.initDate(id)
    }
  },
  watch: {
    '$route' (to, from) {
      this.show = false
      const id = to.params.id;
      if (id) {
        if (id === this.id) return;
        this.initDate(id)
      }
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
    }
  }
}
</script>
<style lang="less">
@import '../../styles/prism.css';
</style>
