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
</style>
