<template>
  <header>
    <nav class="nav">
      <div class="logo">
        <img :src="imgSrc" />
      </div>
      <ul class="menu">
        <li><pku-input :border="false"></pku-input></li>
        <li><a>指南</a></li>
        <li class="is-active"><a>组件</a></li>
        <li><a>资源</a></li>
        <li><pku-select class="log" selected="日志" :border="false" :list="methods" @callback="onSelectEventHandler"></pku-select></li>
      </ul>
    </nav>
  <header>
</template>

<script>

export default {
  name: 'pkuHeader',
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    methods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onSelectEventHandler (val) {
      console.log(val)
    }
  }
}
</script>
<style scoped>
  header {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    box-shadow: 0 1px 0 hsla(0,0%,86%,.3);
    background-color: #ffffff;
  }
  nav {
    position: relative;
    width: 90%;
    z-index: 1500;
    max-width: 1080px;
    height: 80px;
    margin: 0 auto;
    background-color: inherit;
    line-height: 80px;
    font-size: 16px;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  nav > div, nav > ul {
    display: inline-block;
  }
  .logo {
    float: left;
    height: 60px;
    padding: 10px 0;
  }
  .menu {
    float: right;
  }
  ul {
    list-style-type: none;
  }
  ul.menu > li {
    position: relative;
    display: inline-block;
  }
  ul li a {
    display: block;
    padding: 0 22px;
    color: #888;
    text-decoration: none;
    cursor: pointer;
    transition: color 500ms ease;
  }
  ul li a:hover {
    color: #333;
  }
  .is-active::after {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 15px;
    left: calc(50% - 7px);
    width: 14px;
    height: 4px;
    background: #409eff;
  }
  .menu .log {
    min-width: 120px;
  }
  .logo img {
    height: 60px;
    border-radius: 6px;
  }
</style>
