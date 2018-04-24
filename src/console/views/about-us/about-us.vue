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
    <Card v-show="!isEdit">
      <div class="margin-top-20">
        <Button type="primary" style="float: right;" @click="handleEdit">编辑</Button>
        <h2>关于我们</h2>
        <div class="about-us-meta">
          <span>更新日期： {{formatDate(aboutUsData.updateAt)}}</span>
        </div>
        <div class="preview-content-con" v-html="aboutUsData.content" />
      </div>
    </Card>
    <Card v-show="isEdit">
      <div class="margin-top-20">
        <textarea id="usEditor" />
      </div>
    </Card>
  </Col>
  <Col span="6" class="padding-left-10">
    <Card v-show="isEdit">
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
export default {
  name: 'about-us',
  components: { preview },
  data() {
    return {
      content: '', editPathButtonType: 'ghost', publishTime: '', aboutUsData: '',
      publishLoading: false, isShowPreview: false, isEdit: false
    };
  },
  mounted() {
    this.init();
    this.initTinymce();
  },
  methods: {
    canelPublish() { this.isEdit = false },
    handleEdit() { this.isEdit = true },
    formatDate(date) { return date ? date.split('T')[0] : '' },
    async init() {
      const res = await this.$store.dispatch('getAboutUs');
      this.aboutUsData = res.data[0];
    },
    async handlePublish() {
      const data = { content: tinymce.activeEditor.getContent({format: 'raw'}) }
      this.publishLoading = true;
      const res = await this.$store.dispatch('updateAboutUs', data)
      this.publishLoading = false;
      this.$Notice.success({
        title: '保存成功',
        duration: 3
      });
      this.isEdit = false;
      this.init();
      this.publishLoading = false;
    },
    handlePreview() {
      this.$refs.preview.onShow();
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      localStorage.aboutUsPublishTime = year + '-' + month + '-' + day;
      localStorage.aboutUsContent = tinymce.activeEditor.getContent({format: 'raw'});
      this.$nextTick(() => { this.$refs.preview.onPreview() })
    },
    initTinymce() {
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
  },
  destroyed() {
    tinymce.get('usEditor').destroy();
  }
};
</script>
