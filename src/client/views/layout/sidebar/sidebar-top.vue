<template>
  <div class="sidebar-top">
    <p>{{$t('siderBar.follow')}}</p>
    <ul class="social-links">
      <li>
        <a class="social-tooltip" title="twitter" href="https://twitter.com/AntPoolBITMAIN" target="_blank">
         <i class="icon fa fa-twitter"></i>
       </a>
      </li>
      <li>
        <a class="social-tooltip" title="facebook" href="https://www.facebook.com/AntPoolBITMAIN" target="_blank">
         <i class="icon fa fa-facebook"></i>
       </a>
      </li>
      <li>
        <a class="social-tooltip" title="weibo" href="https://weibo.com/antpool" target="_blank">
         <i class="icon fa fa-weibo"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "sidebar-top"
}
</script>
<style lang="less" scoped>
.sidebar-top {
  background: #006bde;
  padding: 15px 30px;
  overflow: hidden;
  p {
    float: left;
    color: rgba(255,255,255,0.8);
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 24px;
    padding: 3px 0;
  }
  .social-links {
    float: right;
    position: relative;
    padding-top: 2px;
    li {
      float: right;
      margin-left: 8px;
      width: 24px;
      text-align: center;
      .social-tooltip {
        position: relative;
        i.icon {
          color: rgba(255,255,255,0.8);
          transition: all ease .5s;
          width: 24px;
          font-size: 24px;
        }
        i.icon:hover {
          color: rgba(255,255,255,1);
        }
      }
    }
  }
}
</style>
