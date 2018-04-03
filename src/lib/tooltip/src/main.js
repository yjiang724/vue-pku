import Vue from 'vue'
import Tooltipvue from './main.vue'

const Constructor = Vue.extend(Tooltipvue)

let instance
let instances = []
let seed = 1
let offsetHeight = 0
let offsetHeights = []

const Tooltip = function(evt, options) {
  if (Vue.prototype.$isServer) return
  
  options = options || {}
  const id = 'tooltip_' + seed++
  instance = new Constructor({
    data: options
  })
  
  instance.id = id
  instance.vm = instance.$mount()
  instance.vm.show = true
  instance.dom = instance.vm.$el

  evt.target.appendChild(instance.vm.$el)
  return instance.vm
}

export default Tooltip;
export { Tooltip };
