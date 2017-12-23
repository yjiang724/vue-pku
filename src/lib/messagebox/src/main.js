import Vue from 'vue'
import Messagebox from './main.vue'

const Constructor = Vue.extend(Messagebox);

let currentMsg
let instance
let msgQueue = []

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      callback()
    }
    // if (currentMsg.resolve) {
    //   if (action === 'confirm') {
    //     if (instance.showInput) {
    //       currentMsg.resolve({ value: instance.inputValue, action });
    //     } else {
    //       currentMsg.resolve(action);
    //     }
    //   } else if (action === 'cancel' && currentMsg.reject) {
    //     currentMsg.reject(action);
    //   }
    // }
  }
}

const defaults = {
  submitButtonText: 'SUBMIT',
  closeButtonText: 'CLOSE'
}

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

const MessageBox = function(options, callback) {
  if (Vue.prototype.$isServer) return
  // if (typeof options === 'string') {
  //   options = {
  //     message: options
  //   }
  //   if (typeof arguments[1] === 'string') {
  //     options.title = arguments[1];
  //   }
  // } else if (options.callback && !callback) {
  //   callback = options.callback;
  // }
  msgQueue.push({
    options: options,
    callback: callback
  })

  showNextMsg()
}

MessageBox.alert = (message, title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return MessageBox({
      title: title,
      message: message,
      closeButtonText: options.closeButtonText || defaults.closeButtonText,
      submitButtonText: undefined
    }, options)
}

MessageBox.confirm = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  return MessageBox({
    title: title,
    message: message,
    closeButtonText: options.closeButtonText || defaults.closeButtonText,
    submitButtonText: options.submitButtonText || defaults.submitButtonText
  }, options.action)
}


export default MessageBox;
export { MessageBox };
