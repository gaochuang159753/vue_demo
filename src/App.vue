<template>
  <div id="app">
    <div class="app_nav">
      <div class="app_nav_logo"></div>
      <div class="app_nav_access">
      <a href="">协同办公</a>
      <a href="">公司管理</a>
      </div>
      <div class="app_nav_msg">个人设置</div>
    </div>
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
            <router-link class="app_nav_li el-menu-item" to="/pay/payManage" active-class="is-active">工资管理</router-link>
            <router-link class="app_nav_li el-menu-item" to="/pay/payWages"  active-class="is-active">发放工资条</router-link>
            <router-link class="app_nav_li el-menu-item" to="/pay/payRecord"  active-class="is-active">发放记录</router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">组织人事</template>
            <el-menu-item index="3-1">组织管理</el-menu-item>
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

import Style from 'src/style/main.css';// 公共样式文件
import Util from 'script/util.js';//公共方法
import Data from 'script/data.js';//公共数据,模拟后台请求


export default {
  name: 'app'
}
</script>

<style>
.app_nav{height: 76px;line-height: 76px;background-color: #3e78c1;}
.app_nav_logo{height: 76px;width: 270px;float: left;}
.app_nav_access a{display: inline-block;float: left;line-height: 76px;text-align: center;color: #fff;padding: 0 20px;}
.app_nav_access a:hover{color: #fff;background: #5f8ec9;}
.app_nav_msg{float: right;color: #fff;padding: 0 20px;}
.app_left{float: left; margin-left: -100%;width: 270px;}
.app_right{float: left;width: 100%;background: #f5f8fa;}
.app_right_box{margin: 20px 20px 0 290px;}
</style>
