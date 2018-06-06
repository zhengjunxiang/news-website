export default that => [
  {
    title: '名字',
    key: 'name',
    sortable: true,
    width: 120,
    fixed: 'left'
  }, {
    title: '邮箱',
    width: 190,
    key: 'mail'
  }, {
    title: '行业',
    width: 110,
    sortable: true,
    key: 'industry'
  }, {
    title: '国家',
    sortable: true,
    width: 110,
    key: 'country'
  }, {
    title: '城市',
    width: 110,
    key: 'city'
  }, {
    title: '意向',
    width: 220,
    key: 'interest'
  }, {
    title: '留言',
    width: 300,
    key: 'message'
  }, {
    title: '处理',
    sortable: true,
    width: 110,
    key: 'isDeal',
    filters: [ { label: 'false', value: false }, { label: 'true', value: true } ],
    filterMultiple: false,
    filterMethod: (value, row) => row.isDeal === value,
    render: (h, params) => {
      const {_id, name, isDeal} = params.row;
      if (isDeal) { return h('span', isDeal) }
      return h('Button', {
        props: {
          type: 'error',
          size: 'small'
        },
        on: {
          click: () => {
            that.$Modal.confirm({
              content: `<p>确定设置：${name} 为已经处理吗？`,
              okText: '确定',
              cancelText: '取消',
              onOk: async () => {
                const res = await that.$store.dispatch('updateContact', {id: _id, type: 'deal'})
                if (res.mes) that.$Message.success(res.mes)
                that.refreshTable()
              }
            });
          }
        }
      }, isDeal)
    }
  }, {
    title: '创建时间',
    sortable: true,
    width: 160,
    key: 'createAt',
    render: (h, params) => {
      return h('div', that.$U.fDate(that.tableData[params.index].createAt));
    }
  }, {
    title: '操作',
    width: 110,
    render: (h, params) => {
      return h('Button', {
        props: {
          type: 'error',
          size: 'small'
        },
        on: {
          click: () => {
            const {_id, name} = params.row;
            that.$Modal.confirm({
              content: `<p>确定删除：${name} 吗？`,
              okText: '确定',
              cancelText: '取消',
              onOk: async () => {
                const res = await that.$store.dispatch('delContact', {id: _id})
                if (res.mes) that.$Message.success(res.mes)
                that.refreshTable()
              }
            });
          }
        }
      }, '删除')
    }
  }
]
