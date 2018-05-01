<style lang="less">
@import './new-publish.less';
</style>

<template>
<Row>
  <Col span="18">
    <Card>
      <Form :label-width="80">
        <div class="edit-info-box">
          <p v-show="isEdit" class="edit-info">编辑模式</p>
          <p v-show="isEdit" class="clo-edit-info" @click="closeEdit">关闭编辑模式</p>
        </div>
        <FormItem label="标题">
          <Input v-model="newTitle" :disabled="isEdit" @on-blur="handleTitleBlur" icon="android-list" />
        </FormItem>
        <FormItem label="简介">
          <Input v-model="newIntro" type="textarea" @on-blur="handleIntroBlur" />
        </FormItem>
        <FormItem label="语言">
          <Select v-model="lan" style="width:200px">
            <Option v-for="item in lans" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="封面图">
          <Input v-model="cover" @on-blur="handleCoverBlur" icon="ios-photos" />
        </FormItem>
        <FormItem label="作者">
          <Input v-model="author" @on-blur="handleAuthorBlur" icon="ios-person" />
        </FormItem>
      </Form>
      <div class="margin-top-20">
        <textarea id="newEditor" />
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
import conf from '@/libs/config'
export default {
  name: 'new-publish',
  components: { preview, tagsCard },
  computed: {
    ...mapGetters(['userN'])
  },
  data() {
    return {
      newTitle: '', newIntro: '', author: '', cover: '', showLink: false,
      editPathButtonType: 'ghost', publishTime: '',
      publishLoading: false, isShowPreview: false, isEdit: false,
      lans: conf.lans, lan: ''
    };
  },
  mounted() {
    if (localStorage.newEdit === 'edit') this.isEdit = true;
    this.initData();
    this.initTinymce();
  },
  activated() {
    if (localStorage.newEdit === 'edit') {
      this.initData();
      this.isEdit = true;
    }
    this.initTinymce();
  },
  deactivated() {
    localStorage.newContent = tinymce.activeEditor.getContent({format: 'raw'});
    if (tinymce.get('newEditor')) tinymce.get('newEditor').destroy();
  },
  methods: {
    closeEdit() {
      localStorage.newEdit = '';
      this.isEdit = false
    },
    initData() {
      this.newTitle = localStorage.newTitle || '';
      this.author = localStorage.newAuthor || this.userN;
      this.newIntro = localStorage.newIntro || '';
      this.cover = localStorage.newCover || '';
      this.lan = localStorage.newLan || '';
    },
    async handlePublish() {
      if (this.canPublish()) {
        const data = {
          title: this.newTitle,
          intro: this.newIntro,
          author: this.author,
          cover: this.cover,
          lan: this.lan,
          content: tinymce.activeEditor.getContent({format: 'raw'}),
          tags: this.$refs.tagsCard.onReturnTags()
        }
        this.publishLoading = true;
        const api = this.isEdit ? 'updateNews' : 'addNews';
        try {
          const res = await this.$store.dispatch(api, data)
          this.$Notice.success({
            title: '保存成功',
            desc: '文章《' + this.newTitle + '》保存成功',
            duration: 3
          });
          this.publishLoading = false;
        } catch (e) { this.publishLoading = false }
      }
    },
    handleTitleBlur() {
      if (this.newTitle.length !== 0) {
        localStorage.newTitle = this.newTitle; // 本地存储文章标题
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
      }
    },
    handleIntroBlur() { localStorage.newIntro = this.newIntro },
    handleAuthorBlur() { localStorage.newAuthor = this.author },
    handleCoverBlur() { localStorage.newCover = this.cover },
    canPublish() {
      if (this.newTitle.length === 0) {
        this.$Message.error('请输入文章标题');
        return false;
      } else if (this.lan === '') {
        this.$Message.error('请输选择语言');
        return false;
      } else return true;
    },
    handlePreview() {
      if (this.canPublish()) {
        this.$refs.preview.onShow();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        localStorage.publishTime = year + '-' + month + '-' + day;
        localStorage.newContent = tinymce.activeEditor.getContent({format: 'raw'});
        this.$nextTick(() => { this.$refs.preview.onPreview() })
      }
    },
    initTinymce() {
      if (tinymce.get('newEditor')) tinymce.get('newEditor').destroy();
      let vm = this;
      tinymce.init({
        selector: '#newEditor',
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
            if (localStorage.newContent) tinymce.get('newEditor').setContent(localStorage.newContent);
          });
          editor.on('keydown', function(e) {
            localStorage.newContent = tinymce.activeEditor.getContent({format: 'raw'});
          });
        }
      });
    }
  }
};
</script>
