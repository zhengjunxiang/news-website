<style lang="less">
@import 'upload.less';
</style>

<template>
<Card>
  <p slot="title">
    <Icon type="ios-analytics" /> 图片上传
  </p>
  <div style="overflow: hidden;">
    <Col span="6">
      <div style="margin-bottom: 10px; overflow: hidden;">
        <Button type="primary" @click="showMkdir" style="float: right;">创建文件夹</Button>
      </div>
      <Card style="text-align: center;">
        <Upload ref="upload" name="upimg" :on-error="handleError"
          :on-success="handleSuccess" :format="['jpg','jpeg','png', 'gif']"
          :before-upload="handleBeforeUpload" :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize" :max-size="2048" multiple
          :data="{inserDir}"
          type="drag" action='/resouce' style="display: inline-block; width: 100%;">
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
      <div class="bread-nav">
        <span>Path: </span>
        <span
          v-for="(p, ind) in inserDirName" :key="ind"
          :class="{link: ind !== inserDirName.length-1}"
          @click="handleBreadClick(p)" v-if="ind !== inserDirName.length-1">
          <i style="padding: 0 5px;">/</i> <span class="text">{{p}}</span>
        </span>
        <span v-else><i style="padding: 0 5px;">/</i>{{p}}</span>
      </div>
      <Card>
        <div class="height-460px">
          <div class="admin-upload-list" v-for="(item, index) in uploadedList" :key="index" v-if="isImgType(item.name)">
            <img :src="item.url" />
            <div class="admin-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.url)" />
              <Icon type="ios-trash-outline" @click.native="handleRemoveImg(item.name)" />
              <Icon class="copy-name" :aria-label="item.url" type="link" />
              <Icon type="ios-copy-outline" @click.native="handleRename(item.name)" />
            </div>
            <Tooltip :content="item.name" placement="bottom">
              <span class="copy-name" :aria-label="item.name">{{item.name}}</span>
            </Tooltip>
          </div>
          <div class="folder-box" v-else>
            <Icon type="ios-folder" @click.native="handleClickDir(item.url)" />
            <div class="upload-list-cover">
              <Icon type="ios-trash-outline" @click.native="handleRemoveDir(item.name)" />
              <Icon type="ios-copy-outline" @click.native="handleRename(item.name)" />
            </div>
            <Tooltip :content="item.name" placement="bottom">
              <span>{{item.name}}</span>
            </Tooltip>
          </div>
        </div>
      </Card>
    </Col>
  </div>
  <Modal v-model="isShowRename" :title='"重命名" + originName' @on-ok="handleRenameFun('dir')" @on-cancel="cancelRename">
    <Input v-model="rename" placeholder="rename" />
  </Modal>
  <Modal v-model="isShowDir" title='创建文件夹' @on-ok="handleMkdir" @on-cancel="cancelDir">
    <Input v-model="dirName" placeholder="mkdir" />
  </Modal>
</Card>
</template>

<script>
import ClipboardJS from 'clipboard';
export default {
  name: 'file-upload',
  data() {
    return {
      imgName: '', visible: false, getImgsTimer: null,
      uploadList: [], uploadedList: [], clipboardJS: null,
      originName: '', rename: '', isShowRename: false,
      dirName: '', isShowDir: false, inserDirName: ['resouce']
    };
  },
  computed: {
    inserDir() {
      return this.inserDirName.join('/').replace(/\/?resouce\/?/g, '')
    }
  },
  methods: {
    handleBreadClick(p) {
      let dir = [];
      this.inserDirName.forEach((b, index) => {
        if(b === p) {
          dir = this.inserDirName.slice(0, index + 1)
          this.inserDirName = dir
        }
      })
      this.$nextTick(() => this.handleClickDir(this.inserDirName.join('/'), false))
    },
    handleClickDir(url, flat) {
      const arr = url.split('/');
      if (arr.length > 1) if (flat !== false) this.inserDirName.push(arr[arr.length - 1]);
      this.handleGetResouce()
    },
    isImgType(name) {
      return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(name);
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemoveImg(name) {
      this.$Modal.confirm({
        title: '删除',
        content: `<h3>确定要删除 ${name} 吗？</h3>`,
        onOk: async () => {
          const n = this.inserDir ? `${this.inserDir}/${name}` : name;
          const res = await this.$store.dispatch('delImg', { name: n });
          if (res.mes) this.$Message.success(res.mes)
          this.handleGetResouce()
        }
      });
    },
    handleRemoveDir(name) {
      this.$Modal.confirm({
        title: '删除',
        content: `<h3>确定要删除 ${name} 吗？</h3>`,
        onOk: async () => {
          const n = this.inserDir ? `${this.inserDir}/${name}` : name;
          const res = await this.$store.dispatch('delDir', { name: n });
          if (res.mes) this.$Message.success(res.mes)
          this.handleGetResouce()
        }
      });
    },
    handleSuccess(res, file, fileList) {
      clearTimeout(this.getImgsTimer);
      this.getImgsTimer = setTimeout(() => {
        this.handleGetResouce()
      }, 300)
    },
    async handleGetResouce() {
      const re = await this.$store.dispatch('getImgs', {path: this.inserDir})
      if (re.mes) this.$Message.success(re.mes)
      re.data.map((d, ind) => {
        if(!this.isImgType(d.name)) {
          re.data.unshift(re.data.splice(ind, 1)[0])
        }
      })
      this.uploadedList = re.data
    },
    showMkdir() {
      this.isShowDir = true;
    },
    cancelDir() {
      this.dirName = '';
      this.isShowDir = false
    },
    async handleMkdir() {
      if (!this.dirName) return;
      const dirName = `${this.inserDirName.join('/')}/${this.dirName}`.replace(/\/?resouce\/?/g, '')
      const res = await this.$store.dispatch('mkdir', {dirName})
      if (res.mes) this.$Message.success(res.mes)
      this.cancelDir()
      this.handleGetResouce()
    },
    handleRename(name) {
      this.isShowRename = true;
      this.originName = name;
    },
    async handleRenameFun(type) {
      let newname = this.rename;
      if (!newname) return;
      if (this.isImgType(this.originName)) {
        const arr = this.originName.split('.');
        newname += `.${arr[arr.length - 1]}`
      }
      const res = await this.$store.dispatch('rename', {origin: this.originName, newname})
      if(res.mes) this.$Message.success(res.mes)
      this.handleGetResouce()
      this.cancelRename()
    },
    cancelRename() {
      this.isShowRename = false;
      this.originName = '';
      this.rename = '';
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
    this.handleGetResouce();
    this.clipboardJS = new ClipboardJS('.copy-name', {
      text: trigger => trigger.getAttribute('aria-label')
    })
    this.clipboardJS.on('success', (e) => {
      this.$Message.success(`复制 ${e.text} 成功`)
      e.clearSelection();
    });
  },
  destroyed() {
    this.clipboardJS.destroy();
  }
};
</script>
