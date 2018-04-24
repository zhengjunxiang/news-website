<style lang="less">
@import './own-space.less';
</style>

<template>
<div>
  <Card>
    <p slot="title"> <Icon type="person" /> 个人信息 </p>
      <Form ref="userForm" :model="userForm" :label-width="100" label-position="right" :rules="inforValidate">
        <FormItem label="用户姓名：" prop="userName">
          <div style="display:inline-block;width:300px;">
            <Input v-model="userForm.userName"></Input>
          </div>
        </FormItem>
        </FormItem>
        <FormItem label="部门：">
          <div style="display:inline-block;width:300px;">
            <Input v-model="userForm.department"></Input>
          </div>
        </FormItem>
        <FormItem label="登录密码：">
          <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
        </FormItem>
        <div>
          <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
          <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
        </div>
      </Form>
  </Card>
  <Modal v-model="editPasswordModal" :width="500">
    <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
    <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
      <FormItem label="原密码" prop="oldPass" :error="oldPassError">
        <Input type="password" v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPass">
        <Input type="password" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符"></Input>
      </FormItem>
      <FormItem label="确认新密码" prop="rePass">
        <Input type="password" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="cancelEditPass">取消</Button>
      <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'ownspace_index',
  data() {
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) callback(new Error('两次输入密码不一致'));
      else callback();
    };
    return {
      userForm: { userName: '', department: '' },
      save_loading: false,
      editPasswordModal: false, // 修改密码模态框显示
      savePassLoading: false,
      oldPassError: '',
      inforValidate: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      editPasswordForm: { oldPass: '', newPass: '', rePass: '' },
      passwordValidate: {
        oldPass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
          { max: 32, message: '最多输入32个字符', trigger: 'blur' }
        ],
        rePass: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: valideRePassword, trigger: 'blur' }
        ]
      }
    };
  },
  async mounted() {
    const res = await this.$store.dispatch('getUserOne', {name: this.userN});
    if (res.mes) this.$Message.success(res.mes)
    this.userForm.userName = res.data.userName
    this.userForm.department = res.data.department
  },
  computed: {
    ...mapGetters(['userN'])
  },
  methods: {
    showEditPassword() {
      this.editPasswordModal = true;
    },
    cancelEditUserInfor() {
      this.userForm = { userName: '', department: '' };
      this.$store.commit('removeTag', 'ownspace_index');
      localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
      let lastPageName = this.$store.state.app.pageOpenedList[1].name || this.$store.state.app.pageOpenedList[0].name;
      this.$router.push({ name: lastPageName });
    },
    saveEdit() {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          this.save_loading = true;
          const { userName, department } = this.userForm;
          try {
            const res = await this.$store.dispatch('updateMes', {userName, department, name: this.userN})
            if (res.mes) this.$Message.success(res.mes)
            this.save_loading = false;
          } catch (err) { this.save_loading = false }
        }
      });
    },
    cancelEditPass() {
      this.editPasswordForm = { oldPass: '', newPass: '', rePass: '' };
      this.editPasswordModal = false;
    },
    saveEditPass() {
      this.$refs['editPasswordForm'].validate(async (valid) => {
        if (valid) {
          this.savePassLoading = true;
          const { oldPass, newPass } = this.editPasswordForm;
          try {
            const res = await this.$store.dispatch('updatePassW', {oldPass, newPass, name: this.userN})
            if (res.mes) this.$Message.success(res.mes)
            this.savePassLoading = false;
            this.cancelEditPass();
            this.$store.commit('logout')
            this.$store.commit('clearOpenedSubmenu');
            this.$router.push({ name: 'login' });
          } catch (err) { this.savePassLoading = false }
        }
      });
    }
  }
};
</script>
