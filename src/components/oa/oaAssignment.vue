<template>
    <div id='oaAssignment'>
        <el-menu theme="light" :default-active="activeIndex" class="assignment_nav" mode="horizontal">
            <el-menu-item index="1" @click="activeIndex=1">任务列表</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建任务</el-menu-item>
        </el-menu>
        <div class="assignment_con" v-show="activeIndex==1">
            <el-table :data="assignmentList" style="width: 100%" align="center" class="assignment_table">
                <el-table-column prop="createTime" label="时间" class="assignment_td"></el-table-column>
                <el-table-column prop="title" label="任务标题" class="assignment_td"></el-table-column>
                <el-table-column prop="content" label="任务内容" class="assignment_td"></el-table-column>
                <el-table-column prop="userName" label="发起人" class="assignment_td"></el-table-column>
                <el-table-column prop="userName" label="执行人" class="assignment_td"></el-table-column>
                <el-table-column label="编辑" class="assignment_td">
                    <template scope="scope">
                        <el-button @click="assignmentDetails(scope.$index);activeIndex=3" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="assignment_page">
                <el-pagination layout="prev, pager, next" :total="assignmentTotalPage" @current-change="changePage"></el-pagination>
            </div>
        </div>
        <div class="assignment_con" v-show="activeIndex==3">
            <div class="assignment_con_label">
                <label for="">名字</label>
                <div>{{assignmentDetailsList.userName}}</div>
            </div>
            <div class="assignment_con_label">
                <label for="">时间</label>
                <div>{{assignmentDetailsList.createTime}}</div>
            </div>
            <div class="assignment_con_label">
                <label for="">任务标题</label>
                <div>{{assignmentDetailsList.title}}</div>
            </div>
            <div class="assignment_con_label">
                <label for="">任务内容</label>
                <div>{{assignmentDetailsList.content}}</div>
            </div>
            <div class="assignment_con_label">
                <label for="">开始时间</label>
                <div>{{assignmentDetailsList.startDate | dateZ}}</div>
            </div>
            <div class="assignment_con_label">
                <label for="">结束时间</label>
                <div>{{assignmentDetailsList.expireDate | dateZ}}</div>
            </div>
            <div class="assignment_con_label">
                <label for="">任务进程</label>
                <div>{{assignmentDetailsList.userNam}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'oaAssignment',
    data (){
        return{
            assignmentList: [],
            assignmentPage: 1,
            assignmentTotalPage: 0,
            activeIndex: 1,
            assignmentForm: '',
            assignmentDetailsList: '',
        }
    },
    mounted: function (){
        this.ajax(this.assignmentPage)
    }, 
    filters: {
        dateZ: function (value){
            return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/,' '); 
        }
    },
    methods: {
        ajax: function (num){
            var self = this;
            this.$ajax.post('http://192.168.3.222:8080/hrm/api.do', 
                'method=taskInfo/getTaskInfos'
                +'&param='+JSON.stringify({
                    "userId": 61,
                    "companyId": 61,
                    "pageNum": num,
                    "pageSize": 10,
                    "type": 2,
                })
            )
            .then(function (res) { 
                self.assignmentList = res.data.data.task;
                self.assignmentTotalPage = res.data.data.page.totalCount;
                console.log(self.assignmentList);
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        changePage: function(page){
            this.assignmentPage = page
            this.ajax(this.assignmentPage);
        },
        assignmentDetails: function(index){
            this.assignmentDetailsList = this.assignmentList[index];
            this.assignmentDetailsCourse(this.assignmentDetailsList.id);
        },
        assignmentDetailsCourse: function(id){
            this.$ajax.post('http://192.168.3.222:8080/hrm/api.do', 
                'taskInfo/getTaskInfoById'
                +'&param='+JSON.stringify({
                        "userId": 61,
                        "companyId": 61,
                        "id": id,
                        "type": 3,
                })
            )
            .then(function (res) { 
                console.log(res)
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    }

}
</script>

<style scoped>
    .assignment_nav{
        margin: 30px 0;
    }
    .assignment_page{
        margin-top: 30px;
    }
    .assignment_con_label{
        line-height: 30px;
    }
    .assignment_con_label label{
        height: 30px;
        line-height: 30px;
        width: 100px;
        float: left;
        text-align: right;
    }
    .assignment_con_label div{
        text-align: left;
        padding-left: 120px;
    }
</style>