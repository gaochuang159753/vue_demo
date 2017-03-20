<template>
    <div id='oaReport'>
        <el-menu theme="light" class="gzt_common_nav" mode="horizontal">
            <el-menu-item index="1" @click="activeIndex=1;ajax(1,1)">收到的汇报</el-menu-item>
            <el-menu-item index="4" @click="activeIndex=1;ajax(1,2)">发出的汇报</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建汇报</el-menu-item>
        </el-menu>
        <div class="gzt_common_con" v-show="activeIndex==1">
            <el-table :data="reportList" style="width: 100%" align="center" class="gzt_common_table">
                <el-table-column prop="createTime" label="时间" class="gzt_common_td"></el-table-column>
                <el-table-column prop="userName" label="发送人" class="gzt_common_td"></el-table-column>
                <el-table-column prop="persons" label="接收人" class="gzt_common_td"></el-table-column>
                <el-table-column label="编辑" class="gzt_common_td">
                    <template scope="scope">
                        <el-button @click="reportDetails(scope.$index);activeIndex=3" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gzt_common_page">
                <el-pagination layout="prev, pager, next" :total="reportTotalPage" @current-change="changePage"></el-pagination>
            </div>
        </div>
        <div class="gzt_common_con" v-show="activeIndex==2">
            <el-form label-position="right" label-width="150px" :model="reportForm">
                <el-form-item label="工作汇报类型" class="gzt_common_form_input">
                      <el-select v-model="reportValue" placeholder="请选择">
                            <el-option
                            v-for="item in reportType"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="执行人" class="gzt_common_form_input">
                    <el-button>获取执行人</el-button>
                </el-form-item>
                <el-form-item label="今日工作内容" class="gzt_common_form_input">
                    <el-input v-model="reportForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="明日工作内容" class="gzt_common_form_input">
                    <el-input v-model="reportForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="工作心得体会" class="gzt_common_form_input">
                    <el-input v-model="reportForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
               
            </el-form>
            <div class="gzt_common_btn">
                <el-button @click="activeIndex=1">返回</el-button>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
        <div class="new_oa" v-show="activeIndex==3">
            <div class="new_oa_list clearfix" id="parent">
                <span class="new_oa_list_header">{{reportDetailsData.userName}}</span>
                <div class="new_oa_list_msg">
                    <span>{{reportDetailsData.userName}}</span>
                    <span>{{reportDetailsData.createTime}}</span>
                    <span>发送给</span>：
                    <span>{{reportDetailsData.persons}}</span>
                </div>
                <div class="new_oa_list_con">
                    <p>今日工作内容</p>
                    <span>{{reportDetailsData.content.play_con}}</span>
                    <p>明日工作计划</p>
                    <span>{{reportDetailsData.content.learnt_con}}</span>
                    <p>工作心得体会</p>
                    <span>{{reportDetailsData.content.sum_con}}</span>
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
    name: 'oaReport',
    data (){
        return{
            reportList: [],
            reportMyList: [],
            reportPage: 1,
            reportTotalPage: 0,
            activeIndex: 1,
            replyInputToggle: 1,
            reportForm: {},
            reportDetailsData: {
                content: {}
            },
            reportType: [{
            value: '选项1',
            label: '日报'
            }, {
            value: '选项2',
            label: '周报'
            }, {
            value: '选项3',
            label: '月报'
            }],
            reportValue: '',
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
        this.ajax(this.reportPage,1)
    }, 
    methods: {
        ajax: function (num,type){
            var self = this;
            this.$ajax.post(Util.url, 
                'method=workReport/getWorkReportList'
                +'&param='+JSON.stringify({
                    "userId": 84800,
                    "companyId": 61,
                    "pageNum": num,
                    "pageSize": 10,
                    "type": type,
                    "from": "PC",
                })
            )
            .then(function (res) { 
                self.reportList = res.data.data.result;
                console.log(self.reportList)
                self.reportTotalPage = res.data.data.page.totalCount;
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        changePage: function(page){
            this.reportPage = page
            this.ajax(this.reportPage);
        },
        reportDetails: function(index){
            this.reportDetailsData = this.reportList[index];
            this.$refs.profile.ajax(this.reportDetailsData.id);
        },
        reportDetailsCourse: function(id){
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