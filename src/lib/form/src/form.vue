<template>
  <form :class="{ inline: inline }">
    <slot></slot>
  </form>
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
form.inline >>> section label {
  display: inline;
}
form.inline >>> section input {
  width: 70%;
}
form.inline >>> section .select {
  width: 70%;
}
form.inline >>> section textarea {
  width: 70%;
}
</style>
