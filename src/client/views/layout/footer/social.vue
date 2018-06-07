<template>
  <div class="social">
    <p>{{$t('siderBar.follow')}}</p>
    <ul class="social-links">
      <li>
        <a class="social-tooltip" title="twitter" href="https://twitter.com/AntPoolBITMAIN" target="_blank">
         <Icon type="social-twitter"></Icon>
       </a>
      </li>
      <li>
        <a class="social-tooltip" title="facebook" href="https://www.facebook.com/AntPoolBITMAIN" target="_blank">
         <Icon type="social-facebook"></Icon>
       </a>
      </li>
      <li class="my-social-share">
        <a class="social-tooltip social-share-icon icon-weibo" title="weibo" href="https://weibo.com/antpool" target="_blank"></a>
      </li>
    </ul>
    <div class="lang-box">
      <Dropdown trigger="click" @on-click="toggleLan" placement="top-end">
        <Button type="primary" style="text-transform: Uppercase;">{{lang}}<Icon type="arrow-down-b" /></Button>
        <DropdownMenu slot="list">
          <DropdownItem v-for="lan in langs" :name="lan.value" :key="lan.value">{{lan.label}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import conf from '@/libs/config'
import {mapGetters} from 'vuex'
export default {
  name: "social",
  data() {
    return {
      langs: conf.lans
    }
  },
  computed: {
    ...mapGetters(['lan']),
    lang() {
      if (this.lan === 'zh') return '中文'
      else if (this.lan === 'en') return 'en'
    }
  },
  methods: {
    toggleLan(lang) {
      this.$i18n.locale = lang;
      this.$store.commit('setLan', lang)
      localStorage.setItem('language', lang)
      this.$store.commit('setNews')
      this.$store.commit('setTagsNews')
      this.$store.commit('setEvents')
      this.$store.commit('setSortNewsByDate')
      this.$store.commit('setSortNewsByMonth')
      this.$store.commit('setNewnav')
      if (/^\/new\//.test(this.$route.path)) this.$router.push({name: 'home'})
      else if (/^\/event\//.test(this.$route.path)) this.$router.push({name: 'events'})
    }
  }
}
</script>
