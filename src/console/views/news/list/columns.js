export default that => [
  {
    title: '标题',
    key: 'title',
    sortable: true,
    fixed: 'left',
    width: 200
  }, {
    title: '标签',
    key: 'tags',
    width: 160
  }, {
    title: '作者',
    sortable: true,
    width: 130,
    key: 'author'
  }, {
    title: '用户',
    sortable: true,
    width: 110,
    key: 'userName'
  }, {
    title: '语言',
    sortable: true,
    width: 110,
    key: 'lan',
    filters: [ { label: 'zh', value: 'zh' }, { label: 'en', value: 'en' } ],
    filterMultiple: false,
    filterMethod: (value, row) => row.lan === value
  }, {
    title: '浏览',
    sortable: true,
    key: 'view',
    width: 90
  }, {
    title: '创建时间',
    sortable: true,
    key: 'createAt',
    width: 160,
    render: (h, params) => {
      return h('div', that.$U.fDate(that.tableData[params.index].createAt));
    }
  }, {
    title: '更新时间',
    sortable: true,
    key: 'updateAt',
    width: 160,
    render: (h, params) => {
      return h('div', that.$U.fDate(that.tableData[params.index].updateAt));
    }
  }, {
    title: '操作',
    width: 160,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              const {title} = params.row;
              that.$Modal.confirm({
                content: `<p>确定删除：${title} 吗？`,
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                  const res = await that.$store.dispatch('delNews', {title})
                  if (res.mes) that.$Message.success(res.mes)
                  that.initData()
                }
              });
            }
          }
        }, '删除'),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          on: {
            click: async () => {
              const {_id} = params.row;
              const res = await that.$store.dispatch('getNews', {id: _id})
              that.editNew(res.data)
              if (res.mes) that.$Message.success(res.mes)
            }
          }
        }, '编辑')
      ])
    }
  }
]
