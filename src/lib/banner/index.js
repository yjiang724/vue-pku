import pkuBanner from './banner.vue'

/* istanbul ignore next */
pkuBanner.install = function(Vue) {
  Vue.component(pkuBanner.name, pkuBanner);
};

export default pkuBanner
