<template>
  <div class="widget-wrap">
    <div class="widget-title">{{$t('siderBar.recent')}}</div>
    <div class="widget-inner">
      <ul class="recent-post">
        <li v-for="(blog, ind) in recentBlogs" :key="ind">
          <div class="item-thumbnail">
            <router-link :to="`/blog/${blog.title}`" class="thumbnail">
              <span :style="`background-image:url(${blog.cover})`" class="thumbnail-image" v-if="blog.cover" />
              <i class="fa fa-picture-o" aria-hidden="true" v-else />
            </router-link>
          </div>
          <div class="item-inner">
            <p class="item-category">
              <router-link class="article-tag-link" v-for="(tag, ind) in blog.tags.slice(0, 2)" :to="`/tags/${tag}`" :key="ind">
                {{tag}}
              </router-link>
            </p>
            <p class="item-title">
              <router-link :to="`/blog/${blog.title}`">{{blog.title}}</router-link>
            </p>
            <p class="item-date"><time :datetime="blog.createAt" itemprop="datePublished">{{setDate(blog.createAt)}}</time></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "widget",
  computed: {
    ...mapGetters(['blogs']),
    recentBlogs() {
        return this.blogs.slice(0,5)
    }
  },
  methods: {
    setDate: date => date.split('T')[0] || ''
  }
}
</script>
<style lang="less" scoped>
@import './recent-post.less';
</style>
