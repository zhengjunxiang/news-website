<style lang="less">
</style>
<template>
<div id="year">
  <div v-for="(year, ind) in newsM" :key="ind">
    <div class="main-body-content" v-for="(mon, ind) in year.news.slice(0, 5)" :key="ind">
      <div class="main-body-header">
        <h2 class="header">{{year.year}} - {{mon.month}}</h2>
      </div>
      <section class="archives-wrap">
        <article class="article article-summary" v-for="(ne, ind) in mon.news.slice(0, 5)" :key="ind">
          <router-link :to="`/new/${ne.title}`" class="thumbnail">
            <img :src="ne.cover" class="thumbnail-image" v-if="ne.cover" />
            <Icon type="image" v-else></Icon>
          </router-link>
          <div class="article-tro">
            <h2 class="article-title" itemprop="name">
              <router-link :to="`/new/${ne.title}`">{{ne.title}}</router-link>
            </h2>
            <div class="article-meta">
              <div class="date">
                <time :datetime="ne.createAt" itemprop="datePublished">{{$U.fDate(ne.createAt)}}</time>
                <span style="margin-left: 10px;">{{ne.author}}</span>
                <div class="tags-box">
                  <router-link v-for="(tag, ind) in ne.tags" :to="`/tags/${tag}`" :key="ind">
                    {{tag}}
                  </router-link>
                </div>
              </div>
            </div>
            <p class="article-excerpt">{{ne.intro}}</p>
          </div>
        </article>
        <p style="text-align: center;" v-if="mon.news.length > 5">
          <router-link style="font-size: 14px;" :to="`/year/${mon.month}`">
            more...
          </router-link>
        </p>
      </section>
    </div>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'year',
  computed: {
    ...mapGetters(['newsM']),
  }
};
</script>
