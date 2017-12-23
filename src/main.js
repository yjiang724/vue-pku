import Vue from 'vue'
import Banner from './lib/banner'
import Button from './lib/button'
import Breadcrumb from './lib/breadcrumb'
import Checkbox from './lib/checkbox'
import Messagebox from './lib/messagebox'
import Select from './lib/select'
import Switch from './lib/switch'

const components = [
  Banner,
  Breadcrumb,
  Button,
  Checkbox,
  Select,
  Switch
]

const install = function(Vue, opts = {}) {
  if (install.installed) return
  
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$alert = Messagebox.alert
  Vue.prototype.$confirm = Messagebox.confirm
  // Object.keys(components).forEach(key => Vue.component(key, components[key]));
}


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { 
  Banner,
  Breadcrumb,
  Button,
  Checkbox,
  Select,
  Switch
}

export default {
  version: '0.0.1',
  install,
  Banner,
  Breadcrumb,
  Button,
  Checkbox,
  Select,
  Switch
}
