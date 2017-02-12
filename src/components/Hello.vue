<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li>vue-router路由控制</li>
      <li>vuex状态管理</li>
      <li>webpack打包</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
  font-size: 16px;
  margin: 0 10px;
  line-height: 30px;
  text-align: center;
}
a {
  color: #42b983;
}
</style>
