<template>
<nav class="page-nav">
  <span class="pages"> Page {{currentP}} of {{pages}} </span>
  <a href="javascript:;" class="extend prev" v-show="currentP !== 1" @click="handleClickPrev">«</a>
  <span class="page-number current" v-for="p in pages" v-if="p === currentP">{{p}}</span>
  <a href="javascript:;" class="page-number" v-else="p !== currentP" @click="handleClick(p)">{{p}}</a>
  <a href="javascript:;" class="extend next" v-show="pages !== currentP" @click="handleClickNext">»</a>
</nav>
</template>
<script>
export default {
  name: "page-nav",
  data() {
    return {
      currentP: 1
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.datas.length/this.size) === 0 ? 1 : Math.ceil(this.datas.length/this.size)
    },
    totle() {
      return this.datas.length
    }
  },
  mounted() {
    this.currentP = this.current
  },
  props: {
    datas: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number,
      default: 10
    },
    current: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleClick(page) {
      this.currentP = page
      this.$emit('on-change', page)
    },
    handleClickPrev() {
      if(this.currentP) this.currentP -= 1;
      this.$nextTick(() => {
        this.$emit('on-change', this.currentP)
      })
    },
    handleClickNext() {
      if(this.currentP < this.totle) this.currentP += 1;
      this.$nextTick(() => {
        this.$emit('on-change', this.currentP)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
