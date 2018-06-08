<template>
  <div class="sk">
    <div class="sk-header">
      <div class="sk-box">
        <div class="sk-inner">
          <span class="logo"></span>
          <span class="nav-item" v-for="i in 4"></span>
          <span class="nav-toggle"></span>
        </div>
      </div>
    </div>
    <div class="sk-swiper">
      <div class="sk-box">
        <div class="sk-inner">
          <div class="left-box">
            <div class="feature">
              <div class="text-box"></div>
            </div>
            <div class="item" v-for="i in 4">
              <span class="img-box"></span>
              <span class="dec-box">
                <div class="title"></div>
                <div class="meta"></div>
              </span>
            </div>
          </div>
          <div class="right-box">
            <div class="item" v-for="i in 5"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="sk-footer"></div>
  </div>
</template>

<style lang="less">
@import './index.less';
</style>
