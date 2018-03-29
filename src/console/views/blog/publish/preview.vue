<style lang="less">
@import '../../../styles/common.less';
@import './preview.less';
</style>

<template>
  <Modal v-model="isShow" title="博客预览" width="800">
    <div class="preview-main">
      <Row>
        <Col span="22" offset="1">
        <div>
          <Card>
            <h1>{{ articleTitle }}</h1>
            <p class="preview-publish-time">
              <Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ publishTime }}</p>
            <div class="preview-tags-con">
              <b class="preview-tip"><Icon type="ios-pricetags-outline"></Icon>&nbsp;标签：</b>
              <Tag v-for="item in tagsList" type="border" color="blue" :key="item">{{ item }}</Tag>
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
      tagsList: '',
      classificationSelected: [],
      content: '',
      publishTime: ''
    };
  },
  methods: {
    onShow() {
      this.isShow = true;
      console.log('isShow', this.isShow)
    },
    onPreview() {
      this.articleTitle = localStorage.articleTitle;
      this.tagsList = localStorage.tagsList ? JSON.parse(localStorage.tagsList) : [];
      this.content = localStorage.content;
      this.publishTime = localStorage.publishTime;
    }
  }
};
</script>
