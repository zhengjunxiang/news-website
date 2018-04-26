import alert from './alert.vue';

export default {
  install: Vue => {
    const AlertConstructor = Vue.extend(alert),
      type = ['error', 'warn', 'info', 'success'],
      fn = (options, type) => {
        let propsData = {};
        if (type) propsData.type = type;
        if (typeof options === 'string') propsData.mes = options;
        else propsData = Object.assign(propsData, options);
        const alertInstance = new AlertConstructor({
          el: document.createElement('div'), propsData
        });
        document.body.appendChild(alertInstance.$el);
        alertInstance.show();
        return alertInstance;
      }
    let Alert = fn;
    type.map(ty => (Alert[ty] = options => fn(options, ty)))
    Vue.prototype.$Alert = Alert;
  }
};
