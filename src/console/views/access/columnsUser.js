export default (that) => [
  {
    title: '操作',
    key: 'mes'
  }, {
    title: '查阅',
    key: 'isReaded'
  }, {
    title: '删除',
    key: 'isRemove'
  }, {
    title: '时间',
    key: 'createAt',
    sortable: true,
    render: (h, params) => {
      return h('div', [
        h('Icon', {
          props: { type: 'android-time', size: 12 },
          style: { margin: '0 5px' }
        }),
        h('span', that.$U.fDate(that.userData[params.index].createAt))
      ]);
    }
  }
]
