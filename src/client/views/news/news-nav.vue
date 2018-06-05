<template>
<div class="nav-box" v-show="isShow">
  <router-link :to="`/new/${newNew._id}`" class="nav-link-wrap left" v-show="newNew.title">
    <strong class="nav-caption">{{$t('siderBar.older')}}</strong>
    <div class="nav-img-box">
      <span v-if="newNew.cover" class="img-box"><img :src="newNew.cover" alt="" class="nav-img"></span>
      <p class="nav-title">{{newNew.title}}</p>
    </div>
  </router-link>
  <router-link :to="`/new/${oldNew._id}`" class="nav-link-wrap right" v-show="oldNew.title">
    <strong class="nav-caption">{{$t('siderBar.newer')}}</strong>
    <div class="nav-img-box">
      <span v-if="oldNew.cover" class="img-box"><img :src="oldNew.cover" alt="" class="nav-img"></span>
      <p class="nav-title">{{oldNew.title}}</p>
    </div>
  </router-link>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: "news-nav",
  computed: {
    ...mapGetters(['newNew', 'oldNew'])
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    if (/new/gi.test(this.$route.path)) this.isShow = true;
    else this.isShow = false;
  },
  watch: {
    '$route' (to, from) {
      if (/new/gi.test(to.path)) this.isShow = true;
      else this.isShow = false;
    }
  }
}
</script>
<style lang="less">
.nav-box {
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;

  .nav-link-wrap.left {
    float: left;
  }
  .nav-link-wrap.right {
    float: right;
  }
  .nav-link-wrap {
      margin-top: 0;
      display: inline-block;
      width: 48%;
      color: #aaa;
      padding: 15px 0;
      transition: 0.2s ease-in;
      line-height: 24px;
      text-decoration: none;
      .nav-img-box {
        padding: 10px 0;
      }
      .img-box {
        padding-right: 10px;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
      }
      .nav-img {
        width: 60px;
        height: 50px;
      }
      .nav-caption {
          border-bottom: 1px solid #e8e8e8;
          text-align: left;
          display: block;
          font-size: 14px;
          color: #999;
          letter-spacing: 0.5px;
          line-height: 24px;
          font-weight: 5000;
          text-transform: uppercase;
      }
      .nav-title {
          word-break: break-all;
          display: table-cell;
          font-weight: 500;
          font-size: 16px;
          color: #666;
      }
  }
}

</style>
