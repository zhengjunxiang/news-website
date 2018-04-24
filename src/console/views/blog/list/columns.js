export default that => [
  {
    title: '标题',
    key: 'title',
    width: 160,
    fixed: 'left'
  }, {
    title: '标签',
    key: 'tags',
    render: (h, params) => {
      const tags = params.row.tags;
      return h('div', tags.map(tag => {
        return h('Tag', {
          props: {
            type: 'border'
          }
        }, tag)
      }));
    }
  }, {
    title: '作者',
    key: 'author'
  }, {
    title: '创建时间',
    key: 'createAt',
    render: (h, params) => {
      return h('div', that.formatDate(that.tableData[params.index].createAt));
    }
  }, {
    title: '更新时间',
    key: 'updateAt',
    render: (h, params) => {
      return h('div', that.formatDate(that.tableData[params.index].updateAt));
    }
  }, {
    title: '操作',
    width: '160',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: { type: 'error' },
          style: { marginRight: '5px' },
          on: {
            click: () => {
              const {title, tags} = params.row;
              that.$Modal.confirm({
                content: `<p>确定删除博客：${title} 吗？`,
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                  const res = await that.$store.dispatch('delBlogs', {title, tags})
                  if (res.mes) that.$Message.success(res.mes)
                  that.initData()
                }
              });
            }
          }
        }, '删除'),
        h('Button', {
          props: { type: 'primary' },
          on: {
            click: async () => {
              const {title} = params.row;
              const res = await that.$store.dispatch('getBlogs', {title})
              that.editBlog(res.data[0])
              if (res.mes) that.$Message.success(res.mes)
            }
          }
        }, '编辑')
      ])
    }
  }
]
