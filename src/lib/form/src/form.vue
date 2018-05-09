<template>
  <div :class="{ inline: inline }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'pkuForm',
  props: {
    inline: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
div.inline >>> section label {
  display: inline;
}
div.inline >>> section input {
  width: 70%;
}
div.inline >>> section .select {
  width: 70%;
}
div.inline >>> section textarea {
  width: 70%;
}
</style>
