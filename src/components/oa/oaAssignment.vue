<template>
    <div id='oaAssignment'>
        <el-menu theme="light" :default-active="activeIndex" class="assignment_nav" mode="horizontal">
            <el-menu-item index="1" @click="activeIndex=1">任务列表</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建任务</el-menu-item>
            <el-menu-item index="3" @click="activeIndex=3">新建任务</el-menu-item>
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
        <div class="assignment_con" v-show="activeIndex==2">
            <el-form label-position="right" label-width="150px" :model="assignmentForm">
                <el-form-item label="执行人" class="assignment_form_input">
                    <el-button>获取执行人</el-button>
                </el-form-item>
                <el-form-item label="任务标题" class="assignment_form_input">
                    <el-input v-model="assignmentForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="任务内容" class="assignment_form_input">
                    <el-input v-model="assignmentForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="assignment_form_input">
                    <div class="block assignment_form_input">
                        <el-date-picker
                        v-model="startTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="结束时间" class="assignment_form_input">
                    <div class="block assignment_form_input">
                        <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="activeIndex=1">返回</el-button>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
        <div class="assignment_con" v-show="activeIndex==3">
            <el-form label-position="right" label-width="150px" :model="assignmentDetailsData">
                <el-form-item label="用户名" class="assignment_form_input">
                    <el-input v-model="assignmentDetailsData.userName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发送时间" class="assignment_form_input">
                    <el-input v-model="assignmentDetailsData.createTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="执行对象" class="assignment_form_input">
                    <el-input v-model="assignmentDetailsData.sendToPersonName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="任务标题" class="assignment_form_input">
                    <el-input v-model="assignmentDetailsData.title" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="任务内容" class="assignment_form_input">
                    <el-input v-model="assignmentDetailsData.content" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="assignment_form_input">
                    <el-input v-model="assignmentDetailsData.startDate" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="截止时间" class="assignment_form_input">
                    <el-input v-model="assignmentDetailsData.expireDate" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="activeIndex=1">返回</el-button>
            </div>
        </div>
        
    </div>
</template>

<script>
import Util from '../module/util.js';

export default {
    name: 'oaAssignment',
    data (){
        return{
            assignmentList: [],
            assignmentPage: 1,
            assignmentTotalPage: 0,
            activeIndex: 1,
            assignmentForm: '',
            assignmentDetailsData: {},
            startTime: '',
            endTime: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        }
    },
    mounted: function (){
        this.ajax(this.assignmentPage)
    }, 
    methods: {
        ajax: function (num){
            var self = this;
            this.$ajax.post(Util.url, 
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
            this.assignmentDetailsData = this.assignmentList[index];
            // this.assignmentDetailsCourse(this.assignmentDetailsList.id);
            this.assignmentDetailsData.startDate = Util.dataTransform(this.assignmentDetailsData.startDate);
            this.assignmentDetailsData.expireDate = Util.dataTransform(this.assignmentDetailsData.expireDate);
        },
        assignmentDetailsCourse: function(id){
            this.$ajax.post(Util.url, 
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
    .assignment_form_input{
        width: 60%;
    }
</style>