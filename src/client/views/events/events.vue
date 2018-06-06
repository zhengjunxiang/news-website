<style lang="less">
</style>
<template>
<div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="poster-box" v-if="lists.cover">
        <a :href="lists.link" v-if="lists.link" target="_blank"><img :src="lists.cover" alt="" /></a>
        <img :src="lists.cover" alt="" v-else />
      </div>
      <div v-for="(event, ind) in curEvents" :key="ind">
        <article class="article-summary feature" v-if="event.feature">
          <div v-if="event.cover">
            <router-link :to="`/event/${event._id}`" class="thumbnail">
              <img :src="event.cover" class="thumbnail-image" />
              <div class="mark">
                <h2 class="article-title" itemprop="name">
                  <router-link :to="`/event/${event._id}`">{{event.title}}</router-link>
                </h2>
                <div class="article-meta">
                  <span class="view-box"><Icon type="eye" /> {{event.view}}</span>
                  <time :datetime="event.updateAt" itemprop="datePublished">{{$U.fDate(event.updateAt)}}</time>
                  <span>{{event.author}}</span>
                </div>
              </div>
            </router-link>
            <div :class="['article-tro', !event.cover ? 'no-cover' : '']">
              <p class="article-excerpt">{{event.intro}}</p>
            </div>
          </div>
          <div v-else>
            <div :class="['article-tro', !event.cover ? 'no-cover' : '']">
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/event/${event._id}`">{{event.title}}</router-link>
              </h2>
              <div class="article-meta">
                <span class="view-box"><Icon type="eye" /> {{event.view}}</span>
                <time :datetime="event.updateAt" itemprop="datePublished">{{$U.fDate(event.updateAt)}}</time>
                <span>{{event.author}}</span>
              </div>
              <p class="article-excerpt">{{event.intro}}</p>
            </div>
          </div>
        </article>
        <article class="article-summary" v-else>
          <router-link :to="`/event/${event._id}`" class="thumbnail" v-if="event.cover">
            <img :src="event.cover" class="thumbnail-image" />
          </router-link>
          <div :class="['article-tro', !event.cover ? 'no-cover' : '']">
            <h2 class="article-title" itemprop="name">
              <router-link :to="`/event/${event._id}`">{{event.title}}</router-link>
            </h2>
            <div class="article-meta">
              <span class="view-box"><Icon type="eye" /> {{event.view}}</span>
              <time :datetime="event.updateAt" itemprop="datePublished">{{$U.fDate(event.updateAt)}}</time>
              <span>{{event.author}}</span>
            </div>
            <p class="article-excerpt">{{event.intro}}</p>
          </div>
        </article>
      </div>
    </section>
    <Page size="small" :total="events.length" show-total @on-change="handlePage" :page-size="pageSize" />
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'events',
  data() {
    return {
      pageSize: 10,
      curP: 1
    }
  },
  computed: {
    ...mapGetters(['events', 'posters']),
    curEvents() {
      return this.events.slice((this.curP-1)*this.pageSize, this.curP*this.pageSize)
    },
    lists() {
      return this.posters.filter(p => p.type === 'lists')[0] || {}
    }
  },
  methods: {
    handlePage(page) {
      this.curP = page
    }
  }
};
</script>
