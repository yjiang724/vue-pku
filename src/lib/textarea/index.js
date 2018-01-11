import pkuTextarea from './textarea.vue'

/* istanbul ignore next */
pkuTextarea.install = function(Vue) {
  Vue.component(pkuTextarea.name, pkuTextarea);
};

export default pkuTextarea
