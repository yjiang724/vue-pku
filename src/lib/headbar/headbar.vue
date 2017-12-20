<template>
  <section class="headbar">
    <div class="topLine">
      <ul class="">
        <li><a href="https://portal.pku.edu.cn/portal2013/" target="_blank">门户</a></li>
        <li><a href="http://its.pku.edu.cn/" target="_blank">网络</a></li>
        <li><a href="http://mail.pku.edu.cn/" target="_blank">邮箱</a></li>
        <li><a href="http://bbs.pku.edu.cn/" target="_blank">BBS</a></li>
        <li><a href="http://www.lib.pku.edu.cn/portal/" target="_blank">图书馆</a></li>
        <li><span>欢迎您！</span> <span>{{ userName }}</span></li>
      </ul>
    </div>
    <nav class="nav">
      <div class="nav-left">
        <img :src="logo" v-if="logo.length > 0">
      </div>
      <div class="nav-center">
        <span>中国社会科学调查中心</span>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'pkuHeadbar',
  props: {
    userName: {
      type: String,
      default: 'userName'
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
.headbar {
    color: #ffffff;
}
.topLine {
    padding: 0.3rem 0;
    font-size: 0.7rem;
    background-color: #700005;
    display: flex;
    justify-content: flex-end;
    height: 1rem;
    max-height: 1rem;
}
.nav {
    background-color: #8f000b;
    padding: 1rem 1.2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    max-height: 3.5rem;
}
.nav-left {
}
.nav-center {
    font-size: 1.8rem;
    padding: 0 1rem 0 1rem;
    letter-spacing: 0.2rem;
}
.nav-right {
    font-size: 0.7rem;
    flex-basis: 8rem;
}
.topLine ul {
  text-align: right;
  list-style-type: none;
  flex-basis: 30rem;
  align-self: center;
  padding-right: 2rem;
}
.topLine li {
  display: inline-block;
  padding: 0 0.2rem;
}
.topLine li:nth-child(-n+5)::after {
  padding-left: 0.5rem;
  content: "|";
  color: #700005;
  border-right: 1px solid #fff;
}
li a {
    color: #ffffff;
    text-decoration: blink;
}
</style>
