<style lang="less">
@import './message.less';
</style>

<template>
<div class="message-main-con">
  <div class="message-mainlist-con">
    <div>
      <Button @click="setCurrentMesType('unread')" size="large" long type="text">
        <transition name="mes-current-type-btn">
          <Icon v-show="currentMessageType === 'unread'" type="checkmark" />
        </transition>
        <span class="mes-type-btn-text">未读消息</span>
        <Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unreadCount" />
      </Button>
    </div>
    <div>
      <Button @click="setCurrentMesType('hasread')" size="large" long type="text">
        <transition name="mes-current-type-btn">
          <Icon v-show="currentMessageType === 'hasread'" type="checkmark" />
        </transition>
        <span class="mes-type-btn-text">已读消息</span>
        <Badge class="message-count-badge-outer" class-name="message-count-badge" :count="hasreadCount" />
      </Button>
    </div>
    <div>
      <Button @click="setCurrentMesType('recyclebin')" size="large" long type="text">
        <transition name="mes-current-type-btn">
          <Icon v-show="currentMessageType === 'recyclebin'" type="checkmark" />
        </transition>
        <span class="mes-type-btn-text">回收站</span>
        <Badge class="message-count-badge-outer" class-name="message-count-badge" :count="recyclebinCount" />
      </Button>
    </div>
  </div>
  <div class="message-content-con">
    <div class="message-title-list-con">
      <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" />
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import coulmns from './column'
export default {
  name: 'message_index',
  data() {
    return {
      currentMesList: [],
      unreadMesList: [],
      hasreadMesList: [],
      recyclebinList: [],
      currentMessageType: 'unread',
      showMesTitleList: true,
      unreadCount: 0,
      hasreadCount: 0,
      recyclebinCount: 0,
      mesTitleColumns: coulmns(this)
    };
  },
  computed: {
    ...mapGetters(['userN'])
  },
  methods: {
    setCurrentMesType(type) {
      this.currentMessageType = type;
      if (type === 'unread') this.currentMesList = this.unreadMesList
      else if (type === 'hasread') this.currentMesList = this.hasreadMesList
      else this.currentMesList = this.recyclebinList
    }
  },
  async mounted() {
    const res = await this.$store.dispatch('getUserOne', {name: this.userN});
    if (res.mes) this.$Message.success(res.mes)
    res.data.messages.forEach(m => {
      if (m.isDelete) this.recyclebinList.push(m)
      else if (m.isReaded) this.hasreadMesList.push(m)
      else this.unreadMesList.push(m)
    })
    this.currentMesList = this.unreadMesList
    this.unreadCount = this.unreadMesList.length;
    this.hasreadCount = this.hasreadMesList.length;
    this.recyclebinCount = this.recyclebinList.length;
  },
  watch: {
    unreadMesList(arr) { this.unreadCount = arr.length },
    hasreadMesList(arr) { this.hasreadCount = arr.length },
    recyclebinList(arr) { this.recyclebinCount = arr.length }
  }
};
</script>
