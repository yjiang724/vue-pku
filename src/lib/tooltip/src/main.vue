<template>
  <transition name="slide">
    <div class="tooltip" v-if="show" @click="leave">
        <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Tooltip',
  computed: {
  },
  data () {
    return {
      message: '内容',
      show: false,
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
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    leave () {
      this.closed = true;
    }
  }
}
</script>

<style scoped>
.tooltip {
  position: absolute;
  max-width: 200px;
  height: 24px;
  top: 14px;
  padding: 2px 10px;
  line-height: 24px;
  color: #fff;
  background-color: #000;
  box-sizing: content-box;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
}
.tooltip::after {
  display: block;
  content: "\20";
  position: relative;
  width: 0px;
  height: 6px;
  top: 2px;
  border-top: 8px solid #000;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
}

.slide-leave-active {
  transition: opacity 300ms ease;
}
.slide-leave {
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
}

</style>
