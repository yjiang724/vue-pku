# vue-pku
> vue-pku for vue.js, built in with PKU style compontents.

vue-pku is an ui components library base on vuejs and awsome font , which helps you build your web application in pku style.

[Preview](http://don-ui.jiangyu.me)｜[中文文档](http://don-ui.jiangyu.me)

## Installation
### NPM (Recommended)
```bash
$ npm install vue-pku
```

## Usage
```bash
import Vue from 'vue'
import pkue from 'vue-pku'

Vue.use(pkue)
```

# Version
- 0.8.2 beta 1/16/2018
    - rename `pkue` to `don-ui`
- 0.8.1 beta 1/15/2018
    - update compontent
        - `<pku-table>`
            - 使用级联选择器替换表格的每行操作按钮
        - `<pku-select>`
            - 下拉选择器添加常量提示标签
        - `<pku-input>`
            - 修改输入框阴影属性
        - `<pku-cascader-item>`
            - 去除级联选择器最小宽度限制
        - `<pku-cascader>`
            - 去除级联选择器最小宽度限制
            - 调整内边距
- 0.8.0 beta 1/15/2018
    - add compontent
        - `<pku-radio>`
        - `<pku-cascader>`
    - update compontent
        - `<pku-input>`
            - 可以通过注册 `ref` 获取输入框的内容
        - `<pku-select>`
            - 可以通过注册 `ref` 获取选择框的内容
        - `<pku-textarea>`
            - 可以通过注册 `ref` 获取文本框的内容        
- 0.7.8 beta 1/12/2018
    - update compontent
         - `<pku-input>`
            - 监听输入值
- 0.7.4 beta 1/12/2018
    - update compontent
        - `<pku-input>`, `<pku-select>`, `<pku-textarea>`
            - 取消 rem 单位
            - 设置默认 `width` 为 `100%`
        - `<pku-dialog>`
            - 增加滚动条
- 0.7.0 beta 1/11/2018
    - add compontent
        - `<pku-input>`
            - 模拟系统的单行输入框
            - 提供键入操作时的回调方法
        - `<pku-textarea>`
            - 模拟系统的多行输入框
            - **缺少** 键入操作的回调方法
        - `<pku-form>`
            - 模拟系统的表格组件
            - 提供 inline 与 block 两种布局
        - `<pku-form-item>`
            - `<pku-form>` 组件的每行
            - 可以插入任意 `html` 代码或者 `<pku-*>` 组件
    - update compontent
        - `<pku-dialog>`
            - 解决该组件在未传入 checkbox 变量时的 **warning** 警告
- 0.6.4 beta 1/10/2018
    - update compontent
        - `<pku-messagebox>` 中 `<pku-button>` 的 `value` 不能自定义，通过将 `<pku-button>` 换成原生 `<button>` 解决
        - `<pku-table>`，修改了 `click` 回调时间发生后，`checkbox` 状态变量丢失的情况
- 0.6.3 beta 1/9/2018
    - update compontent
        - `<pku-notice>`
            - 去除 `autoclose` 参数
            - 添加 ['success', 'error', 'info', 'warning'] 四种提示类型
            - 多个 Notice 会以出现的先后顺序在右侧从上至下排列
            - 多个 Notice 存在时，关闭任意 Notice，其底下 Notice 会向上移动
            - 在 Element UI 源码基础上修改得到
        - `<pku-messagebox>`
            - 在 `<pku-notice>` 源码基础上修改得到
            - 更改需要设置的参数和格式
            - 添加了关闭、确认事件的回调函数
            - `this.$text` 打开后能自动获取焦点，设置输入框的默认值，确认事件时能返回输入框的数据
- 0.6.2 beta 1/8/2018
    - update compontent
        - `<pku-notice>`
            - 每次调用 `this.$notice` 时会额外产生全新的 dom 节点，并且关闭 `notice` 时，节点的高度会自适应调整
- 0.6.1 beta 1/3/2018
    - update compontent
        - `<pku-select>`
            - the Attribute `list` could be an array of object
            - add Attribute `importKey`, if `list` is array of object, `importKey` is the showed text in the object, if not, show the item of list
            - add Attribute `exportKey`, if `list` is array of object, `exportKey` is the callback text in the object, if not, export the item of list
        - `<pku-checkbox>`
            -  `<pku-checkbox>` used in the `<pku-table>`, if the renderdata of `<pku-table>` changed, the checked status of `<pku-checkbox>` wouldn't changed. Now fixed!
- 0.6.0 beta 1/2/2018
    - 放假休息了3天，我又回来了！
    - add compontent
        - loading
- 0.5.0 beta 12/27/2017
    - add compontent
        - notice
    - update compontent
        - `<pku-button>`: fix the color of disabled button
- 0.4.1 beta 12/26/2017
    - update compontent `<pku-messagebox>`
        - add $text method, which contains `<textarea>`
- 0.4.0 beta 12/26/2017
    - add compontent
        - dialog
    - update compontent `<pku-select>`
        - watch `props.value` from vuex, bind the real time value
- 0.3.0 beta 12/25/2017
    - merry christmas! welcome to www.jiangyu.me!
    - add compontents
        - table
        - pagination
    - update compontent `<pku-button>`
        - add `callback` Event in unfile type button
- 0.2.0 beta 12/23/2017
    - add compontent
        - select
    - update: transform length unit from `rem` to `px`
- 0.1.0 beta 12/22/2017
    - add compontents
        - `$alert`
        - `$confirm`
- 0.0.3 beta 12/21/2017
    - add compontents
        - breadcrumb
        - button
        - checkbox
        - switch
- 0.0.2 beta 12/20/2017
    - add compontent
        - banner
- 0.0.1 beta 12/19/2017
    - init project

# License
Code and documentation copyright 2017 **YJiang**. Code released under the [MIT](www.jiangyu.me) license. Docs released under Creative Commons.