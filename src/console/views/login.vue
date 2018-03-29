<style lang="less">
@import './login.less';
</style>

<template>
<div class="login" @keydown.enter="handleSubmit">
  <div class="login-con">
    <Card :bordered="false">
      <p slot="title">
        <Icon type="log-in"></Icon>
        欢迎登录
      </p>
      <div class="form-con">
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
          <FormItem>
            <Button @click="handleSubmit" type="primary" long>登录</Button>
            <p class="login-tip" @click="register">注册超级管理员</p>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      form: {
        userName: '',
        password: ''
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
        }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const name = this.form.userName
          const password = this.form.password
          const data = { name, password }
          try {
            const res = await this.$store.dispatch('login', data);
            if(res.mes) this.$Message.success(res.mes);
            Cookies.set('user', name);
            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
            Cookies.set('access', res.data.access === 0 ? 0 : (res.data.access || 1));
            this.$router.push({ name: 'home_index' });
          } catch (err) {}
        }
      });
    },
    register() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const name = this.form.userName
          const password = this.form.password
          const data = { name, password, access: 0 }
          try {
            const res = await this.$store.dispatch('register', data)
            if(res.mes) this.$Message.success(res.mes);
          } catch (err) {}
        }
      })
    }
  }
};
</script>
