<template>
  <div id="app">
    <div class="app_right">
      <div class="app_right_box">
        <router-view keep-alive></router-view>
      </div>
    </div>
    <div class="app_left">
      <el-menu>
        <el-menu-item index="1"><router-link class="app_nav_li" to="/index" active-class="active">首页</router-link></el-menu-item>
        <el-submenu index="2">
          <template slot="title">薪资管理</template>
            <el-menu-item index="2-1">工资管理</el-menu-item>
            <el-menu-item index="2-2">发放工资条</el-menu-item>
            <el-menu-item index="2-3">发放记录</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">公司人事</template>
            <el-menu-item index="3-1">公司管理</el-menu-item>
            <el-menu-item index="3-2">职位管理</el-menu-item>
            <el-menu-item index="3-3">员工管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">权限管理</template>
            <el-menu-item index="4-1">角色权限</el-menu-item>
            <el-menu-item index="4-2">员工授权</el-menu-item>
        </el-submenu>
        <el-menu-item index="5"><router-link class="app_nav_li" to="/oa" active-class="active">工作台</router-link></el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import main from 'src/style/main.css'

export default {
  name: 'app'
}
</script>

<style>

.app_left{
  float: left;
  margin-left: -100%;
  width: 262px;
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
  height: 56px;
  line-height: 56px;
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


</style>
