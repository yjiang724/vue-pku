<template>
  <transition name="slide">
    <div class="notice" v-if="show" :style="positionStyle">
      <div class="notice-header">
        <div class="notice-title">
          <i :class="colorType" aria-hidden="true"></i>
          {{ title }}
          </div>
        <button aria-label="Close" class="notice-close" @click.stop="close"><i class="fa fa-window-close fa-2x" aria-hidden="true"></i></button>
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
  computed: {
    verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },
    positionStyle() {
      return {
        [this.verticalProperty]: `${ this.verticalOffset }px`
      };
    },
    colorType () {
      return this.colorMap[this.type]
    }
  },
  data () {
    return {
      title: '标题',
      message: '内容',
      show: false,
      type: '',
      time: 0,
      verticalOffset: 0,
      position: 'top-right',
      onClose: null,
      onClick: null,
      closed: false,
      colorMap: {
        warning: 'fa fa-exclamation-triangle',
        success: 'fa fa-check-circle',
        error: 'fa fa-times-circle',
        info: 'fa fa-info-circle',
      }
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.show = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    },
  },
  mounted () {
    if (this.time > 0) {
      setTimeout(() => {
        this.close()
      }, this.time)
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    click() {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
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
.notice-title .fa-exclamation-triangle {
  color: rgb(245, 124, 0);
}
.notice-title .fa-info-circle {
  color: rgb(25, 118, 210);
}
.notice-title .fa-times-circle {
  color: rgb(211, 47, 47);
}
.notice-title .fa-check-circle {
  color: rgb(56, 142, 60);
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
  transition: opacity 300ms ease;
}
.slide-enter {
  transform: translateX(500px);
}
.slide-leave {
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0px);
}
</style>
