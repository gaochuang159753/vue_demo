<template>
  <div id="app">
    <div class="right">
      <div class="right_box">
        <router-view keep-alive></router-view>
      </div>
    </div>
    <div class="left">
      <div class="nav">
        <router-link class="nav_li" to="/">首页</router-link>
        <router-link class="nav_li" to="/xzgl">薪资管理</router-link>
        <router-link class="nav_li" to="/zzrs">组织人事</router-link>
        <router-link class="nav_li" to="/qxgl">权限管理</router-link>
        <router-link class="nav_li" to="/oa">工作台</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
.left{
  float: left;
  margin-left: -100%;
}
.right{
  float: left;
  width: 100%;
}
.right_box{
  margin: 0 20px 0 282px;
}
.nav{
  width: 240px;
  margin: 0 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}
.nav_li{
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  text-align: left;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: block;
  color: #666;
  text-decoration: none;
}
.nav_li:last-child{
  border-bottom: none;
}
.nav_li:hover{
  background: #2C3E50;
  color: #fff;
}

</style>
