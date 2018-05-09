<template>
  <div class="select">
    <div class="select-header" :class="{'select-noborder': !border, 'select-disabled': disabled}" @click="onShowEventHandler">
      <span class="select-label" v-if="label"> {{ label }} </span>
      <span class="select-content" v-if="html" v-html="value || '请选择'"></span>
      <span class="select-content" v-else>{{ value || '请选择' }}</span>
      <span class="select-icon"><i class="fa fa-angle-down" :class="{'fa-angle-active': show}" aria-hidden="true"></i></span>
    </div>
    <transition name="fade">
      <ul class="select-droplist" :class="{'select-is-labeled': label}" :class="animation" v-show="show" @click="onClickEventHandler">
        <li v-for="item in list" v-bind:data-key="item[exportKey] || ''" v-if="item.disabled" class="select-disabled" disabled="item.disabled">
          <span v-if="html" v-html="item[importKey]"></span>
          <span v-else>{{ item[importKey] }}</span>
        </li>
        <li v-else-if="importKey.length > 0" v-bind:data-key="item[exportKey] || ''">
          <span v-if="html" v-html="item[importKey]"></span>
          <span v-else>{{ item[importKey] }}</span>
        </li>
        <li v-else>
          <span v-if="html" v-html="item"></span>
          <span v-else>{{ item }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pkuSelect',
  props: {
    html: {
      type: Boolean,
      default: false
    },
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
    disabled: {
      type: Boolean,
      default: false
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
    reset () {
      this.value = this.selected
    },
    onShowEventHandler () {
      if (!this.disabled) {
        this.show = !this.show
      }
    },
    onClickEventHandler (evt) {
      if (evt.target.getAttribute('disabled') !== 'disabled') {
        evt = evt.target
        while (evt.tagName !== 'LI') {
          evt = evt.parentNode
        }
        this.value = evt.innerText
        this.show = !this.show
        if (evt.dataset.key) {
          this.valueKey = evt.dataset.key
          this.$emit('callback', evt.dataset.key)
        } else {
          this.$emit('callback', this.value)
        }
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
  min-width: 160px;
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
  padding: 6px 12px;
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
  // padding: 9px 12px;
  cursor: not-allowed;
  // vertical-align: middle;
}
.select-header span.select-content {
  display: inline-block;
  width: calc(100% - 150px);
  height: 18px;
  line-height: 18px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.select-is-labeled.select-droplist::before {
  left: 70px;
}
.select-disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  outline: none;
}

.select-droplist {
  position: absolute;
  width: 100%;
  top: 50px;
  margin-bottom: 50px;
  padding: 6px 0px;
  font-size: 14px;
  line-height: 32px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px -4px 6px, rgba(0, 0, 0, 0.6) 0px 1px 4px;
  z-index: 2;
  list-style: none;
}
.select-droplist li {
  position: relative;
  min-height: 28px;
  padding: 0 20px;
  line-height: 28px;
  white-space: normal;
  cursor: pointer;
}
.select-droplist li:not(.select-disabled) {
  text-indent: 20px;
}
.select-droplist li:hover {
  background-color: #f5f7fa;
}
li.select-disabled {
  cursor: default;
  padding: 0 10px;
  font-weight: bold;
  color: #000;
}
li.select-disabled:hover {
  background-color: #ffffff;
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

.select-animation {
}
.select-animation::after {
  content: "";
  display: block;
  position: relative;
  width: 20%;
  height: 2px;
  border-radius: 6px;
  animation: mymove 1s infinite;
  -webkit-animation: mymove 1s infinite;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  background: -webkit-linear-gradient(left, #FFB5B5, #FF0000, #FFB5B5);
  background: -o-linear-gradient(right, #FFB5B5, #FF0000, #FFB5B5);
  background: -moz-linear-gradient(right, #FFB5B5, #FF0000, #FFB5B5);
  background: linear-gradient(to right, #FFB5B5, #FF0000, #FFB5B5);
}
.select-animation .select-header {
  cursor: not-allowed;
  border: none;
}
@keyframes mymove {
  from {left: 0px;}
  to {left: 80%;}
}

@-webkit-keyframes mymove {
  from {left:0px;}
  to {left: 80%;}
}
</style>
