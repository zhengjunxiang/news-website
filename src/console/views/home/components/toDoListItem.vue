<style lang="less">
@import './styles/to-do-list-item.less';
</style>

<template>
<Row class="to-do-list-item">
  <Col span="2" class="height-100">
    <Row type="flex" justify="center" align="middle" class="height-100">
      <Checkbox v-model="todoitem" />
    </Row>
  </Col>
  <Col span="22" class="height-100">
    <Row align="middle" class="height-100">
      <p class="to-do-list-item-text" @click="handleHasDid" :class="{hasDid: todoitem}">{{ item.title }}</p>
      <p class="to-do-list-item-text creatAt" @click="handleHasDid" :class="{hasDid: todoitem}">
        <b>{{ item.creater }}</b>
        创建时间：{{ $U.fDate(item.createAt) }}
      </p>
    </Row>
  </Col>
</Row>
</template>

<script>
export default {
  name: 'toDoListItem',
  data() {
    return {
      todoitem: false
    };
  },
  props: {
    item: Object
  },
  methods: {
    handleHasDid() {
      this.todoitem = !this.todoitem;
      this.$nextTick(() => { this.$emit('update', this.item.title, this.todoitem )})
    }
  }
};
</script>
