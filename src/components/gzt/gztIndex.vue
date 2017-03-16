<template>
    <div id='oa'>
        工作台
        <div class="oa_left">
            <div class="oa_left_nav">
                <router-link class="nav_li" to="/oa/report">工作汇报</router-link>
                <router-link class="nav_li" to="/oa/examine">审批</router-link>
                <router-link class="nav_li" to="/oa/assignment">任务</router-link>
                <router-link class="nav_li" to="/oa/notice">公告</router-link>
            </div>
            <div class="oa_left_con">
                <router-view keep-alive></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'oa'

}
</script>

<style scoped>

</style>