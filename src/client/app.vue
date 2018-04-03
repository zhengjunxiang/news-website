<template>
<div id="main" class="app-main">
  <div class="main">
    <NavHeader />
    <div class="single-page-con">
      <div class="single-page">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavHeader from './views/layout/nav.vue'
export default {
  name: 'home',
  components: {NavHeader},
  mounted() {
    this.$Message.config({ top: 50, duration: 5 })
    this.$Notice.config({ top: 50, duration: 5 })
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.app-main {
  width: 100%;
  height: 100%;
}
</style>
