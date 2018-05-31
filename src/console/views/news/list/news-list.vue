<style lang="less">
.table-con {
  position: relative;
  .refresh-box .ivu-icon {
    position: absolute; right: 20px; z-index: 99; top: 12px; color: #2d8cf0;
    cursor: pointer;
  }
  .page-box {
    margin-top: 10px;
    overflow: hidden;
    text-align: center;
    .ivu-page {
      display: inline-block;
    }
  }
}
</style>

<template>
  <Card>
    <p slot="title">新闻列表</p>
    <Row>
      <Col :span="7">
        <div class="margin-bottom-10">
          <Input v-model="imageName" icon="document" placeholder="请输入图片名" style="width: 190px" />
          <Button type="primary" @click="exportImage">导出为图片</Button>
          <div style="display: none"><img id="exportedImage" /></div>
        </div>
        <Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
        <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
        <Button type="primary" @click="exportExcel">表格数据</Button>
      </Col>
      <Col :span="6">
        <Button type="primary" @click="exportData(1)"><Icon type="ios-download-outline" /> 原始数据</Button>
        <Button type="primary" @click="exportData(2)"><Icon type="ios-download-outline" /> 排序后数据</Button>
      </Col>
      <Col :span="11">
        <div>
          <span>选取行范围：&nbsp;</span>
          <InputNumber :min="1" :max="selectMaxRow" v-model="selectMinRow" />
          <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <InputNumber :min="selectMinRow" :max="rowNum" v-model="selectMaxRow" />
        </div>
        <div class="margin-top-10">
          <span>选取列范围：&nbsp;</span>
          <InputNumber :min="1" :max="selectMaxCol" v-model="selectMinCol" />
          <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <InputNumber :min="selectMinCol" :max="colNum" v-model="selectMaxCol" />
        </div>
        <div class="margin-top-10 margin-bottom-10">
          <Input v-model="csvFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
          <Button type="primary" @click="exportData(3)"><Icon type="ios-download-outline" /> 自定义数据</Button>
        </div>
      </Col>
      <Col span="24" class="table-con">
        <div class="search-box margin-bottom-10">
          <Input v-model="search" icon="search" placeholder="Search..." style="width: 300px"></Input>
        </div>
        <span @click="refreshTable" class="refresh-box"><Icon type="refresh" /></span>
        <Table size='small' :data="currentData" :columns="columns" stripe ref="table" :loading="loading" />
        <div class="page-box">
          <Page :total="tableData.length" show-total @on-change="onPageChange" :current="curPage" :page-size="pageSize"  />
        </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
import html2canvas from 'html2canvas';
import table2excel from '@/libs/table2excel.js';
import columns from './columns.js';
export default {
  name: 'news-list',
  data() {
    return {
      rowNum: 1, colNum: 1, selectMinRow: 1, selectMaxRow: 1, selectMinCol: 1,
      selectMaxCol: 1, csvFileName: '', excelFileName: '', tableData: [],
      imageName: '', columns: columns(this), loading: false, pageSize: 10, curPage: 1,
      search: ''
    };
  },
  mounted() { this.initData() },
  computed: {
    currentData() {
      const search = this.search.trim()
      const tabData = this.tableData.slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize) || [];
      return tabData.filter(n => {
        if (search) {
          return new RegExp(search, 'gi').test(n.title) ||
            new RegExp(search, 'gi').test(n.author) ||
            new RegExp(search, 'gi').test(n.userName) ||
            n.tags.some(it => new RegExp(search, 'gi').test(it))
        }
        return true
      })
    }
  },
  methods: {
    onPageChange(page) {
      this.curPage = page
    },
    refreshTable() {
      this.initData()
    },
    exportData(type) {
      if (type === 1) this.$refs.table.exportCsv({ filename: '原始数据' })
      else if (type === 2) this.$refs.table.exportCsv({ filename: '排序和过滤后的数据', original: false })
      else if (type === 3) {
        this.$refs.table.exportCsv({
          filename: this.csvFileName,
          columns: this.columns.filter((col, index) => index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1),
          data: this.currentData.filter((data, index) => index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1)
        });
      }
    },
    exportExcel() { table2excel.transform(this.$refs.table, 'hrefToExportTable', this.excelFileName) },
    async initData() {
      this.loading = true;
      this.colNum = this.selectMaxCol = this.columns.length;
      try {
        const res = await this.$store.dispatch('getNews');
        this.total = res.data.length;
        this.tableData = res.data;
        this.rowNum = this.selectMaxRow = res.data.slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize).length;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    exportImage() {
      let vm = this;
      let table = this.$refs.table.$el;
      /* 这部分代码用来解决生成的图片不清晰的问题 */
      let tableWidth = table.offsetWidth;
      let tableHeight = table.offsetHeight;
      let canvas = document.createElement('canvas');
      canvas.width = tableWidth * 2;
      canvas.height = tableHeight * 2;
      canvas.style.width = tableWidth + 'px';
      canvas.style.height = tableHeight + 'px';
      document.body.appendChild(canvas);
      var context = canvas.getContext('2d');
      context.scale(2, 2);
      /* 这部分代码用来解决生成的图片不清晰的问题 */
      html2canvas(table, {
        // canvas: canvas,
        onrendered(image) {
          var url = image.toDataURL();
          document.getElementById('exportedImage').src = url;
          let a = document.createElement('a');
          a.href = url;
          a.download = vm.imageName ? vm.imageName : '未命名';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // document.body.removeChild(canvas);
        }
      });
    },
    editNew(data) {
      if (data) {
        localStorage.newIntro = data.intro;
        localStorage.newTitle = data.title;
        localStorage.newContent = data.content;
        localStorage.newCover = data.cover;
        localStorage.newAuthor = data.author
        localStorage.newTags = JSON.stringify(data.tags);
        localStorage.newEdit = 'edit'
        localStorage.newLan = data.lan
        localStorage.newFeature = data.feature
        this.$router.push({name: 'new-publish'})
      }
    }
  }
};
</script>
