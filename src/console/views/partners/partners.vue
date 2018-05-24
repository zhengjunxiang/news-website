<template>
<div class="companion" id="companion">
  <Row class="margin-top-10">
    <Button type="primary" icon="plus-round" v-show="!isShow" @click="isShow=true">添加合作伙伴</Button>
    <Card v-show="isShow">
      <p slot="title">{{isUpdateIng ? '编辑' : '添加'}}</p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input v-model="formCustom.title" :readonly="isUpdateIng" />
        </FormItem>
        <FormItem label="logo" prop="cover">
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
  <Row>
    <Card v-for="(par, ind) in parData" :key="ind" class="margin-top-10">
      <div slot="title">
        <p class="com-title">{{par.title}} / <span>{{par.lan}}</span> </p>
        <Button type="error" size="small" class="margin-left-10" @click="delCom(par.title, par.lan)">删除</Button>
        <Button type="info" size="small" @click="showUpdateCom(par.title, par.lan)">编辑</Button>
        <span class="title-date">更新时间：{{$U.fDate(par.updateAt)}}</span>
      </div>
      <Row>
        <Col span="10">
          <Card>
            <img :src="par.cover" alt="">
          </Card>
        </Col>
        <Col span="14" class="padding-left-10">
          <Row type="flex" align="middle" class="companion-intro-con">
            <p>{{par.content}}</p>
          </Row>
        </Col>
      </Row>
    </Card>
  </Row>
</div>
</template>

<script>
import conf from '@/libs/config'
export default {
  name: 'partners-index',
  data() {
    return {
      formCustom: { title: '', cover: '', link: '', content: '', lan: '' },
      ruleCustom: {
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        cover: [{ required: true, message: '不能为空', trigger: 'blur' }],
        lan: [{ required: true, message: '不能为空', trigger: 'change' }],
        link: [{ message: '不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      lans: conf.lans,
      parData: [],
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
          else this.addCom(name)
        } else this.$Message.error('校验没通过！');
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    async addCom(name) {
      const res = await this.$store.dispatch('addPartners', this.formCustom)
      if (res.mes) this.$Message.success(res.mes)
      this.$refs[name].resetFields();
      this.getCom()
      this.isShow = false
    },
    async getCom() {
      const res = await this.$store.dispatch('getPartners')
      this.parData = res.data;
    },
    delCom(title, lan) {
      this.$Modal.confirm({
        title: `删除`,
        content: `确定删除 <b>${title}</b> 吗？`,
        onOk: async () => {
          const res = await this.$store.dispatch('delPartners', {title, lan})
          if(res.mes) this.$Message.success(res.mes)
          this.getCom()
        },
        closable: true
      });
    },
    showUpdateCom(t, lang) {
      const {title, cover, link, content, lan} = this.parData.filter(par => (par.title === t && par.lan === lang))[0] || {};
      if (!title) return;
      this.formCustom = { title, cover, link, content, lan };
      document.querySelectorAll('.single-page-con')[0].scrollTo(0, 0);
      this.isShow = true;
      this.isUpdateIng = true;
    },
    async updateCom() {
      const res = await this.$store.dispatch('updatePartners', this.formCustom)
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
