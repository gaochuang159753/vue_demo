<template>
  <div id="app">
    <div class="app_right">
      <div class="app_right_box">
        <router-view keep-alive></router-view>
      </div>
    </div>
    <div class="app_left">
      <el-menu>
        <router-link class="app_nav_li el-menu-item el-menu-item-title" to="/index" active-class="active">首页</router-link>
        <el-submenu index="2">
          <template slot="title">薪资管理</template>
            <router-link class="app_nav_li el-menu-item" to="/pay/payManage" active-class="is-active">角色管理</router-link>
            <router-link class="app_nav_li el-menu-item" to="" >发放工资条</router-link>
            <router-link class="app_nav_li el-menu-item" to="" >发放记录</router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">公司人事</template>
            <el-menu-item index="3-1">公司管理</el-menu-item>
            <el-menu-item index="3-2">职位管理</el-menu-item>
            <el-menu-item index="3-3">员工管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">权限管理</template>
            <router-link class="app_nav_li el-menu-item" to="/jur/role" active-class="is-active">角色管理</router-link>
            <router-link class="app_nav_li el-menu-item" to="/jur/accredit" active-class="is-active">员工授权</router-link>
        </el-submenu>
        <router-link class="app_nav_li el-menu-item el-menu-item-title" to="/oa/report" active-class="is-active">工作台</router-link>
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


</style>
