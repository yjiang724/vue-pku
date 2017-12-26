import pkuDialog from './dialog.vue'

/* istanbul ignore next */
pkuDialog.install = function(Vue) {
  Vue.component(pkuDialog.name, pkuDialog);
};

export default pkuDialog
