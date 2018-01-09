<template>
   <transition name="slide" 
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:leave="leave"
      v-on:after-leave="afterLeave">
    <div class="alert" v-if="show">
      <div class="alert-wrapper">
        <div class="alert-header">
          <div class="alert-title">{{ title }}</div>
          <button aria-label="Close" class="alert-close" @click="onCloseEventHandler"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i></button>
        </div>
        <div class="alert-content">
          <span v-if="type !== 'text'">{{ message }}</span>
          <div class="alert-input" v-else>
            <textarea ref="message" v-focus></textarea>
          </div>
        </div>
        <div class="alert-button-group">
          <pku-button 
            class="btn btn-primary"
            :value="submitButtonText"
            @callback="onSubmitEventHandler"
            v-if="submitButtonText.length > 0"></pku-button>
          <pku-button 
            class="btn btn-default"
            :value="closeButtonText"
            @callback="onCloseEventHandler"></pku-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import pkuButton from '../../button/button.vue'

export default {
  name: 'Messagebox',
  data () {
    return {
      show: false,
      title: '标题',
      message: '提示语',
      onClose: null,
      onClick: null,
      type: undefined,
      submitButtonText: '',
      closeButtonText: '关闭'
    }
  },
  watch: {
    show (val) {
      if (val && this.type === 'text') {
        setTimeout(() => {
          this.$refs.message.value = this.message
        })
      }
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
    onSubmitEventHandler () {
      this.show = false
      if (this.type === 'text') {
        this.onClick(this.$refs.message.value)
      } else {
        this.onClick()
      }
    },
    onCloseEventHandler (flag) {
      this.show = false
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  },
  components: {
    pkuButton
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
  width: 480px;
  height: 160px;
  background-color: #ffffff;
  position: absolute;
  left: calc(50% - 240px);
  top: calc(50% - 80px);
  color: #2d2f33;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  padding: 10px 20px;
}
.alert-header {
  padding: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 32px;
  color: #2d2f33;
  text-align: left;
}
.alert-title {
  display: inline-block;
}
.alert-close {
  float: right;
  background: transparent;
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
  margin: 60px 0 10px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  top: 0;
  bottom: 42px;
  position: absolute;
}
.alert-button-group {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
.alert-button-group button {
  min-width: 40px;
}
.alert-input textarea {
  resize: none;
  line-height: 20px;
  border: 1px solid rgb(216, 220, 229);
  font-size: 14px;
  border-radius: 6px;
  padding: 4px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: rgba(17, 17, 17, 0.098) 0px 2px 3px;
  width: 459px;
  height: 48px;
  max-width: 460px;
  margin: 0px;
}
</style>