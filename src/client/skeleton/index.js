import Vue from 'vue'
import Skeleton from './index.vue'

const isDev = process.env.NODE_ENV === 'development'

let vm = {};

if (isDev) {
  vm = new Vue({
    el: '#app',
    components: {
      Skeleton
    },
    template: '<skeleton />'
  })
} else {
  vm = new Vue({
    components: {
      Skeleton
    },
    template: '<skeleton />'
  })
}

export default vm
