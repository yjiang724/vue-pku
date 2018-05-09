<template>
  <div class='breadcrumb'>
    <div v-for="(item, $index) in value" :class="{'active': $index === value.length - 1, 'separator': separator === 'arrow'}" @click="func[$index]">{{item}}</div>
  </div>
</template>

<script>
export default {
  name: 'pkuBreadcrumb',
  props: {
    separator: {
      type: String,
      default: 'line'
    },
    value: {
      type: Array,
      default () {
        return ['首页', '子页面一', '子页面二']
      }
    },
    func: {
      type: Array,
      default () {
        return [
          () => {},
          () => {},
          () => {},
          () => {}
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb {
  text-align: left;
  padding: 20px 40px;
  font-size: 14px;
  line-height: 30px;
  font-weight: 400;
  color: #5a5e66;
}
.breadcrumb > div {
  display: inline-block;
  transition: color .2s cubic-bezier(.645,.045,.355,1);
}
.breadcrumb > div:hover {
  color: #0091EA;
  cursor: pointer;
}
.breadcrumb > div.active {
  font-weight: 700;
  color: #2d2f33;
  cursor: pointer;
}
.breadcrumb > div + div::before{
  margin: 0 9px;
  font-weight: 500;
  color: #b4bccc;
  content: "/";
}
.breadcrumb > div + .separator::before{
  margin: 0 9px;
  font-weight: 500;
  color: #b4bccc;
  content: ">";
}
</style>
