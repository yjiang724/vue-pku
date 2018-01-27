<template>
  <div class="cascader">
    <div class="cascader-header" @click="onShowEventHandler">
      <span>{{ value }}</span>
      <span class="cascader-icon"><i class="fa fa-angle-down" :class="{'fa-angle-active': show}" aria-hidden="true"></i></span>
    </div>
    <div>
      <!-- <transition name="fade">
        <ul class="cascader-droplist" :class="animation" v-show="show" @click="onClickEventHandler">
          <li v-for="(item, $id) in list" v-if="item.child" v-bind:data-key="$id">
            {{ item.label }} <i class="fa fa-angle-right" aria-hidden="true"></i>
          </li>
          <li v-bind:data-key="$id" v-else>
            {{ item.label }}
          </li>
        </ul>
      </transition> -->
      <pku-cascader-item
        :rootShow="show"
        :fullRoot="root"
        :list="child_list"
        :async="async"
        @callback="onSelectEventHandler"></pku-cascader-item>
    </div>
  </div>
</template>

<script>
import pkuCascaderItem from './cascader-item'

export default {
  name: 'pkuCascader',
  props: {
    selected: {
      default: '请选择'
    },
    list: {
      type: Array,
      default () {
        return [
          { 
            label: 'menu1',
            child: [
              { 
                label: 'menu11',
                child: [
                  { label: 'menu111' },
                  { label: 'menu112' },
                  { label: 'menu113' }
                ]
              },
              { 
                label: 'menu12',
                child: [
                  { 
                    label: 'menu121',
                    child: [
                      { label: 'menu1211' },
                      { label: 'menu1221' },
                      { label: 'menu1231' }
                    ]
                  },
                  { label: 'menu122' },
                  { label: 'menu123' }
                ]
              },
              { label: 'menu13' }
            ]
          },
          { 
            label: 'menu2',
            child: [
              { label: 'menu21' },
              { label: 'menu22' },
              { label: 'menu23' }
            ]
          },
          { 
            label: 'menu3'
          }
        ]
      }
    },
    async: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: 'http://127.0.0.1/API/checksystem/qa/cas.php'
    },
    animation: {
      type: String,
      default: 'scaleY'
    },
    params: {
      type: Object,
      default () {
        return {}
      }
    },
    showAllLevels: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      show: false,
      child_list: [],
      root: '0',
      value: this.selected
    }
  },
  watch: {
    selected (val) {
      this.value = val
    }
  },
  methods: {
    onShowEventHandler () {
      this.show = !this.show
      this.root = ''
      if (this.async && this.show) {
        let data = this.params
        this.$http({
          method: 'POST',
          url: this.url,
          data,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret.slice(0, -1)
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then( res => {
          let { code, message } = res.data
          if (code === 200) {
            // if (this.list[evt.target.dataset.key].child) {
            if (message.length > 0) {
              this.child_list = message.concat()
            }
          } else {
            throw new Error('error')
          }
          // let { code, message } = res.data
          // if (code === 200) {
          //   if (message.length > 0) {
          //     this.child_list = message.concat()
          //   } else {
          //     this.$emit('callback', this.root)
          //   }
          // } else {
          //   throw new Error('error')
          // }
        })
        .catch(function (err) {
          console.log(err)
        })
      } else {
        this.child_list = this.list.concat()
      }
    },
    // onClickEventHandler (evt) {
    //   while (evt.target.nodeName.toUpperCase() !== 'LI') {
    //     evt = evt.parentNode
    //   }
    //   this.root = String(evt.target.dataset.key)
    //   if (this.list[evt.target.dataset.key].child) {
    //     this.child_list = this.list[evt.target.dataset.key].child.concat()
    //   } else {
    //     this.onRednerEventHandler(this.root)
    //   }
    // },
    onSelectEventHandler (val) {
      this.onRednerEventHandler(val)
    },
    onRednerEventHandler (val) {
      val = val.slice(1)
      let tmp = val.split('_')
      // let tmpList = this.list.concat()
      // tmp = tmp.map(item => {
      //   let head =  tmpList[item].label
      //   tmpList = tmpList[item].child
      //   return head
      // })
      this.root = ''
      this.child_list = []
      this.show = false
      if (this.showAllLevels) {
        this.value = tmp.join('/')
      } else {
        this.value = tmp[tmp.length - 1]
      }
      this.$emit('callback', tmp.join('/'))
    }
  },
  components: {
    pkuCascaderItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '/static/font-awesome/css/font-awesome.min.css';

.cascader {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  text-align: left;
  min-height: 34px;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-action: none;
  -moz-touch-action: none;
  -ms-touch-action: none;
  touch-action: none;
}
.cascader-header {
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: inherit;
  padding: 4px 12px;
  // margin: 5px 0px;
  white-space: nowrap;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.cascader-header:focus {
  outline: none;
}
.cascader-header:hover {
  border-color: #409eff;
}
.cascader-header span {
  padding: 0 6px;
}
.cascader-icon {
  position: absolute;
  right: 0px;
}
.cascader-icon .fa {
  transition: all 200ms ease;
}
.cascader-icon .fa-angle-active{
  transform: rotate(180deg);
}
.cascader-droplist::before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 6px solid #ffffff;
  content: "\20";
  display: block;
  left: 20px;
  position: absolute;
  top: -6px;
}
.cascader-droplist {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px -4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  line-height: 32px;
  min-width: 200px;
  width: 100%;
  padding: 10px 0px;
  margin-bottom: 10px;
  position: absolute;
  top: 50px;
  list-style: none;
  z-index: 2;
  -webkit-font-smoothing: antialiased;
}
.cascader-droplist li {
  box-sizing: border-box;
  color: #5a5e66;
  cursor: pointer;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cascader-droplist li:hover {
  background-color: #f5f7fa;
}

li .fa-angle-right {
  position: absolute;
  right: 20px;
  top: 10px;
  font-weight: 100;
  color: #bfcbd9;
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.scaleY.fade-enter, .scaleY.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
