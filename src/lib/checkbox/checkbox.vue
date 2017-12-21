<template>
  <div class="checkbox">
    <label role="checkbox" :class="{'is-checked': checked, 'disabled': disabled}" aria-checked="true">
      <span class="checkbox-input">
        <span class="checkbox-arrow" @click="onCheck"></span>
      </span>
      <span class="checkbox-label" @click="onCheck">{{value}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'pkuCheckbox',
  props: {
    value: {
      type: String,
      default: '选择框'
    },
    check: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: this.check
    }
  },
  methods: {
    onCheck () {
      if (!this.disabled) {
        this.checked = !this.checked
        this.$emit('callback', this.checked)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
.checkbox {
  display: inline-block;
  line-height: 20px;
  color: #5a5e66;
  font-size: 14px;
  font-weight: 500;
  padding: 11px 10px;
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none; 
  outline: none;
}
.checkbox-label{
  cursor: pointer;
  transition: all 200ms ease;
}
.checkbox-input {
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.checkbox-arrow {
    display: inline-block;
    position: relative;
    border: 1px solid #d8dce5;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #ffffff;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.checkbox-arrow::after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    transform-origin: center;
}
.disabled .checkbox-label{
  color: #c0c4cc;
  cursor: not-allowed;
}
.disabled .checkbox-input .checkbox-arrow{
  background-color: #edf2fc;
  border-color: #dcdfe6;
  cursor: not-allowed;
}
.checkbox .is-checked {
  color: #409eff;
}
.checkbox .is-checked .checkbox-arrow {
  background-color: #409eff;
  border-color: #409eff;
}
.is-checked .checkbox-arrow::after {
  transform: rotate(45deg) scaleY(1);
}
.checkbox input {
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  left: -999px;
  display: none;
}
</style>
