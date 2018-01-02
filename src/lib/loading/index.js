import pkuLoading from './loading.vue'

/* istanbul ignore next */
pkuLoading.install = function(Vue) {
  Vue.component(pkuLoading.name, pkuLoading);
};

export default pkuLoading
