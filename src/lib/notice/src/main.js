import Vue from 'vue'
import Noticevue from './main.vue'

const Constructor = Vue.extend(Noticevue);

let currentMsg
let instance
let msgQueue = []

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      callback(action)
    }
  }
}

// const defaults = {
//   submitButtonText: 'SUBMIT',
//   closeButtonText: 'CLOSE'
// }

const initInstance = () => {
  instance = new Constructor({
    el: document.createElement('div')
  })
  
  instance.callback = defaultCallback
}
  
const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = ''
  currentMsg = msgQueue.shift()
  let options = currentMsg.options
  for (let prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance.$data[prop] = options[prop]
    }
  }
  if (options.callback === undefined) {
    instance.callback = defaultCallback;
  }
  // let oldCb = instance.callback;
  // instance.callback = (action, instance) => {
  //   oldCb(action, instance);
  //   showNextMsg();
  // };
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.$data.show = true
  })
}

const Notice = function(options, callback) {
  if (Vue.prototype.$isServer) return
  msgQueue.push({
    options: options,
    callback: callback
  })

  showNextMsg()
}

export default Notice;
export { Notice };
