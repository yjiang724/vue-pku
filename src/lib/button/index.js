import pkuButton from './button.vue'

/* istanbul ignore next */
pkuButton.install = function(Vue) {
  Vue.component(pkuButton.name, pkuButton);
};

export default pkuButton
