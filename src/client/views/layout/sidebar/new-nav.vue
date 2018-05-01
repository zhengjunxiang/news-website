<template>
<div class="nav-box" v-show="isShow">
  <router-link :to="`/new/${oldNew}`" class="nav-link-wrap" v-show="oldNew">
    <strong class="nav-caption">{{$t('siderBar.newer')}}</strong>
    <p class="nav-title">{{oldNew}}</p>
    <i class="icon fa fa-chevron-right" />
  </router-link>
  <router-link :to="`/new/${newNew}`" class="nav-link-wrap" v-show="newNew">
    <strong class="nav-caption">{{$t('siderBar.older')}}</strong>
    <p class="nav-title">{{newNew}}</p>
    <i class="icon fa fa-chevron-left" />
  </router-link>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: "new-nav",
  computed: {
    ...mapGetters(['news', 'newNew', 'oldNew'])
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
