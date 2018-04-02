<style lang="less">
@import '../../styles/common.less';
@import './access.less';
</style>

<template>
<div class="access">
  <Row>
    <Col span="8">
    <Card>
      <p slot="title">
        <Icon type="android-contact"></Icon>
        当前用户
      </p>
      <div class="access-user-con access-current-user-con">
        <img :src="avatorPath" alt="">
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
                    <Icon :size="16" type="person"></Icon>
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
                  <Icon :size="14" type="locked"></Icon>
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
  <Modal v-model="isShow" width="800px" title="普通用户列表">
    <Table :data="userData" :columns="columns" stripe />
    <div slot="footer">
      <Button type="primary" @click="isShow = false">关闭</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import Cookies from 'js-cookie';
import columns from './columns.js';
export default {
  name: 'access_index',
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
      accessCode: parseInt(Cookies.get('access')),
      isShow: false,
      userData: [],
      columns: columns(this),
      form: {
        userName: '',
        password: '',
        passwdCheck: '',
        access: ''
      },
      rules: {
        userName: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }],
        passwdCheck: [{
          validator: validatePassCheck,
          trigger: 'blur'
        }],
        access: [{
          validator: validateAccessCheck,
          trigger: 'change'
        }]
      }
    };
  },
  computed: {
    avatorPath: () => localStorage.avatorImgPath
  },
  methods: {
    async getUser() {
      const res = await this.$store.dispatch('getUser');
      if (res.mes) this.$Message.success(res.mes)
      this.userData = res.data
    },
    formatDate(date) { return date.split('T')[0] },
    handleShowUser() {
      this.isShow = true
      this.getUser();
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