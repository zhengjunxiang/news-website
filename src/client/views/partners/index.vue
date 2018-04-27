<template>
  <div>
    <div class="main-body-header">
      <h1 class="header">
        <em class="page-title-link" data-url="home">{{$t('content.partners')}}</em>
      </h1>
    </div>
    <div class="main-body-content">
      <div class="partners-con">
        <div class="partners-box" v-for="(com, ind) in partners" :key="ind">
          <h3 class="partners-title">{{com.title}}</h3>
          <div class="logo-box">
            <a :href="com.link" target="_black" v-if="com.link">
              <img :src="com.cover">
            </a>
            <img :src="com.cover" v-else>
          </div>
          <div class="content-box">
            {{com.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "partners",
  async mounted() {
    const res = await this.$store.dispatch('getCompanion');
    if(res.mes) this.$Message.success(res.mes);
    this.partners = res.data;
  },
  data: () => ({
    partners: []
  })
}
</script>
<style lang="less" scoped>
.partners-con {
  padding: 15px;
}
.partners-box {
  margin-bottom: 15px;
  overflow: hidden;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  .partners-title {
    padding-bottom: 10px;
    font-size: 22px;
    font-weight: 500;
    color: #333;
    line-height: 28px;
  }
  .logo-box {
    float: left;
    width: 40%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ddd;
    img {
      max-width: 100%;
    }
  }
  .content-box {
    box-sizing: border-box;
    font-size: 14px;
    text-indent: 28px;
    padding: 0 15px;
    float: left;
    width: 60%;
  }
}
</style>
