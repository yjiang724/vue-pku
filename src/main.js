import Vue from 'vue'

import Button from './lib/button'
import Headbar from './lib/headbar'
import Switch from './lib/switch'
import Breadcrumb from './lib/breadcrumb'
import Checkbox from './lib/checkbox'

const components = [
  Breadcrumb,
  Button,
  Checkbox,
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

export { Breadcrumb, Button, Checkbox, Headbar, Switch }

export default {
  version: '0.0.1',
  install,
  Breadcrumb,
  Button,
  Checkbox,
  Headbar,
  Switch
}
