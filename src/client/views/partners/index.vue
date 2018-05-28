<template>
  <div class="partners">
    <div class="main-body-header">
      <h2 class="header">
        <em class="page-title-link" data-url="home">{{$t('content.partners')}}</em>
      </h2>
    </div>
    <div class="main-body-content">
      <div class="partners-con">
        <div class="partners-box" v-for="(par, ind) in curPars" :key="ind">
          <h3 class="partners-title">{{par.title}}</h3>
          <div class="logo-box">
            <a :href="par.link" target="_black" v-if="par.link">
              <img :src="par.cover">
            </a>
            <img :src="par.cover" v-else>
          </div>
          <div class="content-box">
            {{par.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: "partners",
  data() {
    return { partners: [] }
  },
  computed: {
    ...mapGetters(['lan']),
    curPars() {
      return this.partners.filter(par => par.lan === this.lan)
    }
  },
  async mounted() {
    this.$store.commit('setLoading', true)
    try {
      const res = await this.$store.dispatch('getPartners');
      if(res.mes) this.$Message.success(res.mes);
      this.partners = res.data;
      this.$store.commit('setLoading', false)
    } catch (err) {
      this.$store.commit('setLoading', false)
    }

  }
}
</script>
<style lang="less">
@import './index.less';
</style>
