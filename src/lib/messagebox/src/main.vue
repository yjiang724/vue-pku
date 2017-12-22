<template>
   <transition name="slide" v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
          v-on:after-leave="afterLeave">
    <div class="alert" v-show="show">
      <div class="alert-wrapper" :class="{'alert-wrapper-fixed': true}">
        <div class="alert-header">
          <div class="alert-title">{{ title }}</div>
          <button aria-label="Close" class="alert-close" @click="onClose"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i></button>
        </div>
        <div class="alert-content">
          <span>{{ message }}</span>
        </div>
        <div class="alert-button-group">
          <button class="btn btn-primary" v-if="submitButtonText" @click="onSubmit"><span>{{ submitButtonText }}</span></button>
          <button class="btn btn-default" @click="onClose"><span>{{ closeButtonText }}</span></button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Messagebox',
  data () {
    return {
      show: false,
      title: undefined,
      message: undefined,
      callback: undefined,
      closeButtonText: undefined,
      submitButtonText: undefined
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.display = 'block'
      el.children[0].style.transform = 'translateY(-1000px)'
      el.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    },
    enter: function (el, done) {
      el.children[0].style.transition = 'all 200ms ease-out'
      setTimeout(function () {
        el.children[0].style.transform = 'translateY(0px)'
        el.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        done()
      }, 50)
      // done()
    },
    afterEnter: function (el) {
      el.children[0].style.transform = 'translateY(0px)'
    },
    beforeLeave: function (el) {
    },
    leave: function (el, done) {
      el.style.backgroundColor = 'rgba(0, 0, 0, 0)'
      done()
    },
    afterLeave: function (el) {
      el.style.display = 'block'
      setTimeout(function () {
        el.style.display = 'none'
      }, 100)
    },
    onSubmit () {
      this.callback()
    },
    onClose (flag) {
      this.show = false
    }
  },
  components: {
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  transition: all 200ms ease-out;
  z-index: 4;
}
.alert-wrapper {
  width: 24rem;
  height: 8rem;
  background-color: #ffffff;
  position: absolute;
  left: calc(50% - 12rem);
  top: calc(50% - 4rem);
  color: #2d2f33;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  padding: 0.5rem 1rem;
}
.alert-header {
  padding: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 1.6rem;
  color: #2d2f33;
  text-align: left;
}
.alert-title {
  display: inline-block;
}
.alert-close {
  float: right;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  top: 5px;
}
.alert-close:active {
  color: #555555;
}
.alert-content {
  line-height: 100%;
  color: #5a5e66;
  font-size: 14px;
  text-align: left;
  padding: 3rem 0 0.5rem;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  top: 0;
  bottom: 42px;
  position: absolute;
}
.alert-button-group {
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
}
.alert-button-group button {
  min-width: 40px;
}


.btn {
  display: inline-block;
  position: relative;
  padding: 9px 14px;
  margin-bottom: 0;
  min-width: 70px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  white-space: nowrap;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #5a5e66;
  text-transform:uppercase;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  background-color: #ffffff;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
}
.btn:focus {
  outline: none;
}
.btn.btn-default {
  background-color: #ffffff;
}
.btn.btn-default:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.btn.btn-primary {
  background-color: rgb(25, 118, 210);
  color: #ffffff;
}
.btn.btn-primary:hover {
  background-color: rgba(25, 118, 210, 0.75);
}
.btn.btn-warning {
  background-color: rgb(245, 124, 0);
  color: #ffffff;
}
.btn.btn-warning:hover {
  background-color: rgba(245, 124, 0, 0.75);
}
.btn.btn-success {
  background-color: rgb(56, 142, 60);
  color: #ffffff;
}
.btn.btn-success:hover {
  background-color: rgba(56, 142, 60, 0.75);
}
.btn.btn-danger {
  background-color: rgb(211, 47, 47);
  color: #ffffff;
}
.btn.btn-danger:hover {
  background-color: rgba(211, 47, 47, 0.75);
}
.btn.btn-disabled {
  color: #c0c4cc;
  background-color: #F5F5F5;
  cursor: not-allowed; 
}
.btn.btn-disabled:hover {
  cursor: not-allowed; 
}
.btn:active {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.8) 0px 1px 4px;
}
.btn.btn-disabled:active {
  box-shadow: 0 1px 6px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.12);
}
.btn span {
  padding:0 2px;
}
</style>