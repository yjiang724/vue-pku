import pkuForm from '../form/src/form';

/* istanbul ignore next */
pkuForm.install = function(Vue) {
  Vue.component(pkuForm.name, pkuForm);
}

export default pkuForm
