<template>
<div class="companion" id="companion">
  <Row class="margin-top-10">
    <Card v-show="isShow">
      <p slot="title">编辑</p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input v-model="formCustom.title" :readonly="isUpdateIng" />
        </FormItem>
        <FormItem label="广告" prop="cover">
          <Input v-model="formCustom.cover" />
        </FormItem>
        <FormItem label="语言" prop="lan">
          <Select v-model="formCustom.lan" :disabled="isUpdateIng" style="width:200px">
            <Option v-for="item in lans" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="链接" prop="link">
          <Input v-model="formCustom.link" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom', 'postSidebar')">编辑</Button>
        </FormItem>
      </Form>
    </Card>
  </Row>
  <Row>
    <Card v-for="(post, ind) in postData" :key="ind" class="margin-top-10">
      <div slot="title">
        <p class="com-title">{{post.title}} / <span>{{post.lan}}</span> </p>
        <Button type="error" size="small" class="margin-left-10" @click="delCom(post.title, post.lan)">删除</Button>
        <Button type="info" size="small" @click="showUpdateCom(post.title, post.lan)">编辑</Button>
        <span class="title-date">更新时间：{{$U.fDate(post.updateAt)}}</span>
      </div>
      <Row>
        <Col span="10">
          <Card>
            <img :src="post.cover" alt="">
          </Card>
        </Col>
      </Row>
    </Card>
  </Row>
</div>
</template>

<script>
import conf from '@/libs/config'
export default {
  name: 'posters-index',
  data() {
    return {
      formCustom: { title: '', cover: '', link: '', lan: '', type: '' },
      ruleCustom: {
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        cover: [{ required: true, message: '不能为空', trigger: 'blur' }],
        lan: [{ required: true, message: '不能为空', trigger: 'change' }],
        link: [{ message: '不能为空', trigger: 'blur' }]
      },
      lans: conf.lans,
      postData: [],
      isShow: true,
      isUpdateIng: false
    }
  },
  mounted() { this.getCom() },
  methods: {
    handleSubmit(name, type) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          if (this.isUpdateIng) this.updateCom()
          else this.addCom(name, type)
        } else this.$Message.error('校验没通过！');
      })
    },
    async addCom(name, type) {
      const res = await this.$store.dispatch('addPosters', this.formCustom)
      if (res.mes) this.$Message.success(res.mes)
      this.$refs[name].resetFields();
      this.getCom()
      this.isShow = false
    },
    async getCom() {
      const res = await this.$store.dispatch('getPosters')
      this.postData = res.data;
    },
    delCom(title, lan) {
      this.$Modal.confirm({
        title: `删除`,
        content: `确定删除 <b>${title}</b> 吗？`,
        onOk: async () => {
          const res = await this.$store.dispatch('delPosters', {title, lan})
          if(res.mes) this.$Message.success(res.mes)
          this.getCom()
        },
        closable: true
      });
    },
    showUpdateCom(t, lang) {
      const {title, cover, link, lan} = this.postData.filter(par => (par.title === t && par.lan === lang))[0] || {};
      if (!title) return;
      this.formCustom = { title, cover, link, lan };
      this.isShow = true;
      this.isUpdateIng = true;
    },
    async updateCom() {
      const res = await this.$store.dispatch('updatePosters', this.formCustom)
      if(res.mes) this.$Message.success(res.mes)
      this.getCom()
      this.isShow = false;
      this.isUpdateIng = false;
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
      .title-date {
        float: right;
        line-height: 22px;
        font-size: 12px;
        margin-right: 30px;
      }
      button {
        float: right;
      }
    }
  }
</style>
