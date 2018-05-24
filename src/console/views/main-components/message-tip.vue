<template>
<div @click="showMessage" class="message-con">
  <Tooltip :content="mesCount > 0 ? '有' + mesCount + '条未读消息' : '无未读消息'" placement="bottom">
    <Badge :count="mesCount" dot><Icon type="ios-bell" :size="22" /></Badge>
  </Tooltip>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '@/libs/util.js';
export default {
  name: 'messageTip',
  computed: {
    ...mapGetters(['mesCount'])
  },
  methods: {
    showMessage() {
      util.openNewPage(this, 'message_index');
      this.$router.push({ name: 'message_index' });
    }
  }
};
</script>
