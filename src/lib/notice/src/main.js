import Vue from 'vue'
import Noticevue from './main.vue'

const Constructor = Vue.extend(Noticevue)

let instance
let instances = []
let seed = 1
let offsetHeight = 0
let offsetHeights = []

const Notice = function(options) {
  if (Vue.prototype.$isServer) return
  
  options = options || {}
  const userOnClose = options.onClose
  const id = 'notification_' + seed++
  const position = options.position || 'top-right'

  options.onClose = function() {
    Notice.close(id, userOnClose)
  }

  instance = new Constructor({
    data: options
  })
  
  // for (let prop in options) {
  //   if (options.hasOwnProperty(prop)) {
  //     instance.$data[prop] = options[prop]
  //   }
  // }
  instance.id = id
  instance.vm = instance.$mount()
  // document.body.appendChild(instance.$el)
  // Vue.nextTick(() => {
  //   instance.$data.show = true
  // })
  instance.vm.show = true
  instance.dom = instance.vm.$el
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = options.offset || 124
  instances.filter(item => item.position === position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  Vue.nextTick(() => {
    // instance.$data.show = true
    instances.forEach(function (item, idx) {
      offsetHeights[idx] = item.$el.offsetHeight
    })
  })
  return instance.vm
}

Notice.close = function(id, userOnClose) {
  let index = -1;
  const len = instances.length;
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];
  if (!instance) return;

  if (typeof userOnClose === 'function') {
    userOnClose(instance);
  }
  instances.splice(index, 1)
  offsetHeight = offsetHeights.splice(index, 1)[0]

  if (len <= 1) return;
  const position = instance.position;
  const removedHeight = offsetHeight
  for (let i = index; i < len - 1 ; i++) {
    if (instances[i].position === position) {
        instances[i].$el.style[instance.verticalProperty] =
        parseInt(instances[i].$el.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px';
    }
  }
}

export default Notice;
export { Notice };
