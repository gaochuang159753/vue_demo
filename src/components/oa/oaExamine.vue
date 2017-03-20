<template>
    <div id='oaExamine'>
        <el-menu theme="light" class="gzt_common_nav" mode="horizontal">
            <el-menu-item index="1" @click="activeIndex=1;ajax(1,1)">收到的审批</el-menu-item>
            <el-menu-item index="4" @click="activeIndex=1;ajax(1,2)">发出的审批</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建审批</el-menu-item>
        </el-menu>
        <div class="gzt_common_con" v-show="activeIndex==1">
            <el-table :data="examineList" style="width: 100%" align="center" class="gzt_common_table">
                <el-table-column prop="createTime" label="时间" class="gzt_common_td"></el-table-column>
                <el-table-column prop="user.name" label="发送人" class="gzt_common_td"></el-table-column>
                <el-table-column prop="persons" label="审批人" class="gzt_common_td"></el-table-column>
                <el-table-column prop="step" label="审批状态" class="gzt_common_td"></el-table-column>
                <el-table-column label="编辑" class="gzt_common_td">
                    <template scope="scope">
                        <el-button @click="examineDetails(scope.$index);activeIndex=3" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gzt_common_page">
                <el-pagination layout="prev, pager, next" :total="examineTotalPage" @current-change="changePage"></el-pagination>
            </div>
        </div>
        <div class="gzt_common_con" v-show="activeIndex==2">
            <el-form label-position="right" label-width="150px" :model="examineForm">
                <el-form-item label="审批类型" class="gzt_common_form_input">
                      <el-select v-model="examineValue" placeholder="请选择">
                            <el-option
                            v-for="item in examineType"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="审批人" class="gzt_common_form_input">
                    <el-button>获取审批人</el-button>
                </el-form-item>
                <el-form-item label="请假事项" class="gzt_common_form_input">
                      <el-select v-model="leaveValue" placeholder="请选择">
                            <el-option
                            v-for="item in leaveType"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                      </el-select>
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
                        v-model="startTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="备注" class="gzt_common_form_input">
                    <el-input v-model="examineForm.signature" placeholder="请输入备注"></el-input>
                </el-form-item>
               
            </el-form>
            <div class="gzt_common_btn">
                <el-button @click="activeIndex=1">返回</el-button>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
        <div class="new_oa" v-show="activeIndex==3">
            <div class="new_oa_list clearfix" id="parent">
                <span class="new_oa_list_header">{{examineDetailsData.userName}}</span>
                <div class="new_oa_list_msg">
                    <span>{{examineDetailsData.userName}}</span>
                    <span>{{examineDetailsData.createTime}}</span>
                    <span>发送给</span>：
                    <span>{{examineDetailsData.persons}}</span>
                </div>
                <div class="new_oa_list_con">
                    <p>今日工作内容</p>
                    <span>{{examineDetailsData.content.play_con}}</span>
                    <p>明日工作计划</p>
                    <span>{{examineDetailsData.content.learnt_con}}</span>
                    <p>工作心得体会</p>
                    <span>{{examineDetailsData.content.sum_con}}</span>
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
import Util from '../../script/util.js';
import replyComponent from '../oa/replyComponent.vue';


export default {
    name: 'oaExamine',
    data (){
        return{
            examineList: [],
            examineMyList: [],
            examinePage: 1,
            examineTotalPage: 0,
            activeIndex: 1,
            replyInputToggle: 1,
            examineForm: {},
            examineDetailsData: {
                content: {}
            },
            examineType: [{
            value: '1',
            label: '请假单'
            }, {
            value: '2',
            label: '报销单'
            }],
            leaveType: [
                {
                value: '1',
                label: '事假'
                }, {
                value: '2',
                label: '病假'
                }, {
                value: '3',
                label: '调休'
                }, {
                value: '4',
                label: '年休假'
                }, {
                value: '5',
                label: '婚假'
                }, {
                value: '6',
                label: '生育假'
                }, {
                value: '7',
                label: '丧假'
                }, {
                value: '8',
                label: '加班'
                }, {
                value: '9',
                label: '外勤'
                }, {
                value: '10',
                label: '出差'
                }, {
                value: '11',
                label: '其他'
                }
            ],
            examineValue: '',
            leaveValue: '',
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
        this.ajax(this.examinePage,1)
    }, 
    methods: {
        ajax: function (num,type){
            var self = this;
            this.$ajax.post(Util.url, 
                'method=flowInfo/getFlowInfoList'
                +'&param='+JSON.stringify({
                    "userId": 84800,
                    "companyId": 61,
                    "pageNum": num,
                    "pageSize": 10,
                    "type": type,
                    // "flowId": "",
                    "flowType": "2",
                })
            )
            .then(function (res) { 
                self.examineList = res.data.data.result;
                console.log(self.examineList)
                self.examineTotalPage = res.data.data.page.totalCount;
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        changePage: function(page){
            this.examinePage = page
            this.ajax(this.examinePage);
        },
        examineDetails: function(index){
            this.examineDetailsData = this.examineList[index];
            this.$refs.profile.ajax(this.examineDetailsData.id);
        },
        examineDetailsCourse: function(id){
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