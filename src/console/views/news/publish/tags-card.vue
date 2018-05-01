<template>
  <Card>
    <p slot="title"><Icon type="ios-pricetags-outline" /> 标签</p>
    <Row>
      <Col span="18">
        <Select v-model="newTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择文章标签">
          <Option v-for="item in newTagList" :value="item.value" :key="item.value">{{ item.value }}</Option>
        </Select>
      </Col>
      <Col span="18" class="margin-top-10">
        <Button v-show="isDoing" @click="handleAddNewTag" type="ghost">新建</Button>
        <Button v-show="isDoing" type="dashed" @click="handleDelClick">删除</Button>
      </Col>
    </Row>
    <transition name="add-new-tag">
      <div>
        <div v-show="delingTag" class="add-new-tag-con">
          <div>
            <Tag closable v-for="(tag, ind) in editTagList" :key="ind" :name="tag.value" @on-close="handleEditTagClick">{{ tag.value }}</Tag>
          </div>
          <div class="margin-top-10">
            <p v-show="delTagList.length">要删除的标签</p>
            <Tag closable color="red" v-for="(tag, ind) in delTagList" :key="ind" :name="tag.value" @on-close="handleDelTagClick">{{ tag.value }}</Tag>
          </div>
          <Col span="18" class="tag-btns">
            <Button @click="cancelDelTag" type="ghost" style="margin-left: 5px;">取消</Button>
            <Button @click="delTag" type="primary">确定</Button>
          </Col>
        </div>
        <div v-show="addingNewTag" class="add-new-tag-con">
          <Col span="18">
            <Input v-model="newTagName" placeholder="请输入标签名" />
          </Col>
          <Col span="18" class="tag-btns">
            <Button @click="cancelCreateNewTag" type="ghost" style="margin-left: 5px;">取消</Button>
            <Button @click="createNewTag" type="primary">确定</Button>
          </Col>
        </div>
      </div>
    </transition>
  </Card>
</template>
<script>
export default {
  name: "tags-card",
  data: () => ({
    newTagSelected: [], // 文章选中的标签
    addingNewTag: false, // 添加新标签
    delingTag: false, // 添加新标签
    newTagList: [], // 所有标签列表
    editTagList: [], // 正处于编辑的标签列表
    delTagList: [], // 要删除的标签列表
    newTagName: '', // 新建标签名
    delTags: [] // 要删除的标签
  }),
  mounted() {
    this.initNewTagList()
  },
  activated() {
    this.initNewTagList();
  },
  computed: {
    isDoing: function () {
      return !this.addingNewTag && !this.delingTag
    }
  },
  methods: {
    async initNewTagList() {
      const res = await this.$store.dispatch('getTags');
      if (localStorage.newTags) this.newTagSelected = JSON.parse(localStorage.newTags)
      if(res.mes) this.$Message.success(res.mes)
      this.newTagList = [...res.data];
    },
    async createNewTag() {
      if (this.newTagName.length !== 0) {
        const data = { value: this.newTagName };
        const res = await this.$store.dispatch('addTags', data);
        if (res.mes) this.$Message.success(res.mes);
        this.initNewTagList();
        this.addingNewTag = false;
        this.newTagName = ''
      } else this.$Message.error('请输入标签名');
    },
    async delTag() {
      if (this.delTagList.length) {
        const res = await this.$store.dispatch('delTags', {tags: this.delTagList.map(item => item.value)})
        if (res.mes) this.$Message.success(res.mes)
        this.cancelDelTag()
        this.initNewTagList()
      } else this.$Message.info('请选择要删除的标签')
    },
    handleDelClick() {
      this.editTagList = [...this.newTagList]
      this.delingTag = !this.delingTag
    },
    handleEditTagClick(evn, name) {
      this.editTagList.map((tag, index) => {
        if (name === tag.value) {
          this.editTagList.splice(index, 1)
          this.delTagList.push(tag)
        }
      })
    },
    handleDelTagClick(evn, name) {
      this.delTagList.map((tag, index) => {
        if (name === tag.value) {
          this.delTagList.splice(index, 1)
          this.editTagList.push(tag)
        }
      })
    },
    onReturnTags() {
      return this.newTagSelected;
    },
    handleAddNewTag() { this.addingNewTag = !this.addingNewTag },
    cancelDelTag() {
      this.delingTag = false;
      this.editTagList = []
      this.delTagList = []
    },
    cancelCreateNewTag() {
      this.newTagName = '';
      this.addingNewTag = false;
    },
    handleSelectTag() {
      localStorage.newTags = JSON.stringify(this.newTagSelected); // 本地存储文章标签列表
    }
  }
}
</script>
