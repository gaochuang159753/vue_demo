<template>
    <div id='oa'>
        <div class="oa_left">
            <el-row class="oa_left_nav" :gutter="20">
                <el-col :span="6"><router-link class="oa_left_nav_li" to="/oa/report">工作汇报</router-link></el-col>
                <el-col :span="6"><router-link class="oa_left_nav_li" to="/oa/examine">审批</router-link></el-col>
                <el-col :span="6"><router-link class="oa_left_nav_li" to="/oa/assignment">任务</router-link></el-col>
                <el-col :span="6"><router-link class="oa_left_nav_li" to="/oa/notice">公告</router-link></el-col>
            </el-row>
            <div class="oa_left_con">
                <router-view keep-alive></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'oa',
    data () {

    }
}
</script>

<style scoped>
.oa_left_nav_li{
    display: inline-block;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #666;
    text-decoration: none;
    border: 1px solid #eee;
}
</style>