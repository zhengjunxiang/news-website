<template>
<div class="posters">
  <Row class="margin-top-10">
    <Card v-show="isShow">
      <p slot="title">编辑</p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input v-model="formCustom.title" />
        </FormItem>
        <FormItem label="广告" prop="cover">
          <Input v-model="formCustom.cover" />
        </FormItem>
        <FormItem label="链接">
          <Input v-model="formCustom.link" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">编辑</Button>
          <Button @click="handleCancel('formCustom')" class="margin-left-10">取消</Button>
        </FormItem>
      </Form>
    </Card>
  </Row>
  <Card style="width: 70%;" class="margin-top-10">
    <div slot="title">
      <p class="com-title">右侧广告 </p>
      <span class="title-date">更新时间：{{sidebarType.updateAt && $U.fDate(sidebarType.updateAt)}}</span>
    </div>
    <h3 style="margin-bottom: 10px;">{{sidebarType.title}}</h3>
    <a :href="sidebarType.link" v-if="sidebarType.link"><img :src="sidebarType.cover" alt="" /></a>
    <img :src="sidebarType.cover" alt="" v-else />
    <div class="mark">
      <span @click="handleClick('side-bar')"><Icon type="plus-round" /></span>
    </div>
  </Card>
</div>
</template>

<script>
export default {
  name: 'posters-index',
  data() {
    return {
      formCustom: { title: '', cover: '', link: '', type: '' },
      ruleCustom: {
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        cover: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      postData: [],
      isShow: false
    }
  },
  computed: {
    sidebarType() {
      let data = {};
      this.postData.forEach(p => {
        if (p.type === 'side-bar') data = p
      })
      return data;
    }
  },
  mounted() { this.getPosters() },
  methods: {
    handleCancel(name) {
      this.isShow = false
      this.formCustom.type = ''
      this.$refs[name].resetFields();
    },
    handleClick(type, lan) {
      document.querySelectorAll('.single-page-con')[0].scrollTo(0, 0);
      this.isShow = true
      this.formCustom.type = type
      this.postData.forEach(p => {
        if (p.type === type) {
          Object.keys(this.formCustom).forEach(k => this.formCustom[k] = p[k])
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.addPoster(name)
        } else this.$Message.error('校验没通过！');
      })
    },
    async addPoster(name) {
      const res = await this.$store.dispatch('addPosters', this.formCustom)
      if (res.mes) this.$Message.success(res.mes)
      this.$refs[name].resetFields();
      this.getPosters()
      this.isShow = false
    },
    async getPosters() {
      const res = await this.$store.dispatch('getPosters')
      this.postData = res.data;
    }
  }
};
</script>
<style lang="less">
@import './index.less';
</style>
