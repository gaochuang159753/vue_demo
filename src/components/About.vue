<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    <li>我正在积极寻找前端方向工作机会</li>
    <li>2年前端开发经验</li>
    <li>坐标北京</li></br>
    <li>email：web_liugaoshuai@163.com</li></br>
    <li>phone：15034513209</li>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'About'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
  line-height: 40px;
}

a {
  color: #42b983;
}
</style>
