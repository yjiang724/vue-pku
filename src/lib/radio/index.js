import pkuRadio from './radio.vue'

/* istanbul ignore next */
pkuRadio.install = function(Vue) {
  Vue.component(pkuRadio.name, pkuRadio);
};

export default pkuRadio
