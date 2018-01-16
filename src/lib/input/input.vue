<template>
  <input
    type="text"
    v-model="value"
    :class="{'input-noborder': !border}"
    :disabled="disabled">
</template>

<script>
export default {
  name: 'pkuInput',
  props: {
    message: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: this.message
    }
  },
  watch: {
    message (val) {
      this.value = val
    }
  }
}
</script>
<style scoped>
input {
  padding: 6px 12px;
  // min-width: 200px;
  width: inherit;
  color: rgba(0,0,0,.4);
  font-size: 14px;
  line-height: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: text;
  white-space: nowrap;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  box-shadow: 0 1px 6px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.12);
  transition: all 500ms ease;
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none;
  -webkit-font-smoothing: antialiased;
}
input.input-noborder {
  border-color: #dcdfe6;
  box-shadow: none;
}
input:focus {
  outline: none;
  // box-shadow: 0 1px 6px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.12);
  border-color: rgb(25, 118, 210);
}
input:disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  outline: none;
}
</style>
