import pkuHeader from './header.vue'

/* istanbul ignore next */
pkuHeader.install = function(Vue) {
  Vue.component(pkuHeader.name, pkuHeader);
};

export default pkuHeader
