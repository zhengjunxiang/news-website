<style lang="less">
@import './preview.less';
</style>

<template>
  <Modal v-model="isShow" title="博客预览" width="800">
    <div class="preview-main">
      <Row>
        <Col span="22" offset="1">
        <div>
          <Card>
            <p class="preview-publish-time">
              <Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ publishTime }}</p>
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
      content: '',
      publishTime: ''
    };
  },
  methods: {
    onShow() {
      this.isShow = true;
    },
    onPreview() {
      this.content = localStorage.aboutUsContent;
      this.publishTime = localStorage.aboutUsPublishTime;
    }
  }
};
</script>
