<style lang="less">
@import '../../../styles/common.less';
@import 'upload.less';
</style>

<template>
<div class="margin-top-10 padding-left-10">
  <Card>
    <p slot="title">
      <Icon type="ios-analytics" /> 图片上传
    </p>
    <div class="height-492px">
      <Col span="6">
      <Card style="text-align: center;">
        <Upload ref="upload" name="upimg" :on-error="handleError"
          :on-success="handleSuccess" :format="['jpg','jpeg','png', 'gif']" :before-upload="handleBeforeUpload"
          :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :max-size="2048"
          multiple type="drag" action="/resouce" style="display: inline-block; width: 100%;">
          <div style="width: 100%;height:58px;line-height: 68px;">
            <Icon type="ios-cloud-upload" size="28" style="color: #3399ff" />
          </div>
        </Upload>
        <Modal title="查看图片" v-model="visible">
          <img :src="imgName" v-if="visible" style="width: 100%">
          <div slot="footer"></div>
        </Modal>
        <span style="color: #666;">点击或拖拽到虚线框</span>
      </Card>
      </Col>
      <Col span="18" class="padding-left-10">
      <Card>
        <div class="height-460px">
          <div class="admin-upload-list" v-for="(item, index) in uploadedList" :key="index">
            <template>
              <img :src="item.url" />
              <div class="admin-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)" />
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)" />
              </div>
            </template>
          </div>
        </div>
      </Card>
      </Col>
    </div>
  </Card>
</div>
</template>

<script>
export default {
  name: 'file-upload',
  data() {
    return {
      imgName: '',
      visible: false,
      getImgsTimer: null,
      uploadList: [],
      uploadedList: []
    };
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file, fileList) {
      clearTimeout(this.getImgsTimer);
      this.getImgsTimer = setTimeout(() => {
        this.handleGetImgs()
      }, 300)
    },
    async handleGetImgs() {
      const re = await this.$store.dispatch('getImgs')
      if (re.mes) this.Message.success(re.mes)
      this.uploadedList = re.data
    },
    handleError(error, file, fileList) {
      this.$Notice.warning({
        title: '文件上传失败',
        desc: '文件 ' + fileList.name || '' + ' 上传失败'
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: '一次最多只能上传 5 张图片。',
          desc: '请删除缓存文件'
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.handleGetImgs();
  }
};
</script>
