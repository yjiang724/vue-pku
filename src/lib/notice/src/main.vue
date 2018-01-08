<template>
  <transition name="slide">
    <div class="notice" v-if="show" :style="positionStyle">
      <div class="notice-header">
        <div class="notice-title">{{ title }}</div>
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
    }
  },
  data () {
    return {
      title: '标题',
      message: '内容',
      show: false,
      autoclose: false,
      time: 3000,
      verticalOffset: 0,
      position: 'top-right',
      onClose: null,
      onClick: null,
      closed: false
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.show = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    },
    autoclose (val, oldVal) {
      console.log(val, oldVal)
      if (this.autoclose) {
        let _this = this
        setTimeout(function () {
          _this.show = false
        }, Number(_this.time))
      }
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
