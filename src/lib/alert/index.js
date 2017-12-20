import pkuAlert from './alert.vue'

pkuAlert.install = function(Vue) {
  Vue.component(pkuAlert.name, pkuAlert)
}

export default pkuAlert
