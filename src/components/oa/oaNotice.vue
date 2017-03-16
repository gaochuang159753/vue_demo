<template>
    <div class='oaNotice'>
        工作台-公告
        <el-button @click="ajax()">{{msg}}</el-button>
        <el-button @click="alertBox()">{{msg}}</el-button>
        <el-table :data="noticeList" style="width: 100%">
            <el-table-column prop="createTime" label="日期" class="notice_td"></el-table-column>
            <el-table-column prop="title" label="日期" class="notice_td"></el-table-column>
            <el-table-column prop="content" label="日期" class="notice_td"></el-table-column>
            <el-table-column prop="userName" label="日期" class="notice_td"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'oaNotice', 
    data () {
        return{
            noticeList: [],
            msg: 'AJAX'
        }
    },                                      
   
    methods: {
        ajax: function (){
            var self = this;
            this.$ajax.post('http://192.168.3.222:8080/hrm/api.do', 
                'method=announcement/getAnnouncements'
                +'&param='+JSON.stringify({
                    "userId": 61,
                    "companyId": 61,
                    "pageNum": 1,
                    "pageSize": 10
                })
            )
            .then(function (res) { 
                self.noticeList = res.data.data.announcements;
                console.log(self.noticeList);
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        alertBox: function(){
            this.noticeList[0] = 'helloworld';
            console.log(this.noticeList);
        }
    }
}
</script>

<style scoped>

</style>