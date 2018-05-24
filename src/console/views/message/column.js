export default (that) => {
  const markAsreadBtn = (h, params) => {
    return h('Button', {
      props: {
        size: 'small'
      },
      on: {
        click: async () => {
          const res = await that.$store.dispatch('readMes', {name: that.userN, _id: params.row._id})
          if (res.mes) this.$Message.success(res.mes)
          that.hasreadMesList.unshift(that.currentMesList.splice(params.index, 1)[0]);
          that.$store.commit('setMessageCount', that.unreadMesList.length);
        }
      }
    }, '标为已读');
  };
  const deleteMesBtn = (h, params) => {
    return h('Button', {
      props: {
        size: 'small',
        type: 'error'
      },
      on: {
        click: async () => {
          const res = await that.$store.dispatch('binMes', {name: that.userN, _id: params.row._id})
          if (res.mes) this.$Message.success(res.mes)
          that.recyclebinList.unshift(that.hasreadMesList.splice(params.index, 1)[0]);
        }
      }
    }, '删除');
  };
  const restoreBtn = (h, params) => {
    return h('Button', {
      props: {
        size: 'small'
      },
      on: {
        click: async () => {
          const res = await that.$store.dispatch('resetMes', {name: that.userN, _id: params.row._id})
          if (res.mes) this.$Message.success(res.mes)
          that.hasreadMesList.unshift(that.recyclebinList.splice(params.index, 1)[0]);
        }
      }
    }, '还原');
  };
  return [
    {
      title: ' ',
      key: 'mes',
      align: 'left',
      ellipsis: true
    },
    {
      title: ' ',
      align: 'center',
      width: 180,
      render: (h, params) => {
        return h('span', [
          h('Icon', {
            props: {
              type: 'android-time',
              size: 12
            },
            style: {
              margin: '0 5px'
            }
          }),
          h('span', {
            props: {
              type: 'android-time',
              size: 12
            }
          }, that.$U.fDate(params.row.createAt))
        ]);
      }
    },
    {
      title: ' ',
      align: 'center',
      width: 100,
      render: (h, params) => {
        if (that.currentMessageType === 'unread') {
          return h('div', [
            markAsreadBtn(h, params)
          ]);
        } else if (that.currentMessageType === 'hasread') {
          return h('div', [
            deleteMesBtn(h, params)
          ]);
        } else {
          return h('div', [
            restoreBtn(h, params)
          ]);
        }
      }
    }
  ]
}
