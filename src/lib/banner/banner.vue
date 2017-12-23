<template>
  <section class="banner">
    <div class="topLine">
      <ul class="">
        <li><a href="https://portal.pku.edu.cn/portal2013/" target="_blank">门户</a></li>
        <li><a href="http://its.pku.edu.cn/" target="_blank">网络</a></li>
        <li><a href="http://mail.pku.edu.cn/" target="_blank">邮箱</a></li>
        <li><a href="http://bbs.pku.edu.cn/" target="_blank">BBS</a></li>
        <li><a href="http://www.lib.pku.edu.cn/portal/" target="_blank">图书馆</a></li>
        <li><span>欢迎您！</span> <span>{{ user }}</span></li>
      </ul>
    </div>
    <nav class="nav">
      <div class="nav-left">
        <img :src="logo" v-if="logo.length > 0">
      </div>
      <div class="nav-center">
        <span>{{ title }}</span>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'pkuBanner',
  props: {
    user: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    logo: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  color: #ffffff;
}
.topLine {
  padding: 6px 0;
  font-size: 14px;
  background-color: #700005;
  display: flex;
  justify-content: flex-end;
  height: 20px;
  max-height: 20px;
}
.topLine ul {
  text-align: right;
  list-style-type: none;
  flex-basis: 600px;
  align-self: center;
  padding-right: 30px;
}
.topLine li {
  display: inline-block;
  padding: 0 4px;
}
.topLine li:nth-child(-n+5)::after {
  padding-left: 10px;
  content: "|";
  color: #700005;
  border-right: 1px solid #fff;
}

.nav {
  background-color: #8f000b;
  padding: 20px 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 70px;
  max-height: 70px;
}
.nav-left {
}
.nav-center {
  font-size: 36px;
  padding: 0 36px;
  letter-spacing: 4px;
}
li a {
  color: #ffffff;
  text-decoration: none;
}
</style>
