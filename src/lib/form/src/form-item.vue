<template>
  <section>
    <label v-if="label.length > 0">{{ label }}</label>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'pkuFormItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
section {
  line-height: 20px;
  color: #5a5e66;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}

section label {
  display: block;
  padding-right: 10px;
  padding-bottom: 10px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif; 
  font-weight: bold; 
  -webkit-font-smoothing: antialiased; 
}
</style>
