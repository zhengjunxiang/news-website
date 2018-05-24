<style lang="less">
@import './access.less';
</style>

<template>
<div class="access">
  <Row v-if="!isShowUsers">
    <Col span="8">
    <Card>
      <p slot="title">
        <Icon type="android-contact"></Icon>
        当前用户
      </p>
      <div class="access-user-con access-current-user-con">
        <Avatar class="avator-img" icon="person" :src="avatorPath" style="background: #619fe7;" />
        <p>当前用户权限值:<b>{{ accessCode }}</b></p>
        <Button type="primary" @click="handleShowUser">显示已有普通用户</Button>
      </div>
    </Card>
    </Col>
    <Col span="16" class="padding-left-10">
    <Card>
      <p slot="title">
        <Icon type="android-contacts" /> 用户权限
      </p>
      <div class="access-user-con access-change-access-con">
        <div v-if="accessCode === 0">
          <p>创建普通用户:</p>
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person" />
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="passwdCheck">
              <Input type="password" v-model="form.passwdCheck" placeholder="确认密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked" />
                </span>
              </Input>
            </FormItem>
            <FormItem prop="access">
              <Select v-model="form.access" placeholder="权限">
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button @click="register" type="primary" long>创建用户</Button>
            </FormItem>
          </Form>
        </div>
        <div v-else>
          <p>没权限创建用户。</p>
        </div>
      </div>
    </Card>
    </Col>
  </Row>
  <Row v-show="isShowUsers">
    <Card class="users-con">
      <div slot="title">
        <Icon type="ios-people" size="20" style="float: left;" />
        <span style="float: left; margin-left: 6px;"><b>用户列表</b></span>
        <Button type="primary" size="small" style="float: right; margin-right: 30px;" @click="isShowUsers = false">
          <Icon type="chevron-left" />
        </Button>
      </div>
      <Table :data="userData" :columns="columns" stripe size="small" />
    </Card>
    <Card class="users-con" v-show="checkUser">
      <div slot="title">
        <Icon type="person" size="20" style="float: left;" />
        <span style="float: left; margin-left: 6px;"><b>历史操作记录 ({{checkUser}})</b></span>
        <Button type="primary" size="small" style="float: right; margin-right: 30px;" @click="checkUser = ''">
          <Icon type="close" />
        </Button>
      </div>
      <Table :data="checkData" :columns="columnsUser" stripe size="small" />
    </Card>
  </Row>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import columns from './columns.js';
import columnsUser from './columnsUser.js';
import util from '@/libs/util.js'
export default {
  name: 'access-index',
  computed: {
    ...mapGetters(['accessCode']),
    avatorPath: () => localStorage.avatorImgPath,
    checkData() {
      const userData = this.userData.filter(item => item.name === this.checkUser)[0] || null
      return userData ? userData.messages : []
    }
  },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') callback(new Error('请再次输入你的密码'));
      else if (value !== this.form.password) callback(new Error('两次输入的密码不相等!'));
      else callback();
    };
    const validateAccessCheck = (rule, value, callback) => {
      if (value === '') callback(new Error('请选择权限'));
      else callback();
    };
    return {
      isShowUsers: false,
      userData: [],
      checkUser: '',
      columnsUser: columnsUser(this),
      columns: columns(this),
      form: { userName: '', password: '', passwdCheck: '', access: '' },
      rules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
        access: [{ validator: validateAccessCheck, trigger: 'change' }]
      }
    };
  },
  methods: {
    async getUser() {
      const res = await this.$store.dispatch('getUser');
      if (res.mes) this.$Message.success(res.mes)
      this.userData = res.data
    },
    handleShowUser() {
      this.getUser();
      this.isShowUsers = true;
    },
    resetData() {
      this.form.userName = '',
      this.form.password = '',
      this.form.passwdCheck = '',
      this.form.access = ''
    },
    register() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const name = this.form.userName,
            password = this.form.password,
            access = this.form.access;
          if (util.mapScript(name) || util.mapScript(password)) return this.$Message.error('含有敏感字符')
          const data = { name, password, access }
          const res = await this.$store.dispatch('register', data)
          if (res.mes) this.$Message.success(res.mes)
          this.resetData()
        }
      })
    }
  }
};
</script>
