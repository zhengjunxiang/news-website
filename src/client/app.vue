<template>
<div class="app-container">
  <AntHeader />
  <div class="container">
    <div class="container-inner main-body">
      <div class="main-body-inner">
        <section class="main">
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
  mounted() {
    this.$store.dispatch('getTagsAndBlogs')
    this.$Message.config({ top: 50, duration: 5 })
    this.$Notice.config({ top: 50, duration: 5 })
  }
};
</script>

<style lang='less'>
@import './styles/resize.less';
@import './app.less';
</style>
