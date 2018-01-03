# vue-pku
> vue-pku for vue.js, built in with PKU style compontents.

vue-pku is an ui components library base on vuejs and awsome font , which helps you build your web application in pku style.

[Preview](http://pkue.jiangyu.me)｜[中文文档](http://pkue.jiangyu.me)

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