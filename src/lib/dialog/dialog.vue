<template>
  <transition name="slide" 
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:leave="leave"
          v-on:after-leave="afterLeave">
    <div class="dialog" v-show="show">
      <div class="dialog-wrapper" :class="{'dialog-wrapper-fixed': fixed}">
        <div class="dialog-header">
          <div class="dialog-title">{{ title }}</div>
          <button aria-label="Close" class="dialog-close" @click="onClose"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i></button>
        </div>
        <div class="dialog-content">
          <slot ref="content"></slot>
        </div>
        <!--<div class="dialog-button-group">
          <pku-button class="btn-primary" value="确认" @callback="$emit('callback')" v-if="submit"></pku-button>
          <pku-button class="btn-default" value="关闭" @callback="onClose"></pku-button>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'pkuDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    fixed: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.visible
    }
  },
  watch: {
    visible (val) {
      this.show = val
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.display = 'block'
      if (this.fixed === true) {
        el.children[0].style.overflow = 'hidden'
      }
    },
    enter: function (el, done) {
      let _this = this
      setTimeout(function () {
        el.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        if (_this.fixed === true) {
          let height0 = getComputedStyle(el.children[0].children[0], null)['height'].slice(0, -2)
          let height1 = getComputedStyle(el.children[0].children[1], null)['height'].slice(0, -2)
          // el.children[0].style.height = (130 + Number(height0) + Number(height1)) + 'px'
          el.children[0].style.height = '100%'
          // console.log(getComputedStyle(el.children[0], null)['height'])
          // let tmpHeight = el.children[0].getBoundingClientRect().height
          // el.children[0].style.height = tmpHeight + 300 + 'px'
        }
        done()
      }, 50)
      // done()
    },
    afterEnter: function (el) {
      if (this.fixed === true) {
        setTimeout(function () {
          el.children[0].style.overflow = 'auto'
        }, 800)
      }
    },
    leave: function (el, done) {
      if (this.fixed !== true) {
        el.style.backgroundColor = 'rgba(0, 0, 0, 0)'
      }
      done()
    },
    afterLeave: function (el) {
      el.style.display = 'block'
      if (this.fixed === true) {
        el.children[0].style.overflow = 'hidden'
        el.children[0].style.height = 0
        setTimeout(function () {
          el.style.display = 'none'
        }, 800)
      } else {
        setTimeout(function () {
          el.style.display = 'none'
        }, 100)
      }
    },
    onClose (flag) {
      if (this.$children[0] && this.$children[0].checkboxList) {
        this.$children[0].onClearEventHandler()
        this.$children[0].checkboxList = '[]'
        if (this.$children[0].$refs.checkAll) {
          this.$children[0].$refs.checkAll.unCheck()
        }
      }
      this.$emit('closeEvent')
    }
  }
}
</script>
<style scoped>

.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #ffffff;
  transition: all 200ms ease-out;
  z-index: 4;
  overflow-y:scroll;  
  overflow-x:hidden;  
}
.dialog-wrapper {
  width: 60%;
  // height: 50%;
  background-color: #fff;
  position: absolute;
  left: calc(20%);
  top: calc(5%);
  color: #2d2f33;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 10px 20px;
  transition: height .8s ease-out;
}
.dialog-wrapper-fixed {
  width: 100%;
  height: 0px;
  top: 0;
  left: 0;
  padding: 0;
}
.dialog-header {
  padding: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 32px;
  color: #2d2f33;
  text-align: left;
}
.dialog-wrapper-fixed .dialog-header {
  padding: 20px 40px;
}
.dialog-wrapper-fixed .dialog-content {
  padding: 10px 40px;
}
.dialog-wrapper-fixed::-webkit-scrollbar {
  display: none;
}
.dialog-title {
  display: inline-block;
}
.dialog-close {
  float: right;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  top: 5px;
}
.dialog-close:active {
  color: #555555;
}
.dialog-content {
  line-height: 24px;
  color: #5a5e66;
  font-size: 14px;
  text-align: left;
  padding: 10px 0;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
.dialog-button-group {
  float: right;
}
.dialog-wrapper-fixed .dialog-button-group {
  padding: 10px 40px;
}
.dialog-button-group button {
  min-width: 50px;
}
</style>
