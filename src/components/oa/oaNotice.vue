<template>
    <div class='oaNotice'>
        <el-menu theme="light" :default-active="activeIndex" class="notice_nav" mode="horizontal">
            <el-menu-item index="1" @click="activeIndex=1" >公告列表</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建公告</el-menu-item>
        </el-menu>
        <div class="notice_con" v-show="activeIndex==1">
            <el-table :data="noticeList" style="width: 100%" align="center" class="notice_table">
                <el-table-column prop="createTime" label="时间" class="notice_td"></el-table-column>
                <el-table-column prop="title" label="标题" class="notice_td"></el-table-column>
                <el-table-column prop="content" label="内容" class="notice_td"></el-table-column>
                <el-table-column prop="userName" label="发送人" class="notice_td"></el-table-column>
            </el-table>
            <div class="notice_page">
                <el-pagination layout="prev, pager, next" :total="noticeTotalPage" @current-change="changePage"></el-pagination>
            </div>
        </div>

        <div class="notice_con" v-show="activeIndex==2">
            <el-form label-position="right" label-width="150px" :model="noticeForm">
                <el-form-item label="选择接收人" class="notice_form_input">
                    <el-input v-model="noticeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="公告标题" class="notice_form_input">
                    <el-input v-model="noticeForm.title"></el-input>
                </el-form-item>
                <el-form-item label="公告签名" class="notice_form_input">
                    <el-input v-model="noticeForm.type"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" class="notice_form_input">
                    <el-input v-model="noticeForm.type" type="textarea" row="4"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="activeIndex=1">取消</el-button>
                <el-button type="primary">发送</el-button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'oaNotice', 
    data () {
        return{
            noticeList: [],
            noticePage: 1,
            noticeTotalPage: 0,
            activeIndex: true,
            noticeForm: '',
        }
    }, 
    mounted: function (){
        this.ajax(this.noticePage)
    },                                 
   
    methods: {
        console: function(){
            console.log(this.activeIndex);
        },
        ajax: function (num){
            var self = this;
            this.$ajax.post('http://192.168.3.222:8080/hrm/api.do', 
                'method=announcement/getAnnouncements'
                +'&param='+JSON.stringify({
                    "userId": 61,
                    "companyId": 61,
                    "pageNum": num,
                    "pageSize": 10
                })
            )
            .then(function (res) { 
                self.noticeList = res.data.data.announcements;
                self.noticeTotalPage = res.data.data.page.totalCount;
                console.log(self.noticeList);
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        alertBox: function(){
            this.noticeList[0] = 'helloworld';
            console.log(this.noticeList);
        },
        changePage: function(page){
            this.noticePage = page
            this.ajax(this.noticePage);
        }
    }
}
</script>

<style scoped>
.notice_nav{
    margin: 30px 0;
}
.notice_page{
    margin-top: 30px;
}
.notice_form_input{
    width: 60%;
}
</style>