export default (that, code) => [
  {
    title: '用户名',
    key: 'name'
  }, {
    title: '权限',
    key: 'access'
  }, {
    title: '创建时间',
    key: 'createAt',
    render: (h, params) => {
      return h('div', that.formatDate(that.userData[params.index].createAt));
    }
  }, {
    title: '操作',
    render: (h, params) => {
      return code === 0 ? h('Button', {
        props: { type: 'error' },
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
      }, '删除') : h()
    }
  }
]
