import pkuTable from './table.vue'

/* istanbul ignore next */
pkuTable.install = function(Vue) {
  Vue.component(pkuTable.name, pkuTable);
};

export default pkuTable
