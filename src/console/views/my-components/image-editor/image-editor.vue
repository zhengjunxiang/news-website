<style lang="less">
@import '../../../styles/common.less';
@import './image-editor.less';
</style>

<template>
<div class="image-editor">
  <Row>
    <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="android-options" />获取图片数据
        </p>
        <Row :gutter="10">
          <Col span="11" class="image-editor-con">
            <div class="cropper" style="height: 320px;">
              <img id="cropimg" :src="option.cropedImg" alt="">
            </div>
          </Col>
          <Col span="5" class="image-editor-con">
            <p><b>x:</b>{{ cropdata.x }}</p>
            <p><b>y:</b>{{ cropdata.y }}</p>
            <p><b>width:</b>{{ cropdata.w }}</p>
            <p><b>heigh:</b>{{ cropdata.h }}</p>
            <p><b>deg:</b>{{ cropdata.deg }}</p>
            <p><b>scaleX:</b>{{ cropdata.scaleX }}</p>
            <p><b>scaleY:</b>{{ cropdata.scaleY }}</p>
            <Modal v-model="option.showCropedImage">
              <p slot="header">预览裁剪之后的图片</p>
              <img :src="option.cropedImg" alt="" v-if="option.showCropedImage" style="width: 100%;">
            </Modal>
          </Col>
          <Col span="8" class="image-editor-con">
            <Row type="flex" justify="center" align="middle" class="image-editor-con-preview-con">
              <div id="preview"></div>
            </Row>
            <div class="margin-top-10" style="text-align: center;">
              <div style="margin-bottom: 6px;">
                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange" id="fileinput" class="fileinput" />
                <label class="filelabel" for="fileinput"><Icon type="image"></Icon>&nbsp;选择图片</label>
                <span><Button @click="handlecrop" type="primary" icon="crop">裁剪</Button></span>
              </div>
              <ButtonGroup>
                <Button @click="cropper.rotate(-90)" type="primary"><Icon :size="14" type="arrow-return-left"></Icon></Button>
                <Button @click="cropper.rotate(90)" type="primary"><Icon :size="14" type="arrow-return-right"></Icon></Button>
                <Button @click="cropper.zoom(0.1)" type="primary"><Icon :size="14" type="plus-round"></Icon></Button>
                <Button @click="cropper.zoom(-0.1)" type="primary"><Icon :size="14" type="minus-round"></Icon></Button>
                <Button @click="cropper.scaleX(-cropper.getData().scaleX)" type="primary"><Icon :size="14" type="android-more-horizontal"></Icon></Button>
                <Button @click="cropper.scaleY(-cropper.getData().scaleY)" type="primary"><Icon :size="14" type="android-more-vertical"></Icon></Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</div>
</template>

<script>
import Cropper from 'cropperjs';
import './cropper.min.css';
export default {
  name: 'image-editor',
  data() {
    return {
      cropper: {},
      option: {
        showCropedImage: false,
        cropedImg: ''
      },
      cropdata: {
        x: '',
        y: '',
        w: '',
        h: '',
        deg: '',
        scaleX: '',
        scaleY: ''
      }
    };
  },
  methods: {
    handleChange(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        this.cropper.replace(reader.result);
        reader.onload = null;
      };
      reader.readAsDataURL(file);
    },
    handlecrop() {
      let file = this.cropper.getCroppedCanvas().toDataURL();
      this.option.cropedImg = file;
      this.option.showCropedImage = true;
    }
  },
  mounted() {
    let img2 = document.getElementById('cropimg');
    this.cropper = new Cropper(img2, {
      dragMode: 'move',
      preview: '#preview',
      restore: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      toggleDragModeOnDblclick: false
    });
    img2.addEventListener('crop', (e) => {
      this.cropdata.x = parseInt(e.detail.x);
      this.cropdata.y = parseInt(e.detail.y);
      this.cropdata.w = parseInt(e.detail.width);
      this.cropdata.h = parseInt(e.detail.height);
      this.cropdata.deg = parseInt(e.detail.rotate);
      this.cropdata.scaleX = parseInt(e.detail.scaleX);
      this.cropdata.scaleY = parseInt(e.detail.scaleY);
    });
  }
};
</script>
