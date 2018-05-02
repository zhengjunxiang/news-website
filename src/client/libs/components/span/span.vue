<template>
  <div id="span" class="spin spin-fix">
    <div class="spin-main">
      <span class="span-dot"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "newspan"
}
</script>
<style lang="less" scoped>
#span.span {
  color: #2d8cf0;
  vertical-align: middle;
  text-align: center;
}
#span.spin-fix {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: hsla(0,0%,100%,.9);
  .spin-main {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    .span-dot {
      @keyframes ani-spin-bounce{0%{transform:scale(0)}100%{transform:scale(1);opacity:0}}
      display: inline-block;
      position: relative;
      display: block;
      border-radius: 50%;
      background-color: #2d8cf0;
      width: 32px;
      height: 32px;
      -webkit-animation: ani-spin-bounce 1s 0s ease-in-out infinite;
      animation: ani-spin-bounce 1s 0s ease-in-out infinite;
    }
  }
}
</style>
