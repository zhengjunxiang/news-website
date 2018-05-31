<style lang="less">
@import '../../my-components/tinymce/plugins/codesample/css/prism.css';
</style>

<template>
  <Modal v-model="isShow" title="预览" width="800">
    <div class="preview-main render">
      <Row>
        <Col span="22" offset="1">
        <div>
          <Card>
            <h1>{{ articleTitle }}</h1>
            <p class="preview-publish-time">
              <Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ publishTime }}</p>
            <div class="preview-tags-con" style="overflow: hidden;">
              <b class="preview-tip"><Icon type="ios-pricetags-outline"></Icon>&nbsp;标签：</b>
              <Tag v-for="item in newTags" type="border" color="blue" :key="item">{{ item }}</Tag>
              <Tag v-if="feature" style="float: right;" color="blue">置顶</Tag>
            </div>
            <div class="preview-content-con" v-html="content"></div>
          </Card>
        </div>
        </Col>
      </Row>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'preview',
  data() {
    return {
      isShow: false,
      articleTitle: '',
      newTags: '',
      content: '',
      publishTime: '',
      feature: false
    };
  },
  methods: {
    onShow() {
      this.isShow = true;
    },
    onPreview() {
      this.articleTitle = localStorage.newTitle;
      this.newTags = localStorage.newTags ? JSON.parse(localStorage.newTags) : [];
      this.content = localStorage.newContent;
      this.publishTime = localStorage.publishTime;
      this.feature = localStorage.newFeature === 'true' ? true : false;
    }
  }
};
</script>
