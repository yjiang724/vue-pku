import pkuBreadcrumb from './breadcrumb.vue'

/* istanbul ignore next */
pkuBreadcrumb.install = function(Vue) {
  Vue.component(pkuBreadcrumb.name, pkuBreadcrumb);
};

export default pkuBreadcrumb
