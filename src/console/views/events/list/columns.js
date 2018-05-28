export default that => [
  {
    title: '标题',
    key: 'title',
    width: 160,
    fixed: 'left'
  }, {
    title: '作者',
    key: 'author'
  }, {
    title: '语言',
    key: 'lan'
  }, {
    title: '创建时间',
    key: 'createAt',
    render: (h, params) => {
      return h('div', that.$U.fDate(that.tableData[params.index].createAt));
    }
  }, {
    title: '更新时间',
    key: 'updateAt',
    render: (h, params) => {
      return h('div', that.$U.fDate(that.tableData[params.index].updateAt));
    }
  }, {
    title: '操作',
    width: '160',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: { type: 'error', size: 'small' },
          style: { marginRight: '5px' },
          on: {
            click: () => {
              const {title} = params.row;
              that.$Modal.confirm({
                content: `<p>确定删除：${title} 吗？`,
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                  const res = await that.$store.dispatch('delEvents', {title})
                  if (res.mes) that.$Message.success(res.mes)
                  that.initData()
                }
              });
            }
          }
        }, '删除'),
        h('Button', {
          props: { type: 'primary', size: 'small' },
          on: {
            click: async () => {
              const {title} = params.row;
              const res = await that.$store.dispatch('getEvents', {title})
              that.edit(res.data)
              if (res.mes) that.$Message.success(res.mes)
            }
          }
        }, '编辑')
      ])
    }
  }
]
