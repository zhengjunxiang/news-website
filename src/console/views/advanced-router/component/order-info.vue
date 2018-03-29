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
      <Table :columns="order_col" :data="order_data"></Table>
      <Modal width="700" v-model="showInfo" title="订单信息">
        <Table :columns="order_col" :data="order_data"></Table>
      </Modal>
    </Card>
  </Row>
  <Row class="margin-top-10">
    <Card>
      <Row>
        <p class="advanced-router-tip-p">虽然iview-admin支持打开带参数的页面，但是类似于这种需求，还是建议用iview的Modal或者使用表格直接在表格内展开数据</p>
        <p>
          <Button @click="showInfo = true" type="primary">点击按钮弹出Modal</Button>
        </p>
      </Row>
    </Card>
  </Row>
</div>
</template>

<script>
export default {
  name: 'order-info',
  data() {
    return {
      showInfo: false,
      order_col: [{
          title: '订单号',
          key: 'order_id',
          align: 'center'
        },
        {
          title: '买家',
          key: 'buyer',
          align: 'center'
        },
        {
          title: '地址',
          key: 'addr',
          align: 'center'
        },
        {
          title: '下单时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '交易状态',
          key: 'state',
          align: 'center'
        }
      ],
      order_data: []
    };
  },
  methods: {
    init() {
      let order = {
        order_id: this.$route.params.order_id,
        buyer: 'Arasn',
        addr: '北京市东直门外大街39号院2号楼航空服务大厦',
        time: '2017年10月21日 19：13：24',
        state: '已收货'
      };
      this.order_data = [order];
    }
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  }
};
</script>
