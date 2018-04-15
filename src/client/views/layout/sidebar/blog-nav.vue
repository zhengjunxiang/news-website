<template>
<div class="nav-box" v-show="isShow">
  <router-link :to="`/blog/${newBlog}`" class="nav-link-wrap" v-show="newBlog">
    <strong class="nav-caption">下一篇</strong>
    <p class="nav-title">{{newBlog}}</p>
    <i class="icon fa fa-chevron-right" />
  </router-link>
  <router-link :to="`/blog/${oldBlog}`" class="nav-link-wrap" v-show="oldBlog">
    <strong class="nav-caption">上一篇</strong>
    <p class="nav-title">{{oldBlog}}</p>
    <i class="icon fa fa-chevron-left" />
  </router-link>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: "blog-nav",
  computed: {
    ...mapGetters(['blogs', 'newBlog', 'oldBlog'])
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    if (/blog/gi.test(this.$route.path)) this.isShow = true;
    else this.isShow = false;
  },
  watch: {
    '$route' (to, from) {
      if (/blog/gi.test(to.path)) this.isShow = true;
      else this.isShow = false;
    }
  }
}
</script>
<style lang="less" scoped>
.nav-link-wrap {
    position: relative;
    margin-top: 0;
    display: block;
    color: #aaa;
    padding: 15px 25px;
    border-bottom: 1px solid #ddd;
    transition: 0.2s ease-in;
    text-align: center;
    text-decoration: none;
    .nav-caption {
        display: block;
        font-size: 12px;
        color: #aaa;
        letter-spacing: 0.5px;
        line-height: 24px;
        font-weight: normal;
        text-transform: uppercase;
    }
    .nav-title {
        font-size: 15px;
        color: #666;
    }
    .icon {
        transition: all ease .3s;
        position: absolute;
        color: #ccc;
        font-size: 18px;
        top: 50%;
        width: 1em;
        margin-top: -10px;
    }
    .fa-chevron-left {
      left: 10px;
    }
    .fa-chevron-right {
      right: 10px;
    }
}
.nav-link-wrap:hover {
  .icon {
    color: #006bde;
  }
}
</style>
