<template>
  <pku-button
    :class="[sizeBtnClass, disableBtnClass]"
    :disabled="list[0].disabled" 
    v-if="list.length === 1" 
    :value="list[0].label"
    @callback="onButtonEventHandler"></pku-button>
  <div
    :class="[defaultClass, sizeClass]"
    v-else>
    <div class="dropdown-header" :class="{'dropdown-noborder': !border}" @click="show = !show">
      <span>{{ value || '请选择' }}</span>
      <span class="dropdown-icon"><i class="fa fa-angle-down" :class="{'fa-angle-active': show}" aria-hidden="true"></i></span>
    </div>
    <transition name="fade">
      <ul class="dropdown-droplist" :class="{'dropdown-is-labeled': label}" :class="animation" v-show="show" @click="onClickEventHandler">
        <li v-if="checkbox">
          <span class="dropdown-label"><pku-checkbox ref="selectAll" value="全选" @callback="onSelectAllHandler"></pku-checkbox></span>
        </li>
        <li v-for="(item, id) in list" :class="{'dropdown-disabled': item.disabled}" :disabled="item.disabled">
          <span class="dropdown-label" v-if="checkbox"><pku-checkbox :value="item.label" ref="checkbox" @callback="onSelectOneHandler($event, id)"></pku-checkbox></span>
          <span v-else-if="item.hr === true" class="pku-hr"></span>
          <span v-else>{{item.label}}</span>
        </li>
        <li v-if="checkbox">
          <pku-button class="btn-sm btn-primary" value="选中" style="width: 100%;" @callback="onSelectSubmitHandler"></pku-button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pkuDropdown',
  props: {
    selected: {
      default: '请选择'
    },
    border: {
      type: Boolean,
      default: true
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default () {
        return [{label: '请选择', disabled: false}]
      }
    },
    size: {
      type: String,
      default: 'md'
    },
    animation: {
      type: String,
      default: 'scaleY'
    }
  },
  computed: {
    disableBtnClass () {
      return this.list[0].disabled ? 'btn-disabled' : ''
    }
  },
  data () {
    return {
      sizeBtnClass: 'btn-' + this.size,
      defaultClass: 'dropdown',
      sizeClass: 'dropdown-' + this.size,
      show: false,
      value: this.selected,
      selectArr: '[]'
    }
  },
  watch: {
    selected (val) {
      this.value = val
    },
    selectArr (val) {
      let tmp = JSON.parse(this.selectArr)
      this.$refs.checkbox.forEach((item, id) => {
        item.$data.checked = tmp[id]
      })
    }
  },
  mounted () {
    if (this.checkbox && this.$refs.checkbox) {
      this.selectArr = JSON.stringify(this.$refs.checkbox.map(item => item.$data.checked))
    }
  },
  methods: {
    onSelectAllHandler (val) {
      let tmp = JSON.parse(this.selectArr)
      let res = tmp.map(item => {
        return item ? 1 : 0
      })
      let sum = res.reduce( (l, r)=> { return r + l;}, 0)
      if (sum === tmp.length) {
        tmp = tmp.map(() => false)
      } else if (sum > 0) {
        tmp = tmp.map(() => true)
      } else {
        tmp = tmp.map(() => true)
      }
      this.selectArr = JSON.stringify(tmp)
    },
    onSelectOneHandler (evt, id) {
      let tmp = JSON.parse(this.selectArr)
      tmp[id] = evt
      let res = tmp.map(item => {
        return item ? 1 : 0
      })
      let sum = res.reduce( (l, r)=> { return r + l;}, 0)
      if (sum === tmp.length) {
        this.$refs.selectAll.checked = true
      } else {
        this.$refs.selectAll.checked = false
      }
      this.selectArr = JSON.stringify(tmp)
    },
    onButtonEventHandler (evt) {
      this.$emit('callback', evt)
    },
    onClickEventHandler (evt) {
      evt = evt.target
      while (evt.tagName.toUpperCase() !== 'LI') {
        evt = evt.parentNode
      }
      if (!this.checkbox && !evt.classList.contains('dropdown-disabled')) {
        this.show = !this.show
        this.$emit('callback', evt.innerText)
      }
    },
    onSelectSubmitHandler () {
      this.show = !this.show
      let res = []
      for (let i = 0; i < this.$refs.checkbox.length; i++) {
        if (this.$refs.checkbox[i].checked) {
          res.push(this.$refs.checkbox[i].value)
        }
      }
      // let tmp = JSON.parse(this.selectArr)
      // tmp = tmp.map(() => false)
      // this.selectArr = JSON.stringify(tmp)
      this.$emit('callback', res)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  min-width: 120px;
  width: inherit;
  text-align: left;
  font-size: inherit;
  font-weight: 400;
  color: #5a5e66;
  -webkit-user-dropdown: none;
  -moz-user-dropdown: none;
  -ms-user-dropdown: none;
  user-dropdown: none;
  -webkit-touch-action: none;
  -moz-touch-action: none;
  -ms-touch-action: none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  touch-action: none;
  -webkit-font-smoothing: antialiased;
}
.dropdown-header {
  padding: 9px 12px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.dropdown-header:focus {
  outline: none;
}
.dropdown-header.dropdown-noborder {
  box-shadow: none;
}
.dropdown-header.dropdown-noborder:hover {
  border-color: transparent;
  color: #409eff;
}
.dropdown-noborder span {
  color: #409eff;
}
.dropdown-header span {
  padding: 0 6px;
}

.dropdown-is-labeled.dropdown-droplist::before {
  left: 70px;
}

.dropdown-droplist {
  position: absolute;
  width: 100%;
  top: 50px;
  padding: 6px 0px;
  font-size: 14px;
  line-height: 32px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px -4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  z-index: 2;
  list-style: none;
}
.dropdown-droplist li {
  position: relative;
  height: 34px;
  padding: 0 20px;
  line-height: 34px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.dropdown-droplist li:hover {
  background-color: #f5f7fa;
}
.dropdown-droplist .dropdown-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.dropdown-droplist .dropdown-disabled:hover {
  background-color: #ffffff;
}
.dropdown-label {

}
.dropdown-label >>> .checkbox {
  padding: 0;
}

.dropdown-droplist::before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 6px solid #ffffff;
  content: "\20";
  display: block;
  left: 20px;
  position: absolute;
  top: -6px;
}
.dropdown-icon {
  float: right;
}
.dropdown-icon .fa {
  transition: transform 200ms ease;
}
.dropdown-icon .fa-angle-active{
  transform: rotate(180deg);
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.scaleY.fade-enter, .scaleY.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
.scaleX.fade-enter, .scaleX.fade-leave-to {
  opacity: 0;
  transform: scaleX(0);
}
.translateUp.fade-enter, .translateUp.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.translateDown.fade-enter, .translateDown.fade-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.dropdown.dropdown-sm .dropdown-header {
  padding: 4px 8px;
  font-size: 14px;
}
.dropdown.dropdown-sm .dropdown-droplist li {
  height: 24px;
  line-height: 24px;
}
.dropdown.dropdown-lg .dropdown-header {
  padding: 12px;
  font-size: 16px;
}
.dropdown.dropdown-lg .dropdown-droplist li {
  height: 40px;
  line-height: 40px;
}
.pku-hr {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
  left: 0;
  top: 11px;
}
</style>
