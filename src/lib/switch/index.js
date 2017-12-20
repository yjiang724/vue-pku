import pkuSwitch from './switch.vue'

/* istanbul ignore next */
pkuSwitch.install = function(Vue) {
  Vue.component(pkuSwitch.name, pkuSwitch);
};

export default pkuSwitch
