<template>
<div class="app-container">
  <AntHeader v-on:getEelected="getEelected" ref="header" />
  <div class="container">
    <div class="container-inner main-body">
      <div class="main-body-inner">
        <section class="main">
          <div class="selected-box">
            <div v-for="(news, ind) in selected" class="selected-item" :key="ind" @click="handleSelec">
              <router-link :to="`/new/${news.title}`">
                <span>{{news.title}}</span>
                <span>{{setDate(news.createAt)}}</span>
                <span>{{news.author}}</span>
              </router-link>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </section>
        <Sidebar />
        <NewSpan v-show="isLoading" />
      </div>
    </div>
  </div>
  <AntFooter />
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
    ...mapGetters(['isLoading'])
  },
  methods: {
    getEelected(selected) {
      this.selected = selected
    },
    setDate: date => date.split('T')[0],
    handleSelec() {
      this.$refs.header.onResetSelect()
      this.selected = [];
    }
  },
  async mounted() {
    this.$store.commit('setLoading', true)
    try {
      const res = await this.$store.dispatch('getTagsAndNews');
      this.$store.commit('setLoading', false)
    } catch (err) {
      this.$store.commit('setLoading', false)
    }
  }
};
</script>

<style lang='less'>
@import './styles/resize.less';
@import "./styles/common.less";
@import "./styles/list.less";
@import "./styles/news.less";
@import './libs/components/share/css/share.less';
@import './app.less';
</style>
