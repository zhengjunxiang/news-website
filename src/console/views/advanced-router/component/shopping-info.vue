<style lang="less">
@import '../../../styles/common.less';
@import '../advanced-router.less';
</style>

<template>
<div>
  <Row>
    <Card>
      <p slot="title">
        <Icon type="compose"></Icon>
        订单详情
      </p>
      <Table :columns="shopping_col" :data="shopping_data"></Table>
    </Card>
  </Row>
</div>
</template>

<script>
export default {
  name: 'shopping-info',
  data() {
    return {
      showInfo: false,
      shopping_col: [{
          title: '购买物品名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '购买时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '价格',
          key: 'price',
          align: 'center'
        }
      ],
      shopping_data: []
    };
  },
  methods: {
    init() {
      this.shopping_data = [{
        name: '《vue.js实战》',
        time: '2017年11月12日 13：33：24',
        price: '10'
      }];
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    '$route' () {
      this.init();
    }
  }
};
</script>
