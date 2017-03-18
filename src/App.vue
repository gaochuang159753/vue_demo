<template>
  <div id="app">
    <div class="app_right">
      <div class="app_right_box">
        <router-view keep-alive></router-view>
      </div>
    </div>
    <div class="app_left">
      <div class="app_nav">
        <router-link class="app_nav_li" to="/index" active-class="active">首页</router-link>
        <router-link class="app_nav_li" to="/xzgl" active-class="active">薪资管理</router-link>
        <router-link class="app_nav_li" to="/zzrs" active-class="active">组织人事</router-link>
        <router-link class="app_nav_li" to="/qxgl" active-class="active">权限管理</router-link>
        <router-link class="app_nav_li" to="/oa" active-class="active">工作台</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import mainCss from 'src/style/mainCss.css'

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding-top: 60px;
}
.app_left{
  float: left;
  margin-left: -100%;
}
.app_right{
  float: left;
  width: 100%;
}
.app_right_box{
  margin: 0 20px 0 282px;
}
.app_nav{
  width: 240px;
  margin: 0 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}
.app_nav_li{
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
.app_nav_li:last-child{
  border-bottom: none;
}
.app_nav_li:hover{
  background: #2C3E50;
  color: #fff;
}
.app_nav_li.active{
  background: #2C3E50;
  color: #fff;
}

</style>
