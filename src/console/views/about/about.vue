<style lang="less">
.article-link-con{
    height: 32px;
    width: 100%;
}
.publish-button-con{
    border-top: 1px solid #f3eff1;
    padding-top: 14px;
}
.publish-button{
    float: right;
    margin-left: 10px;
}
</style>

<template>
<Row>
  <Col span="18">
    <Button type="primary" icon="plus-round" @click="handleAdd" v-show="curType === ''">添加关于</Button>
    <Card v-for="(us, ind) in aboutUsData" v-show="!curType" :key="ind"  class="margin-top-10">
      <div class="margin-top-10">
        <Button type="error" style="float: right; margin-right: 5px;" @click="handleDel(us.lan)">删除</Button>
        <Button type="primary" style="float: right; margin-right: 5px;" @click="handleEdit(us.lan)">编辑</Button>
        <div class="about-us-meta" style="text-align: center;">
          <span>语言： {{us.lan}}</span>
        </div>
        <div class="about-us-meta">
          <span>更新日期： {{$U.fDate(us.updateAt)}}</span>
        </div>
        <div class="preview-content-con render" v-html="us.content" />
      </div>
    </Card>
    <Card v-show="curType">
      <div class="margin-top-20">
        <Form :label-width="80">
          <FormItem label="语言">
            <Select v-model="lan" style="width:200px" :disabled="curType === 'edit'">
              <Option v-for="item in lans" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
        <textarea id="usEditor" />
      </div>
    </Card>
  </Col>
  <Col span="6" class="padding-left-10">
    <Card v-show="curType">
      <p slot="title">
        <Icon type="paper-airplane" /> 发布
      </p>
      <p class="margin-top-10">
        <Icon type="ios-calendar-outline" />&nbsp;&nbsp;
        <span>立即发布</span>
      </p>
      <Row class="margin-top-20 publish-button-con">
        <span class="publish-button">
          <Button @click="handlePreview">预览</Button>
        </span>
        <span class="publish-button">
          <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button>
        </span>
        <span class="publish-button">
          <Button type="ghost" @click="canelPublish">取消</Button>
        </span>
      </Row>
      <preview ref="preview" />
    </Card>
  </Col>
</Row>
</template>

<script>
import tinymce from 'tinymce';
import preview from './preview';
import conf from '@/libs/config'
export default {
  name: 'about-us-index',
  components: { preview },
  data() {
    return {
      aboutUsData: [], publishLoading: false, curType: '', lans: conf.lans, lan: ''
    };
  },
  mounted() {
    this.init();
    this.initTinymce();
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    localStorage.aboutUsContent = tinymce.activeEditor.getContent({format: 'raw'});
    if (tinymce.get('usEditor')) tinymce.get('usEditor').destroy();
  },
  methods: {
    canelPublish() { this.curType = '' },
    handleDel(lan) {
      this.$Modal.confirm({
          title: `删除`,
          content: `确定删除 <b>${lan}</b> 吗？`,
          onOk: async () => {
            const res = await this.$store.dispatch('delAbout', {lan})
            if(res.mes) this.$Message.success(res.mes)
            this.init()
          },
          closable: true
      });
    },
    handleEdit(lan) {
      this.curType = 'edit'
      this.aboutUsData.forEach(us => {
        if(us.lan === lan) {
          tinymce.get('usEditor').setContent(us.content);
          this.lan = us.lan
          return;
        }
      })
    },
    handleAdd() {
      this.curType = 'add'
    },
    async init() {
      const res = await this.$store.dispatch('getAbout');
      this.aboutUsData = res.data || [];
    },
    async handlePublish() {
      let api = '';
      if (this.curType === 'edit') api = 'updateAbout';
      else if (this.curType === 'add') api = 'addAbout';
      if (api === '') return;
      if (this.lan === '') return this.$Message.error('请选择语言')
      try {
        const data = { content: tinymce.activeEditor.getContent({format: 'raw'}), lan: this.lan }
        this.publishLoading = true;
        const res = await this.$store.dispatch(api, data)
        this.$Notice.success({ title: '保存成功', duration: 3 });
        this.curType = '';
        this.init();
        this.publishLoading = false;
      } catch (e) { this.publishLoading = false }
    },
    handlePreview() {
      this.$refs.preview.onShow();
      localStorage.aboutUsPublishTime = this.$U.fDate();
      localStorage.aboutUsContent = tinymce.activeEditor.getContent({format: 'raw'});
      this.$nextTick(() => { this.$refs.preview.onPreview() })
    },
    initTinymce() {
      if (tinymce.get('usEditor')) tinymce.get('usEditor').destroy();
      let vm = this;
      tinymce.init({
        selector: '#usEditor',
        branding: false,
        elementpath: false,
        height: 600,
        language: 'zh_CN.GB2312',
        menubar: 'edit insert view format table tools',
        theme: 'modern',
        plugins: [
          'wordcount',
          'advlist autolink lists link image charmap print hr anchor pagebreak imagetools',
          'searchreplace visualblocks visualchars codesample',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'paste textcolor textpattern imagetools'
        ],
        toolbar: 'styleselect | forecolor backcolor bold italic | fontsizeselect | bullist numlist outdent indent | link image media codesample | newnote print | undo redo',
        autosave_interval: '20s',
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        },
        setup: function(editor) {
          editor.on('init', function(e) {
            vm.spinShow = false;
            if (localStorage.aboutUsContent) tinymce.get('usEditor').setContent(localStorage.aboutUsContent);
          });
          editor.on('keydown', function(e) {
            localStorage.aboutUsContent = tinymce.activeEditor.getContent({format: 'raw'});
          });
        }
      });
    }
  }
};
</script>
