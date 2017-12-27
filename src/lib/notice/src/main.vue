<template>
  <transition name="slide">
    <div class="notice" v-show="show">
      <div class="notice-header">
        <div class="notice-title">{{ title }}</div>
        <button aria-label="Close" class="notice-close" @click="show = false"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i></button>
      </div>
      <div class="notice-content">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
      title: '标题',
      message: '内容',
      show: false,
      autoclose: false,
      time: 3000
    }
  },
  watch: {
    autoclose (val, oldVal) {
      if (this.autoclose) {
        let _this = this
        setTimeout(function () {
          _this.show = false
        }, Number(_this.time))
      }
    }
  }
}
</script>

<style scoped>
.notice {
  position: fixed;
  width: 330px;
  top: 200px;
  right: 20px;
  padding: 20px 10px;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: top 300ms ease;
}
.notice-header {
  padding: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 32px;
  color: #2d2f33;
}
.notice-title {
  display: inline-block;
}
.notice-close {
  float: right;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  top: 5px;
}
.notice-close:active {
  color: #555555;
}
.notice-content {
  color: #5a5e66;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  padding: 10px 0;
  -webkit-font-smoothing: antialiased;
}

.slide-enter-active {
  transition: transform 300ms ease 500ms;
}
.slide-leave-active {
  transition: transform 500ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateX(500px);
}

.slide-enter-to, .slide-leave {
  transform: translateX(0px);
}
</style>
