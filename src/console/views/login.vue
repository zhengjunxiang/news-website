<style lang="less">
@import './login.less';
</style>

<template>
<div class="login" @keydown.enter="handleSubmit">
  <div class="bg"></div>
  <div class="login-con">
    <Card :bordered="false">
      <p slot="title">
        <Icon type="log-in" /> 欢迎登录
      </p>
      <div class="form-con">
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
                <Icon :size="14" type="locked" />
              </span>
            </Input>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit" type="primary" long :loading="isLoading">登录</Button>
            <p class="login-tip" @click="register" v-show="!isLoading">注册超级管理员</p>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</div>
</template>

<script>
import util from '@/libs/util.js';
export default {
  data() {
    return {
      isLoading: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const name = this.form.userName
          const password = this.form.password
          if (util.mapScript(name) || util.mapScript(password)) {
            return this.$Message.error('含有非法字符');
          }
          const data = { name, password }
          try {
            this.isLoading = true
            const res = await this.$store.dispatch('login', data);
            if(res.mes) this.$Message.success(res.mes);
            this.$router.push({ name: 'home_index' });
            this.isLoading = false
          } catch (err) { this.isLoading = false }
        }
      });
    },
    register() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const name = this.form.userName
          const password = this.form.password
          if (util.mapScript(name) || util.mapScript(password)) {
            return this.$Message.error('含有非法字符');
          }
          const data = { name, password, access: 0 }
          try {
            this.isLoading = true
            const res = await this.$store.dispatch('register', data)
            if(res.mes) this.$Message.success(res.mes);
            this.isLoading = false
          } catch (err) { this.isLoading = false }
        }
      })
    }
  }
};
</script>
