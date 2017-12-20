import Vue from 'vue'
import Button from './lib/button'
import Headbar from './lib/headbar'
import Switch from './lib/switch'

const components = [
  Button,
  Headbar,
  Switch
]

const install = function(Vue, opts = {}) {
  if (install.installed) return
  
  components.map(component => {
    Vue.component(component.name, component)
  })
  // Object.keys(components).forEach(key => Vue.component(key, components[key]));
}


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { Button, Headbar, Switch }

export default {
  version: '0.0.1',
  install,
  Button,
  Headbar,
  Switch
}
