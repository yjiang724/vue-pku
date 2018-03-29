<template>
  <div class="switch">
    <input type="checkbox" class="switch_input">
    <span :class="{'switch_label': true, 'switch_label_left': true, 'switch_disabled': disabled}" @click="onSwitch()" :class="{ 'is-active': this.value }">
      <span>{{ableText}}</span>
    </span>
    <span :class="{'switch_core': true, 'switch_disabled': disabled}" @click="onSwitch()" :style="activeStyle">
      <span class="switch_circle" :style="circleStyle"></span>
    </span>
    <span :class="{'switch_label': true, 'switch_label_right': true, 'switch_disabled': disabled}" @click="onSwitch()" :class="{ 'is-active': !this.value }">
      <span>{{disableText}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'pkuSwitch',
  props: {
    message: {
      type: String,
      default: 'true#123456'
    },
    ableText: {
      type: String,
      default: ''
    },
    disableText: {
      type: String,
      default: ''
    },
    ableColor: {
      type: String,
      default: 'rgb(56, 142, 60)'
    },
    disableColor: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeStyle () {
      return {
        borderColor: this.value ? this.ableColor : this.disableColor,
        backgroundColor: this.value ? this.ableColor : this.disableColor
      }
    },
    circleStyle () {
      return {
        transform: this.value ? 'translate3d(20px, 0px, 0px)' : null
      }
    }
  },
  data () {
    return {
      value: this.message.split('#')[0] === 'true'
    }
  },
  watch: {
    message (val) {
      this.value = val.split('#')[0] === 'true'
    }
  },
  methods: {
    onSwitch () {
      if (!this.disabled) {
        this.value = !this.value
        this.$emit('callback', this.value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
.switch {
  display: inline-block;
  line-height: 34px;
  color: #878d99;
  outline: none;
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none;
  -webkit-font-smoothing: antialiased;
}
.switch_input {
  display: none;
}
.switch_label {
  transition: 200ms;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  // vertical-align: middle;
}
.switch_label_left {
  margin: 0 10px 0 0;
}
.switch_label_right {
  margin: 0 0 0 10px;
}
.switch_core {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color .3s,background-color .3s;
  vertical-align: middle;
}
.switch_core .switch_circle {
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  transition: transform 300ms;
  width: 16px;
  height: 16px;
  background-color: #fff;
}
.switch_disabled {
  cursor: not-allowed;
}
.active {
  border-color: rgb(56, 142, 60);
  background-color: rgb(56, 142, 60);
}
.active .switch_circle {
  transform: translate3d(20px, 0px, 0px);
}
.is-active {
  color: #5a5e66;
  font-weight: bolder;
}
</style>
