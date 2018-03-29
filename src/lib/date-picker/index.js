import pkuDatePicker from './date-picker';

/* istanbul ignore next */
pkuDatePicker.install = function(Vue) {
  Vue.component(pkuDatePicker.name, pkuDatePicker);
}

export default pkuDatePicker
