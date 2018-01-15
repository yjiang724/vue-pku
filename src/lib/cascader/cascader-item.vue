<template>
  <div class="cascader" :style="{ left: leftStyle}">
    <transition name="fade">
      <ul class="cascader-droplist-after" 
        v-show="show"
        @click="onClickEventHandler">
        <li v-for="(item, $id) in list" v-if="item.child" v-bind:data-key="$id">
          {{ item.label }} <i class="fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li v-bind:data-key="$id" v-else>
          {{ item.label }}
        </li>
      </ul>
    </transition>
    <pku-cascader-item 
      :rootShow="rootShow"
      :rank="rank + 1"
      :fullRoot="root"
      :list="child_list"
      :async="async"
      v-if="list.length > 0"
      @callback="onSelectEventHandler"></pku-cascader-item>
  </div>
</template>

<script>
export default {
  name: 'pkuCascaderItem',
  props: {
    fullRoot: {
      type: String,
      default: ''
    },
    rootShow: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    async: {
      type: Boolean,
      default: false
    },
    rank: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      default: 'http://127.0.0.1/API/checksystem/qa/cas.php'
    },
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed:{
    leftStyle () {
      if (this.rank > 0) {
        return '300px'
      } else {
        return '0px'
      }
    }
  },
  data () {
    return {
      show: false,
      child_list: [],
      root: this.fullRoot
    }
  },
  watch: {
    list (val) {
      if (val && val.length > 0) {
        this.show = true
      } else {
        this.show = false
      }
    },
    rootShow (val) {
      if (!val) {
        this.show = false
      }
    },
    fullRoot (val) {
      this.root = val
      this.child_list = []
    }
  },
  methods: {
    onClickEventHandler (evt) {
      while (evt.target.nodeName.toUpperCase() !== 'LI') {
        evt = evt.parentNode
      }
      let num = evt.target.dataset.key
      this.root = this.fullRoot + '_' + this.list[num].label
      if (!this.async) {
        if (this.list[num].child) {
          this.child_list = this.list[num].child.concat()
        } else {
          this.$emit('callback', this.root)
        }
      } else {
        if (this.list[num].child) {
          let params = Object.assign({}, this.list[num].params)
          this.$http({
            method: 'POST',
            url: this.list[num].url,
            data: params,
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
              if (this.list[num].child) {
                this.child_list = message.concat()
              }
            } else {
              throw new Error('error')
            }
          })
          .catch(function (err) {
            console.log('w', err)
          })
        } else {
          this.$emit('callback', this.root)
        }
      }
    },
    onSelectEventHandler (val) {
      this.$emit('callback', val)
    }
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
  position: absolute;
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
.cascader-droplist-after {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  line-height: 32px;
  width: 100%;
  padding: 10px 0px;
  margin-bottom: 10px;
  position: absolute;
  top: 10px;
  list-style: none;
  z-index: 2;
  -webkit-font-smoothing: antialiased;
}
.cascader-droplist-after li {
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
.cascader-droplist-after li:hover {
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
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
