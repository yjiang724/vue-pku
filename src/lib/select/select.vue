<template>
  <div class="select">
    <div class="select-header" :class="{'select-noborder': !border}" @click="show = !show">
      <span class="select-label" v-if="label"> {{ label }} </span>
      <span>{{ value || '请选择' }}</span>
      <span class="select-icon"><i class="fa fa-angle-down" :class="{'fa-angle-active': show}" aria-hidden="true"></i></span>
    </div>
    <transition name="fade">
      <ul class="select-droplist" :class="{'select-is-labeled': label}" :class="animation" v-show="show" @click="onClickEventHandler">
        <li v-for="item in list" v-bind:data-key="item[exportKey] || ''" v-if="importKey.length > 0">
           {{ item[importKey]}}
        </li>
        <li v-else>
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pkuSelect',
  props: {
    selected: {
      default: '请选择'
    },
    label: {
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default () {
        return ['请选择']
      }
    },
    importKey: {
      type: String,
      default: ''
    },
    exportKey: {
      type: String,
      default: ''
    },
    animation: {
      type: String,
      default: 'scaleY'
    }
  },
  data () {
    return {
      show: false,
      value: this.selected,
      valueKey: undefined
    }
  },
  watch: {
    selected (val) {
      this.value = val
    }
  },
  methods: {
    onClickEventHandler (evt) {
      this.value = evt.target.innerText
      this.show = !this.show
      if (evt.target.dataset.key) {
        this.valueKey = evt.target.dataset.key
        this.$emit('callback', evt.target.dataset.key)
      } else {
        this.$emit('callback', this.value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '/static/font-awesome/css/font-awesome.min.css';

.select {
  position: relative;
  display: inline-block;
  min-width: 200px;
  width: 100%;
  text-align: left;
  font-size: inherit;
  font-weight: 400;
  color: #5a5e66;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-action: none;
  -moz-touch-action: none;
  -ms-touch-action: none;
  touch-action: none;
  -webkit-font-smoothing: antialiased;
}
.select-header {
  padding: 9px 12px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.select-header:focus {
  outline: none;
}
.select-header:hover {
  border-color: #409eff;
}
.select-header.select-noborder {
  box-shadow: none;
}
.select-header.select-noborder:hover {
  border-color: transparent;
  color: #409eff;
}
.select-header span {
  padding: 0 6px;
}
.select-header span.select-label {
  border-right: 1px solid rgba(0,0,0,.12);
  padding: 9px 12px;
  cursor: not-allowed;
}
.select-is-labeled.select-droplist::before {
  left: 70px;
}

.select-droplist {
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
.select-droplist li {
  position: relative;
  height: 28px;
  padding: 0 20px;
  line-height: 28px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.select-droplist li:hover {
  background-color: #f5f7fa;
}


.select-droplist::before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 6px solid #ffffff;
  content: "\20";
  display: block;
  left: 20px;
  position: absolute;
  top: -6px;
}
.select-icon {
  float: right;
}
.select-icon .fa {
  transition: transform 200ms ease;
}
.select-icon .fa-angle-active{
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
</style>
