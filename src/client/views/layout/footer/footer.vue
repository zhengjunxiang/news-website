<template>
  <div class="footer">
    <div class="container" style="background: #006bde;">
      <div class="container-inner">
        <Social />
      </div>
    </div>
    <div class="container footer-b">
      <div class="container-inner">
        <div class="credit">
          <h2 class="logo-wrap">
            <a href="https://www.antpool.com" target="_black" class="logo"></a>
          </h2>
          <p>© 2018 {{$t('footer.ant')}}</p>
        </div>
        <div class="links-box">
          <p>{{$t('footer.links')}}:</p>
          <a href="https://www.antpool.com/index.htm" target="_black">{{$t('footer.antpool')}}</a>
          <a href="https://www.Bitmain.com" target="_black">{{$t('footer.bitmain')}}</a>
          <a href="https://minerbooking.com/en" target="_black">{{$t('footer.minerBooking')}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Social from './social.vue'
export default {
  name: "antfooter",
  components: {
    Social
  }
}
</script>
<style lang="less">
@import './footer.less';
</style>
