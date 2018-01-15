import Vue from 'vue'
import Banner from './lib/banner'
import Button from './lib/button'
import Breadcrumb from './lib/breadcrumb'
import Checkbox from './lib/checkbox'
import Cascader from './lib/cascader'
import Dialog from './lib/dialog'
import Form from './lib/form'
import FormItem from './lib/form-item'
import Input from './lib/input'
import Loading from './lib/loading'
import Messagebox from './lib/messagebox'
import Notice from './lib/notice'
import Pagination from './lib/pagination'
import Radio from './lib/radio'
import Select from './lib/select'
import Switch from './lib/switch'
import Table from './lib/table'
import Textarea from './lib/textarea'
import axios from 'axios'

const components = [
  Banner,
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Dialog,
  Form,
  Input,
  Loading,
  Pagination,
  Radio,
  Select,
  Switch,
  Table,
  Textarea,
  FormItem
]

const install = function(Vue, opts = {}) {
  if (install.installed) return
  
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$alert = Messagebox.alert
  Vue.prototype.$confirm = Messagebox.confirm
  Vue.prototype.$text = Messagebox.text
  Vue.prototype.$notice = Notice
  Vue.prototype.$http = axios
  // Object.keys(components).forEach(key => Vue.component(key, components[key]));
}

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { 
  Banner,
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Dialog,
  Form,
  Input,
  Loading,
  Pagination,
  Radio,
  Select,
  Switch,
  Table,
  Textarea,
  FormItem
}

export default {
  version: '0.0.1',
  install,
  Banner,
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Dialog,
  Form,
  Input,
  Loading,
  Pagination,
  Radio,
  Select,
  Switch,
  Table,
  Textarea,
  FormItem
}
