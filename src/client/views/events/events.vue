<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h2 class="header"><em class="page-title-link" data-url="home">{{$t('content.events')}}</em></h2>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div v-for="(event, ind) in curEvents" :key="ind">
        <article class="article-summary feature" v-if="event.feature">
          <router-link :to="`/event/${event.title}`" class="thumbnail" v-if="event.cover">
            <img :src="event.cover" class="thumbnail-image" />
            <div class="mark">
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/event/${event.title}`">{{event.title}}</router-link>
              </h2>
              <div class="article-meta">
                <time :datetime="event.createAt" itemprop="datePublished">{{$U.fDate(event.createAt)}}</time>
                <span>{{event.author}}</span>
              </div>
            </div>
          </router-link>
          <div :class="['article-tro', !event.cover ? 'no-cover' : '']">
            <p class="article-excerpt">{{event.intro}}</p>
          </div>
        </article>
        <article class="article-summary" v-else>
          <router-link :to="`/event/${event.title}`" class="thumbnail" v-if="event.cover">
            <img :src="event.cover" class="thumbnail-image" />
          </router-link>
          <div :class="['article-tro', !event.cover ? 'no-cover' : '']">
            <h2 class="article-title" itemprop="name">
              <router-link :to="`/event/${event.title}`">{{event.title}}</router-link>
            </h2>
            <div class="article-meta">
              <time :datetime="event.createAt" itemprop="datePublished">{{$U.fDate(event.createAt)}}</time>
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
    ...mapGetters(['events']),
    curEvents() {
      return this.events.slice((this.curP-1)*this.pageSize, this.curP*this.pageSize)
    }
  },
  methods: {
    handlePage(page) {
      this.curP = page
    }
  }
};
</script>
