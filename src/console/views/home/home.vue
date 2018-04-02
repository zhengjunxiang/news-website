<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
<div class="home-main">
  <Row :gutter="10">
    <Col :md="24" :lg="10">
      <Row class-name="home-page-row1" :gutter="10">
        <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
          <Card>
            <Row type="flex" class="user-infor">
              <Col span="8">
              <Row class-name="made-child-con-middle" type="flex" align="middle">
                <img class="avator-img" :src="avatorPath" />
              </Row>
              </Col>
              <Col span="16" style="padding-left:6px;">
              <Row class-name="made-child-con-middle" type="flex" align="middle">
                <div>
                  <b class="card-user-infor-name">{{userName}}</b>
                  <p>super admin</p>
                </div>
              </Row>
              </Col>
            </Row>
            <div class="line-gray"></div>
            <Row class="margin-top-8">
              <Col span="8">
                <p class="notwrap">上次登录时间:</p>
              </Col>
              <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
            </Row>
            <Row class="margin-top-8">
              <Col span="8">
                <p class="notwrap">上次登录地点:</p>
              </Col>
              <Col span="16" class="padding-left-8">北京</Col>
            </Row>
          </Card>
        </Col>
        <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
          <Row :gutter="5">
            <Col :xs="24" :sm="12" :md="12">
              <infor-card id-name="user_created_count" :end-val="count.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日新增用户" />
            </Col>
            <Col :xs="24" :sm="12" :md="12">
              <infor-card id-name="visit_count" :end-val="count.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="今日浏览量" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
    <Col :md="24" :lg="14">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="android-checkbox-outline" /> 待办事项
        </p>
        <a type="text" slot="extra" @click.prevent="upDateNewToDoItem" style="margin-right: 20px;">
          <Icon type="refresh" />
        </a>
        <a type="text" slot="extra" @click.prevent="addNewToDoItem">
          <Icon type="plus-round" />
        </a>
        <Modal v-model="showAddNewTodo" title="添加新的待办事项" @on-ok="addNew" @on-cancel="cancelAdd">
          <Row type="flex" justify="center">
            <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
          </Row>
          <Row slot="footer">
            <Button type="text" @click="cancelAdd">取消</Button>
            <Button type="primary" @click="addNew">确定</Button>
          </Row>
        </Modal>
        <div class="to-do-list-con">
          <div v-for="(item, index) in toDoList" :key="item.title" class="to-do-item">
            <to-do-list-item :item="item" @update="upDateToDoneList" />
          </div>
        </div>
      </Card>
    </Col>
  </Row>
  <Row :gutter="10" class="margin-top-10">
    <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
    <Card>
      <p slot="title" class="card-title">
        <Icon type="android-map" /> 上周每日来访量统计
      </p>
      <div class="data-source-row">
        <visite-volume />
      </div>
    </Card>
    </Col>
    <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
    <Card>
      <p slot="title" class="card-title">
        <Icon type="ios-pulse-strong" /> 数据来源统计
      </p>
      <div class="data-source-row">
        <data-source-pie />
      </div>
    </Card>
    </Col>
  </Row>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import inforCard from './components/inforCard.vue';
import toDoListItem from './components/toDoListItem.vue';

export default {
  name: 'home',
  components: { dataSourcePie, visiteVolume, inforCard, toDoListItem },
  data() {
    return {
      userName: '',
      toDoList: [],
      toDoneList: [],
      count: { createUser: 496, visit: 3264 },
      showAddNewTodo: false,
      newToDoItemValue: ''
    };
  },
  computed: {
    ...mapGetters(['userN']),
    avatorPath: () => localStorage.avatorImgPath
  },
  mounted() {
    this.userName = this.userN;
    this.getThings();
  },
  methods: {
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    upDateToDoneList(item, bool) {
      if (bool) {
        this.toDoneList.push({ title: item });
      } else {
        this.toDoneList = this.toDoneList.filter(it => {
          if (!(it.title === item)) return it;
        })
      }
    },
    async upDateNewToDoItem() {
      let results = await Promise.all(this.toDoneList.map(it => this.$store.dispatch('delThings', it)));
      results.map(item => item.mes && this.$Message.error(item.mes))
      this.getThings()
    },
    async addNew() {
      if (this.newToDoItemValue.length !== 0) {
        const data = { title: this.newToDoItemValue, creater: this.userName }
        const res = await this.$store.dispatch('addThings', data)
        if (res.mes) this.$Message.success(res.mes)
        this.getThings()
        this.cancelAdd();
      } else this.$Message.error('请输入待办事项内容');
    },
    async getThings() {
      const res = await this.$store.dispatch('getThings');
      if (res.mes) this.$Message.success(res.mes)
      this.toDoList = [...res.data]
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = '';
    }
  }
};
</script>
