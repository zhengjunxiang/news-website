<style lang="less">
@import './index.less';
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
          <Input v-model="title" :disabled="isEdit" @on-blur="handleTitleBlur" icon="android-list" />
        </FormItem>
        <FormItem label="简介">
          <Input v-model="eventIntro" type="textarea" @on-blur="handleIntroBlur" />
        </FormItem>
        <FormItem label="语言">
          <Select v-model="lan" style="width:200px" :disabled="isEdit">
            <Option v-for="item in lans" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="封面图">
          <Input v-model="cover" @on-blur="handleCoverBlur" icon="ios-photos" />
        </FormItem>
        <FormItem label="作者">
          <Input v-model="author" @on-blur="handleAuthorBlur" icon="ios-person" />
        </FormItem>
        <FormItem label="置顶">
          <i-switch v-model="feature" @on-change="handleFeature" />
        </FormItem>
      </Form>
      <div class="margin-top-20">
        <textarea id="eventEditor" />
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
  </Col>
</Row>
</template>

<script>
import tinymce from 'tinymce';
import { mapGetters } from 'vuex';
import preview from './preview';
import conf from '@/libs/config'
export default {
  name: 'event-publish',
  components: { preview },
  computed: {
    ...mapGetters(['userN', 'artName'])
  },
  data() {
    return {
      title: '', eventIntro: '', author: '', cover: '', showLink: false,
      editPathButtonType: 'ghost', publishTime: '',
      publishLoading: false, isShowPreview: false, isEdit: false,
      lans: conf.lans, lan: '', feature: false
    };
  },
  mounted() {
    if (localStorage.eventEdit === 'edit') this.isEdit = true;
    this.initData();
    this.initTinymce();
  },
  activated() {
    if (localStorage.eventEdit === 'edit') {
      this.initData();
      this.isEdit = true;
    }
    this.initTinymce();
  },
  deactivated() {
    localStorage.eventContent = tinymce.activeEditor.getContent({format: 'raw'});
    if (tinymce.get('eventEditor')) tinymce.get('eventEditor').destroy();
  },
  methods: {
    closeEdit() {
      localStorage.eventEdit = '';
      this.isEdit = false
    },
    initData() {
      this.title = localStorage.eventTitle || '';
      this.author = this.artName || localStorage.eventAuthor || this.userN;
      this.eventIntro = localStorage.eventIntro || '';
      this.cover = localStorage.eventCover || '';
      this.lan = localStorage.eventLan || '';
      this.feature = localStorage.eventFeature === 'true' ?  true : false;
    },
    async handlePublish() {
      if (this.canPublish()) {
        const data = {
          title: this.title,
          intro: this.eventIntro,
          author: this.author,
          cover: this.cover,
          lan: this.lan,
          userName: this.userN,
          feature: this.feature,
          content: tinymce.activeEditor.getContent({format: 'raw'}),
        }
        this.publishLoading = true;
        const api = this.isEdit ? 'updateEvents' : 'addEvents';
        try {
          const res = await this.$store.dispatch(api, data)
          this.$Notice.success({
            title: '保存成功',
            desc: '活动《' + this.title + '》保存成功',
            duration: 3
          });
          this.publishLoading = false;
        } catch (e) { this.publishLoading = false }
      }
    },
    handleTitleBlur() {
      if (this.title.length !== 0) localStorage.eventTitle = this.title;
    },
    handleIntroBlur() { localStorage.eventIntro = this.eventIntro },
    handleAuthorBlur() { localStorage.eventAuthor = this.author },
    handleCoverBlur() { localStorage.eventCover = this.cover },
    handleFeature() { localStorage.eventFeature = this.feature },
    canPublish() {
      if (this.title.length === 0) {
        this.$Message.error('请输入标题');
        return false;
      } else if (this.lan === '') {
        this.$Message.error('请输选择语言');
        return false;
      } else return true;
    },
    handlePreview() {
      if (this.canPublish()) {
        this.$refs.preview.onShow();
        localStorage.eventlishTime = this.$U.fDate();
        localStorage.eventContent = tinymce.activeEditor.getContent({format: 'raw'});
        this.$nextTick(() => { this.$refs.preview.onPreview() })
      }
    },
    initTinymce() {
      if (tinymce.get('eventEditor')) tinymce.get('eventEditor').destroy();
      let vm = this;
      tinymce.init({
        selector: '#eventEditor',
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
            if (localStorage.eventContent) tinymce.get('eventEditor').setContent(localStorage.eventContent);
          });
          editor.on('keydown', function(e) {
            localStorage.eventContent = tinymce.activeEditor.getContent({format: 'raw'});
          });
        }
      });
    }
  }
};
</script>
