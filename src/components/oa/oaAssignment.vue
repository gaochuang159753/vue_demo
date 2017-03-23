<template>
    <div id='oaAssignment'>
        <el-menu theme="light" class="gzt_common_nav" mode="horizontal">
            <el-menu-item index="1" @click="activeIndex=1">任务列表</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建任务</el-menu-item>
        </el-menu>
        <div class="gzt_common_con" v-show="activeIndex==1">
            <el-table :data="assignmentList" style="width: 100%" align="center" class="gzt_common_table">
                <el-table-column prop="createTime" label="时间" class="gzt_common_td"></el-table-column>
                <el-table-column prop="title" label="任务标题" class="gzt_common_td"></el-table-column>
                <el-table-column prop="content" label="任务内容" class="gzt_common_td"></el-table-column>
                <el-table-column prop="userName" label="发起人" class="gzt_common_td"></el-table-column>
                <el-table-column prop="userName" label="执行人" class="gzt_common_td"></el-table-column>
                <el-table-column label="编辑" class="gzt_common_td">
                    <template scope="scope">
                        <el-button @click="assignmentDetails(scope.$index);activeIndex=3" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gzt_common_page">
                <el-pagination layout="prev, pager, next" :total="assignmentTotalPage" @current-change="changePage"></el-pagination>
            </div>
        </div>
        <div class="gzt_common_con" v-show="activeIndex==2">
            <el-form label-position="right" label-width="150px" :model="assignmentForm">
                <el-form-item label="执行人" class="gzt_common_form_input">
                    <el-button>获取执行人</el-button>
                </el-form-item>
                <el-form-item label="任务标题" class="gzt_common_form_input">
                    <el-input v-model="assignmentForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="任务内容" class="gzt_common_form_input">
                    <el-input v-model="assignmentForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="gzt_common_form_input">
                    <div class="block assignment_form_input">
                        <el-date-picker
                        v-model="startTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="结束时间" class="gzt_common_form_input">
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
            <div class="gzt_common_btn">
                <el-button @click="activeIndex=1">返回</el-button>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
        <div class="new_oa" v-show="activeIndex==3">
            <div class="new_oa_list clearfix" id="parent">
                <span class="new_oa_list_header">{{assignmentDetailsData.userName}}</span>
                <div class="new_oa_list_msg">
                    <span>{{assignmentDetailsData.userName}}</span>
                    <span>{{assignmentDetailsData.createTime}}</span>
                    <span>发送给</span>：
                    <span>{{assignmentDetailsData.sendToPersonName}}</span>
                </div>
                <div class="new_oa_list_con">
                    <p>任务标题</p>
                    <span>{{assignmentDetailsData.title}}</span>
                    <p>任务内容</p>
                    <span>{{assignmentDetailsData.content}}</span>
                    <p>开始时间</p>
                    <span>{{assignmentDetailsData.startDate}}</span>
                    <p>截止时间</p>
                    <span>{{assignmentDetailsData.expireDate}}</span>
                </div>
                <el-button type="text" class="new_oa_list_con_btn">点赞0</el-button>
                <el-button type="text" class="new_oa_list_con_btn" @click="replyInputToggle = 1">回复</el-button>
                <el-input placeholder="请输入内容" class="new_oa_list_con_input" v-show="replyInputToggle == 1"></el-input>
                <el-button type="text" class="new_oa_list_con_btn" v-show="replyInputToggle == 1">提交</el-button>
                </div>
                <reply-component ref="profile"></reply-component>
                <div>
                <el-button @click="activeIndex=1">返回</el-button>
            </div>
        </div>
        
    </div>
</template>

<script>
import replyComponent from '../oa/replyComponent.vue';


export default {
    name: 'oaAssignment',
    data (){
        return{
            assignmentList: [],
            assignmentPage: 1,
            assignmentTotalPage: 0,
            activeIndex: 1,
            replyInputToggle: 1,
            assignmentForm: {},
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
            this.$refs.profile.ajax(this.assignmentDetailsData.id);
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
    },
    components: {
        replyComponent
    }

}
</script>

<style scoped>
    .gzt_common_nav{
        margin: 30px 0;
    }
    .gzt_common_page{
        margin-top: 30px;
    }
    .gzt_common_btn{
        padding-left: 150px;
    }
    .gzt_common_form_input{
        width: 30%;
    }
</style>