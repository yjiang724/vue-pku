<template>
  <button class="btn" :disabled="disabled == true" @click="onUpload" v-if="file === true">
    <input class="btn-file" type="file" @change="onBeforeUpdate" :accept="accept" />
    <span class="btn-file-label">{{label}}</span>
    <i class="fa" :class="awicon" v-if="icon !== ''"><span>{{value}}</span></i>
    <span v-else>{{value}}</span>
  </button>
  <button class="btn" :disabled="disabled == true" v-else>
    <i class="fa" :class="awicon" v-if="icon !== ''"><span>{{value}}</span></i>
    <span v-else>{{value}}</span>
  </button>
</template>

<script>
export default {
  name: 'pkuButton',
  props: {
    value: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    file: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    }
  },
  computed: {
    awicon () {
      return 'fa-' + this.icon
    }
  },
  data () {
    return {
      label: ''
    }
  },
  methods: {
    onBeforeUpdate (evt) {
      let label = ''
      Array.prototype.forEach.call(evt.target.files, function (item) {
        label += item.name
      })
      this.label = label
    },
    onUpload (evt) {
      evt = evt.target
      while (evt.tagName.toUpperCase() !== 'BUTTON') {
        evt = evt.parentNode
      }
      evt.firstElementChild.click()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '/static/font-awesome/css/font-awesome.css';

.btn {
  display: inline-block;
  position: relative;
  padding: 9px 14px;
  margin-bottom: 0;
  min-width: 70px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  white-space: nowrap;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #5a5e66;
  text-transform:uppercase;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  background-color: #ffffff;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
}
.btn:focus {
  outline: none;
}
.btn.btn-default {
  background-color: #ffffff;
}
.btn.btn-default:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.btn.btn-primary {
  background-color: rgb(25, 118, 210);
  color: #ffffff;
}
.btn.btn-primary:hover {
  background-color: rgba(25, 118, 210, 0.75);
}
.btn.btn-warning {
  background-color: rgb(245, 124, 0);
  color: #ffffff;
}
.btn.btn-warning:hover {
  background-color: rgba(245, 124, 0, 0.75);
}
.btn.btn-success {
  background-color: rgb(56, 142, 60);
  color: #ffffff;
}
.btn.btn-success:hover {
  background-color: rgba(56, 142, 60, 0.75);
}
.btn.btn-danger {
  background-color: rgb(211, 47, 47);
  color: #ffffff;
}
.btn.btn-danger:hover {
  background-color: rgba(211, 47, 47, 0.75);
}
.btn.btn-disabled {
  color: #c0c4cc;
  background-color: #F5F5F5;
  cursor: not-allowed; 
}
.btn.btn-disabled:hover {
  cursor: not-allowed; 
}
.btn:active {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.8) 0px 1px 4px;
}
.btn.btn-disabled:active {
  box-shadow: 0 1px 6px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.12);
}
.btn span {
  padding:0 2px;
}
.btn-file {
  display: none;
}
.btn-file-label {
  display: inline-block;
  position: absolute;
  left: 9rem;
  color: #5a5e66;
  padding: 0 10px;
  line-height: 20px;
}
button:disabled{
  border: 1px solid #DDD;
  background-color: #F5F5F5;
  color: #ACA899;
}
</style>
