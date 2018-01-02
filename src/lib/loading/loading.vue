<template>
  <transition name="slide">
    <div class="loading" v-show="show">
      <div class="loading-wrapper">
        <div class="move">
          <i class="fa" :class="icon" aria-hidden="true"></i>
        </div>
        <div class="loading-title">
        {{ title }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'pkuLoading',
  props: {
    icon: {
      type: String,
      default: 'fa-snowflake-o'
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '拼命加载中'
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
  }
}
</script>
<style scoped>

.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #ffffff;
  z-index: 4;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-wrapper {
  text-align: center;
}
.loading-title {
  font-size: 14px;
  font-weight: normal;
  line-height: 32px;
  -webkit-font-smoothing: antialiased;
}
.move {
  animation: mymove 1s linear infinite;
  -webkit-animation: mymove 1s linear infinite;
}

@keyframes mymove {
  from { transform: rotate(0deg); }
  to {transform: rotate(360deg);}
}

.slide-enter-active {
  transition: all 500ms linear;
}
.slide-leave-active {
  transition: all 500ms linear;
}
.slide-enter-to, .slide-leave {
  background-color: rgba(0, 0, 0, 0.49);
}
.slide-enter, .slide-leave-to {
  background-color: rgba(0, 0, 0, 0);
}
</style>
