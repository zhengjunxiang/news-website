export default that => [
  {
    title: '标题',
    key: 'title',
    sortable: true,
    fixed: 'left'
  }, {
    title: '作者',
    width: '130px',
    sortable: true,
    key: 'author'
  }, {
    title: '用户',
    width: '110px',
    sortable: true,
    key: 'userName'
  }, {
    title: '语言',
    sortable: true,
    width: '110px',
    key: 'lan',
    filters: [ { label: 'zh', value: 'zh' }, { label: 'en', value: 'en' } ],
    filterMultiple: false,
    filterMethod: (value, row) => row.lan === value
  }, {
    title: '创建时间',
    sortable: true,
    key: 'createAt',
    render: (h, params) => {
      return h('div', that.$U.fDate(that.tableData[params.index].createAt));
    }
  }, {
    title: '更新时间',
    sortable: true,
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
              const {_id} = params.row;
              const res = await that.$store.dispatch('getEvents', {id: _id})
              that.edit(res.data)
              if (res.mes) that.$Message.success(res.mes)
            }
          }
        }, '编辑')
      ])
    }
  }
]
