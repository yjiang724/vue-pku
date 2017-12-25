import pkuPagination from './pagination.vue'

/* istanbul ignore next */
pkuPagination.install = function(Vue) {
  Vue.component(pkuPagination.name, pkuPagination);
};

export default pkuPagination
