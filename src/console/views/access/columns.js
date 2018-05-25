export default (that) => [
  {
    title: '用户名',
    key: 'name'
  }, {
    title: '姓名',
    key: 'userName'
  }, {
    title: '艺名',
    key: 'artName'
  }, {
    title: '部门',
    key: 'department'
  }, {
    title: '创建时间',
    sortable: true,
    key: 'createAt',
    render: (h, params) => {
      return h('div', that.$U.fDate(that.userData[params.index].createAt));
    }
  }, {
    title: '操作',
    render: (h, params) => {
      return that.accessCode === 0 ? h('div', [
        h('Button', {
          props: { type: 'error', size: 'small', icon: 'trash-a' },
          on: {
            click: () => {
              const {name} = params.row;
              that.$Modal.confirm({
                content: `<h3>确定删除用户：${name} 吗？</h3>`,
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                  const res = await that.$store.dispatch('delUser', {name})
                  if (res.mes) that.$Message.success(res.mes)
                  that.getUser()
                }
              });
            }
          }
        }),
        h('Button', {
          props: { size: 'small', icon: 'eye' },
          style: 'margin: 0 5px;',
          on: {
            click: () => (that.checkUser = params.row.name)
          }
        })
      ]) : h()
    }
  }
]
