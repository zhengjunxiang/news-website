<template>
<div id="main" class="app-main">
  <router-view />
</div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
  mounted() {
    this.$Message.config({ top: 50, duration: 5 })
    this.$Notice.config({ top: 50, duration: 5 })
  }
};
</script>

<style>
@import './styles/common.less';

.app-main {
  width: 100%;
  height: 100%;
  min-width: 800px;
}
html,body {
  width: 100%;
  height: 100%;
}
</style>
