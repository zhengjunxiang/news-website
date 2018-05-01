<style lang="less">
</style>
<template>
<div>
  <div class="main-body-header">
    <h1 class="header">
      <i class="icon fa fa-calendar-o"></i> <em class="page-title-link" data-url="home">{{$t('content.events')}}</em>

    </h1>
  </div>
  <div class="main-body-content">
    <section class="archives-wrap">
      <div class="archives">
        <div class="article-row">
          <article class="article article-summary" v-for="(event, ind) in curEvents" :key="ind">
            <div class="article-summary-inner">
                <router-link :to="`/event/${event.title}`" class="thumbnail">
                  <span :style="`background-image:url(${event.cover})`" class="thumbnail-image" v-if="event.cover" />
                  <i class="fa fa-picture-o" aria-hidden="true" v-else />
                </router-link>
              <div class="article-meta">
                <div class="date">
                  <time :datetime="event.createAt" itemprop="datePublished">{{setDate(event.createAt)}}</time>
                  <span style="margin-left: 10px;">{{event.author}}</span>
                </div>
              </div>
              <h2 class="article-title" itemprop="name">
                <router-link :to="`/event/${event.title}`">{{event.title}}</router-link>
              </h2>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
  <page-nav :datas="events" :size="pageSize" @on-change="onClickPage" />
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
  async mounted() {
    const res = this.$store.dispatch('getEvents')
  },
  computed: {
    ...mapGetters(['events']),
    curEvents() {
      return this.events.slice((this.curP-1)*this.pageSize, this.curP*this.pageSize)
    }
  },
  methods: {
    setDate: date => date.split('T')[0],
    onClickPage(page) {
      this.curP = page
    }
  }
};
</script>
