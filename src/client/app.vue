<template>
<div class="app-container">
  <AntHeader v-on:getEelected="getEelected" ref="header" />
  <div class="container">
    <div class="container-inner main-body">
      <div class="main-body-inner">
        <section class="main">
          <div class="selected-box">
            <div v-for="(blog, ind) in selected" class="selected-item" :key="ind" @click="handleSelec">
              <router-link :to="`/blog/${blog.title}`">
                <span>{{blog.title}}</span>
                <span>{{setDate(blog.createAt)}}</span>
                <span>{{blog.author}}</span>
              </router-link>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </section>
        <Sidebar />
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
export default {
  name: 'home',
  components: {AntHeader, AntFooter, Sidebar},
  data() {
    return {
      selected: []
    }
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
  mounted() {
    this.$store.dispatch('getTagsAndBlogs')
  }
};
</script>

<style lang='less'>
@import './styles/resize.less';
@import "./styles/common.less";
@import "./styles/list.less";
@import "./styles/blog.less";
@import './libs/components/share/css/share.less';
@import './app.less';
</style>
