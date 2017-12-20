import pkuHeadbar from './headbar.vue'

/* istanbul ignore next */
pkuHeadbar.install = function(Vue) {
  Vue.component(pkuHeadbar.name, pkuHeadbar);
};

export default pkuHeadbar
