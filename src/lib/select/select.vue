<template>
  <div class="select">
    <div class="select-header" @click="show = !show">
      <span>{{selected}}</span>
      <span class="select-icon"><i class="fa fa-angle-down" :class="{'fa-angle-active': show}" aria-hidden="true"></i></span>
    </div>
    <transition name="fade">
      <ul class="select-droplist" :class="animation" v-show="show" @click="selected = $event.target.innerText, show = !show, $emit('callback', selected)">
        <li v-for="item in list">{{item}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pkuSelect',
  props: {
    value: {
      default: '请选择'
    },
    list: {
      type: Array,
      default () {
        return ['请选择']
      }
    },
    animation: {
      type: String,
      default: 'scaleY'
    }
  },
  data () {
    return {
      show: false,
      selected: this.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '/static/font-awesome/css/font-awesome.min.css';

.select {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  text-align: left;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-touch-action: none;
     -moz-touch-action: none;
      -ms-touch-action: none;
          touch-action: none;
}
.select-header {
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 20px;
  min-width: 10rem;
  min-height: 34px;
  padding: 10px 12px;
  white-space: nowrap;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.select-header:focus {
  outline: none;
}
.select-header:hover {
  border-color: #409eff;
}
.select-icon {
  float: right;
}
.select-icon .fa {
  transition: all 200ms ease;
}
.select-icon .fa-angle-active{
  transform: rotate(180deg);
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
.select-droplist {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px -4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  line-height: 32px;
  min-width: 10rem;
  padding: 0px;
  margin-bottom: 10px;
  position: absolute;
  top: 50px;
  list-style: none;
  z-index: 2;
  -webkit-font-smoothing: antialiased;
}
.select-droplist li {
  box-sizing: border-box;
  color: #5a5e66;
  cursor: pointer;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
  padding: 0 1rem;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.select-droplist li:hover {
  background-color: #f5f7fa;
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
