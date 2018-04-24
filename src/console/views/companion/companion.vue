<template>
<div class="companion" id="companion">
  <Row class="margin-top-10">
    <Button type="primary" icon="plus-round" v-show="!isShow" @click="isShow=true">添加合作伙伴</Button>
    <Card v-show="isShow">
      <p slot="title">添加伙伴</p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input v-model="formCustom.title" :readonly="isUpdateIng" />
        </FormItem>
        <FormItem label="logo" prop="cover">
          <Input v-model="formCustom.cover" />
        </FormItem>
        <FormItem label="链接" prop="link">
          <Input v-model="formCustom.link" />
        </FormItem>
        <FormItem label="描述" prop="content">
          <Input v-model="formCustom.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">{{isUpdateIng ? '编辑' : '添加'}}</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
          <Button type="text"style="margin-left: 8px" @click="cancleClick">取消</Button>
        </FormItem>
      </Form>
    </Card>
  </Row>
  <Row class="margin-top-10">
    <Card v-for="(com, ind) in comData" :key="ind">
      <div slot="title">
        <p class="com-title">{{com.title}}</p>
        <Button type="error" size="small" class="margin-left-10" @click="delCom(com.title)">删除</Button>
        <Button type="info" size="small" @click="showUpdateCom(com.title)">编辑</Button>
      </div>
      <Row>
        <Col span="10">
          <Card>
            <img :src="com.cover" alt="">
          </Card>
        </Col>
        <Col span="14" class="padding-left-10">
          <Row type="flex" align="middle" class="companion-intro-con">
            <p>{{com.content}}</p>
          </Row>
        </Col>
      </Row>
    </Card>
  </Row>
</div>
</template>

<script>
export default {
  name: 'companion-index',
  data() {
    return {
      formCustom: { title: '', cover: '', link: '', content: '' },
      ruleCustom: {
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        cover: [{ required: true, message: '不能为空', trigger: 'blur' }],
        link: [{ message: '不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      comData: [],
      isShow: false,
      isUpdateIng: false
    }
  },
  mounted() { this.getCom() },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          if (this.isUpdateIng) this.updateCom()
          else this.addCom()
          this.formCustom = { title: '', cover: '', link: '', content: '' }
        } else this.$Message.error('校验没通过！');
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    async addCom() {
      const res = await this.$store.dispatch('addCompanion', this.formCustom)
      if (res.mes) this.$Message.success(res.mes)
      this.getCom()
      this.isShow = false
    },
    async getCom() {
      const res = await this.$store.dispatch('getCompanion')
      this.comData = res.data;
    },
    delCom(title) {
      this.$Modal.confirm({
          title: `删除`,
          content: `确定删除 <b>${title}</b> 吗？`,
          onOk: async () => {
            const res = await this.$store.dispatch('delCompanion', {title})
            if(res.mes) this.$Message.success(res.mes)
            this.getCom()
          },
          closable: true
      });
    },
    showUpdateCom(t) {
      const {title, cover, link, content} = this.comData.filter(com => com.title === t)[0];
      if (!title) return;
      this.formCustom = { title, cover, link, content };
      document.querySelectorAll('.single-page-con')[0].scrollTo(0, 0);
      this.isShow = true;
      this.isUpdateIng = true;
    },
    async updateCom() {
      const {title, cover, link, content} = this.formCustom;
      const res = await this.$store.dispatch('updateCompanion', {title, cover, link, content})
      if(res.mes) this.$Message.success(res.mes)
      this.getCom()
      this.isShow = false;
      this.isUpdateIng = false;
    },
    cancleClick() {
      this.isShow = false;
      this.isUpdateIng = false;
      this.formCustom = { title: '', cover: '', link: '', content: '' }
    }
  }
};
</script>
<style lang="less">
  .companion {
    .ivu-card-body img {
      max-width: 100%;
    }
    .ivu-card-head {
      overflow: hidden;
      .com-title {
        width: auto;
        float: left;
      }
      button {
        float: right;
      }
    }
  }
</style>
