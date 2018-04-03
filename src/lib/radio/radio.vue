<template>
  <div class="radio">
    <label 
      role="radio" 
      v-for="(item, $id) in message" tabindex="0" 
      :class="{'is-checked': value === $id, 'disabled': disabled}" 
      v-bind:data-key="item[exportKey] || ''" 
      v-if="importKey.length > 0"
      aria-checked="true">
      <span class="radio-input">
        <span class="radio-arrow" @click="onCheck($event, $id)"></span>
        <input type="radio">
      </span>
      <span class="radio-label" @click="onCheck($event, $id)">{{ item[importKey] }}</span>
    </label>
    <label v-else>
        <span class="radio-input">
        <span class="radio-arrow" @click="onCheck($event, $id)"></span>
        <input type="radio">
      </span>
      <span class="radio-label" @click="onCheck($event, $id)">{{ item }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'pkuRadio',
  props: {
    message: {
      type: Array,
      default () {
        return ['选项一', '选项二']
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: false,
      valueKey: undefined
    }
  },
  methods: {
    onCheck (evt, index) {
      if (!this.disabled) {
        this.value = index
        evt = evt.target
        while (evt.tagName !== 'LABEL') {
          evt = evt.parentNode
        }
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
.radio {
  display: inline-block;
  line-height: 20px;
  color: #5a5e66;
  font-size: 14px;
  font-weight: 500;
  padding: 11px 10px;
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none; 
}
.radio label {
  outline: none;
}
.radio label + label {
  margin-left: 30px;
}
.radio-label{
  cursor: pointer;
  transition: all 200ms ease;
}
.radio-input {
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.radio-arrow {
    display: inline-block;
    position: relative;
    border: 1px solid #d8dce5;
    border-radius: 14px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #ffffff;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.radio-arrow::after {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 35%;
    top: 35%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
}
.is-checked {
  color: #409eff;
}
.is-checked .radio-arrow {
  background-color: #409eff;
  border-color: #409eff;
}
.is-checked .radio-arrow::after {
  transform: rotate(45deg) scaleY(1);
}
.radio input {
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  left: -999px;
}

label.disabled .radio-arrow{
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  outline: none;
}
label.disabled .radio-label {
  cursor: not-allowed;
}
</style>
