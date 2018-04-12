<template>
  <div :class="['wrap', { showAlert, [type]: true }]" v-if="insert">
    <div class="body">
      <i :class="[faType, {fa: true}]" /><p class="mes">{{mes}}</p>
      <em class="del" @click="close">x</em>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alert',
  data() {
    return {
      showAlert: false,
      insert: false
    };
  },
  computed: {
    faType() {
      switch (this.type) {
        case 'error':
          return 'fa-times';
        case 'warn':
         return 'fa-exclamation-triangle';
        case 'info':
         return 'fa-info-circle';
        case 'success':
         return 'fa-check';
        default:
         return 'fa-times'
      }
    }
  },
  props: {
    mes: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    },
    dur: {
      type: Number,
      default: 3
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    show() {
      this.insert = true;
      setTimeout(() => {
        this.showAlert = true;
      }, 60)
      if (this.autoClose) {
        setTimeout(() => {
          this.showAlert && this.close()
        }, this.dur * 1000)
      }
    },
    close() {
      this.showAlert = false;
      setTimeout(() => {
        this.insert = false
      }, 600)
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import './alert.less';
</style>
