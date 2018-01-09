import Vue from 'vue'
import Messagebox from './main.vue'

const Constructor = Vue.extend(Messagebox);

let instance
let instances = []
let seed = 0
const defaultCallback = action => {
}

const MessageBox = function(options, submit, cancel) {
  if (Vue.prototype.$isServer) return

  options = options || {}
  const userOnClose = cancel || defaultCallback
  const userOnSubmit = submit || defaultCallback
  const id = 'messagebox' + seed++
  
  if (options.type === 'confirm' || options.type === 'text') {
    options.onClick = function(val) {
      MessageBox.submit(id, userOnSubmit , val)
    }
  }

  options.onClose = function() {
    MessageBox.close(id, userOnClose)
  }

  instance = new Constructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()

  instance.dom = instance.vm.$el
  instances.push(instance)
  document.body.appendChild(instance.vm.$el)

  
  Vue.nextTick(() => {
    instance.vm.show = true
  })
  // return instance.vm
}

MessageBox.submit = function(id, userOnSubmit, val) {
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

  if (typeof userOnSubmit === 'function') {
    userOnSubmit(val);
  }
}

MessageBox.close = function(id, userOnClose) {
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
}


MessageBox.alert = (message, title, options) => {
  let res = { message, title, type: 'alert' }
  for (let prop in options) {
    if (options.hasOwnProperty(prop) && (prop !== 'cancel' && prop !== 'submit')) {
      res[prop] = options[prop]
    }
  }
  return MessageBox(res, options.submit, options.cancel)
}

MessageBox.confirm = (message, title, options) => {
  let res = { message, title, type: 'confirm' }
  for (let prop in options) {
    if (options.hasOwnProperty(prop) && (prop !== 'cancel' && prop !== 'submit')) {
      res[prop] = options[prop]
    }
  }
  return MessageBox(res, options.submit, options.cancel)
}

MessageBox.text = (message, title, options) => {
  let res = { message, title, type: 'text' }
  for (let prop in options) {
    if (options.hasOwnProperty(prop) && (prop !== 'cancel' && prop !== 'submit')) {
      res[prop] = options[prop]
    }
  }
  return MessageBox(res, options.submit, options.cancel)
}

export default MessageBox;
export { MessageBox };
