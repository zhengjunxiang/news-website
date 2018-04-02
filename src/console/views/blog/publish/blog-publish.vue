<style lang="less">
@import '../../../styles/common.less';
@import './blog-publish.less';
</style>

<template>
<Row>
  <Col span="18">
    <Card>
      <Form :label-width="80">
        <FormItem label="文章标题">
          <Input v-model="blogTitle" :disabled="isEdit" @on-blur="handleTitleBlur" icon="android-list" />
        </FormItem>
        <FormItem label="文章简介">
          <Input v-model="blogIntro" type="textarea" @on-blur="handleIntroBlur" />
        </FormItem>
        <FormItem label="作者">
          <Input v-model="author" @on-blur="handleAuthorBlur" icon="ios-person" />
        </FormItem>
      </Form>
      <div class="margin-top-20">
        <textarea id="blogEditor" />
      </div>
    </Card>
  </Col>
  <Col span="6" class="padding-left-10">
    <Card>
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
        <preview ref="preview" />
      </Row>
    </Card>
    <div class="margin-top-10">
      <tags-card ref="tagsCard" />
    </div>
  </Col>
</Row>
</template>

<script>
import tinymce from 'tinymce';
import { mapGetters } from 'vuex';
import tagsCard from './tags-card'
import preview from './preview';
export default {
  name: 'blog-publish',
  components: { preview, tagsCard },
  computed: {
    ...mapGetters(['userN'])
  },
  data() {
    return {
      blogTitle: '', blogIntro: '', author: '', showLink: false,
      blogPath: '', editPathButtonType: 'ghost',
      publishTime: '', publishLoading: false,
      isShowPreview: false, isEdit: false
    };
  },
  mounted() {
    if (this.$route.query.q === 'edit') this.isEdit = true;
    this.blogTitle = localStorage.blogTitle || '';
    this.author = localStorage.author || this.userN;
    this.blogIntro = localStorage.blogIntro || '';
    this.initTinymce();
  },
  methods: {
    async handlePublish() {
      if (this.canPublish()) {
        const data = {
          title: this.blogTitle,
          intro: this.blogIntro,
          author: this.author,
          content: tinymce.activeEditor.getContent(),
          tags: this.$refs.tagsCard.onReturnTags()
        }
        this.publishLoading = true;
        try {
          const api = this.isEdit ? 'updateBlogs' : 'addBlogs';
          const res = await this.$store.dispatch(api, data)
          this.publishLoading = false;
          this.$Notice.success({
            title: '保存成功',
            desc: '文章《' + this.blogTitle + '》保存成功',
            duration: 3
          });
        } catch (err) {
          this.publishLoading = false;
        }
      }
    },
    handleTitleBlur() {
      if (this.blogTitle.length !== 0) {
        localStorage.blogTitle = this.blogTitle; // 本地存储文章标题
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.blogPath = window.location.host + '/' + year + '/' + month + '/' + day + '/';
      }
    },
    handleIntroBlur() {
      localStorage.blogIntro = this.blogIntro; // 本地存储文章简介
    },
    handleAuthorBlur() {
      localStorage.author = this.author; // 本地存储文章简介
    },
    canPublish() {
      if (this.blogTitle.length === 0) {
        this.$Message.error('请输入文章标题');
        return false;
      } else {
        return true;
      }
    },
    handlePreview() {
      if (this.canPublish()) {
        this.$refs.preview.onShow();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        localStorage.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second;
        localStorage.content = tinymce.activeEditor.getContent();
        this.$nextTick(() => { this.$refs.preview.onPreview() })
      }
    },
    initTinymce() {
      let vm = this;
      tinymce.init({
        selector: '#blogEditor',
        branding: false,
        elementpath: false,
        height: 600,
        language: 'zh_CN.GB2312',
        menubar: 'edit insert view format table tools',
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
          'searchreplace visualblocks visualchars code fullscreen fullpage',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons paste textcolor colorpicker textpattern imagetools codesample'
        ],
        toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
        autosave_interval: '20s',
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        },
        setup: function(editor) {
          editor.on('init', function(e) {
            vm.spinShow = false;
            if (localStorage.blogContent) tinymce.get('blogEditor').setContent(localStorage.blogContent);
          });
          editor.on('keydown', function(e) {
            localStorage.blogContent = tinymce.get('blogEditor').getContent();
          });
        }
      });
    }
  },
  destroyed() {
    tinymce.get('blogEditor').destroy();
  }
};
</script>
