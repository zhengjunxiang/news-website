<template>
<div class="app-container">
  <AntHeader v-on:getEelected="getEelected" ref="header" />
  <div class="container">
    <div class="container-inner main-body">
      <div class="main-body-inner">
        <section class="main">
          <div class="selected-box">
            <div v-for="(select, ind) in selected" class="selected-item" :key="ind" @click="handleSelec">
              <router-link :to="`/${type === 'news' ? 'new' : 'event'}/${select._id}`">
                <span>{{select.title}}</span>
                <span>{{$U.fDate(select.createAt)}}</span>
                <span>{{select.author}}</span>
              </router-link>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </section>
        <Sidebar />
        <Spin v-show="isLoading" fix size="large" />
      </div>
    </div>
  </div>
  <AntFooter />
  <BackTop />
</div>
</template>

<script>
import AntHeader from './views/layout/header/header.vue'
import AntFooter from './views/layout/footer/footer.vue'
import Sidebar from './views/layout/sidebar/sidebar.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  components: {AntHeader, AntFooter, Sidebar},
  data() {
    return {
      selected: []
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    type() {
      return this.$refs.header.selectedType
    }
  },
  methods: {
    getEelected(selected) {
      this.selected = selected
    },
    handleSelec() {
      this.$refs.header.onResetSelect()
      this.selected = [];
    }
  },
  mounted() {
    this.$store.dispatch('getEvents');
    this.$store.dispatch('getTagsAndNews');
    this.$store.dispatch('getPosters');
  }
};
</script>

<style lang='less'>
@import "./styles/resize.less";
@import "./styles/common.less";
@import "./styles/list.less";
@import "./styles/content.less";
@import "./styles/style-d.less";
@import "./styles/style-m.less";
</style>
