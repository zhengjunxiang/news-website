<template>
<div class="nav-box" v-show="isShow">
  <router-link :to="`/event/${newEvent._id}`" class="nav-link-wrap left" v-show="newEvent.title">
    <strong class="nav-caption">{{$t('siderBar.older')}}</strong>
    <div class="nav-img-box">
      <img :src="newEvent.cover" alt="" class="nav-img" v-if="newEvent.cover">
      <Icon type="image" v-else></Icon>
      <p class="nav-title">{{newEvent.title}}</p>
    </div>
  </router-link>
  <router-link :to="`/event/${oldEvent._id}`" class="nav-link-wrap right" v-show="oldEvent.title">
    <strong class="nav-caption">{{$t('siderBar.newer')}}</strong>
    <div class="nav-img-box">
      <img :src="oldEvent.cover" alt="" class="nav-img" v-if="oldEvent.cover">
      <Icon type="image" v-else></Icon>
      <p class="nav-title">{{oldEvent.title}}</p>
    </div>
  </router-link>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: "events-nav",
  computed: {
    ...mapGetters(['newEvent', 'oldEvent'])
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    if (/event/gi.test(this.$route.path)) this.isShow = true;
    else this.isShow = false;
  },
  watch: {
    '$route' (to, from) {
      if (/event/gi.test(to.path)) this.isShow = true;
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
      .nav-img,.ivu-icon {
        font-size: 55px;
        margin-right: 20px;
        float: left;
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
          float: left;
          font-weight: 500;
          font-size: 16px;
          color: #666;
      }
  }
}

</style>
