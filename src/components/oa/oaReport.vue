<template>
    <div id='oaReport'>
        <el-menu theme="light" class="gzt_common_nav" mode="horizontal" default-active="1">
            <el-menu-item index="1" @click="activeIndex=1;reportListAjax(1);">收到的汇报</el-menu-item>
            <el-menu-item index="4" @click="activeIndex=1;reportListAjax(2);">发出的汇报</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建汇报</el-menu-item>
        </el-menu>
        <div class="gzt_common_con" v-show="activeIndex==1">
            <el-table :data="reportList" style="width: 100%" align="center" class="gzt_common_table">
                <el-table-column prop="createTime" label="时间" class="gzt_common_td"></el-table-column>
                <el-table-column prop="senderName" label="发送人" class="gzt_common_td"></el-table-column>
                <el-table-column prop="recipientName" label="接收人" class="gzt_common_td"></el-table-column>
                <el-table-column label="编辑" class="gzt_common_td">
                    <template scope="scope">
                        <el-button @click="reportDetailsAjax(scope.$index);activeIndex=3" type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="gzt_common_page">
                <el-pagination layout="prev, pager, next" :total="reportTotalPage" @current-change=""></el-pagination>
            </div>
        </div>
        <div class="gzt_common_con" v-show="activeIndex==2">
            <el-form label-position="right" label-width="150px" :model="reportDetailsData">
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
                    <el-popover
                        ref="popover"
                        placement="right"
                        width="400"
                        trigger="click">
                        <el-tree
                            :data="orgTree"
                            show-checkbox
                            node-key="id"
                            :props="orgTreeProps">
                        </el-tree>
                    </el-popover>
                    <el-button v-popover:popover>获取执行人</el-button>
                    
                </el-form-item>
                <el-form-item label="今日工作内容" class="gzt_common_form_input">
                    <el-input v-model="reportDetailsData.content.todayCon" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="明日工作内容" class="gzt_common_form_input">
                    <el-input v-model="reportDetailsData.content.tomorrowCon" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="工作心得体会" class="gzt_common_form_input">
                    <el-input v-model="reportDetailsData.content.feelCon" placeholder="请输入签名"></el-input>
                </el-form-item>
            </el-form>
            <div class="gzt_common_btn">
                <el-button @click="activeIndex=1">返回</el-button>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
        <div class="new_oa" v-show="activeIndex==3">
            <div class="new_oa_list clearfix" id="parent">
                <span class="new_oa_list_header">{{reportDetailsData.senderName}}</span>
                <div class="new_oa_list_msg">
                    <span>{{reportDetailsData.senderName}}</span>
                    <span>{{reportDetailsData.createTime}}</span>
                    <span>发送给</span>：
                    <span>{{reportDetailsData.recipientName}}</span>
                </div>
                <div class="new_oa_list_con">
                    <p>今日工作内容</p>
                    <span>{{reportDetailsData.content.todayCon}}</span>
                    <p>明日工作计划</p>
                    <span>{{reportDetailsData.content.tomorrowCon}}</span>
                    <p>工作心得体会</p>
                    <span>{{reportDetailsData.content.feelCon}}</span>
                </div>
                <el-button type="text" class="new_oa_list_con_btn">点赞0</el-button>
                <el-button type="text" class="new_oa_list_con_btn">回复</el-button>
                <el-input placeholder="请输入内容" class="new_oa_list_con_input"></el-input>
                <el-button type="text" class="new_oa_list_con_btn">提交</el-button>
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
import Data from '../../script/data.js';
import replyComponent from '../oa/replyComponent.vue';


export default {
    name: 'oaReport',
    data (){
        return{
            reportList: [],// 列表
            reportTotalPage: 1,// 列表页数
            activeIndex: 1, // 切换
            reportDetailsData: {
                content: {}
            },// 详情数据
            reportType: [
                {
                    value: '1',
                    label: '日报'
                },{
                    value: '2',
                    label: '周报'
                },{
                    value: '3',
                    label: '月报'
                }
            ],// 类型
            reportValue: '',
            orgTree: Util.orgTree,
            orgTreeProps: Util.orgTreeProps,
            
        }
    },
    mounted: function (){
    }, 
    methods: {
        // ajax: function (num,type){
        //     var self = this;
        //     this.$ajax.post(Util.url, 
        //         'method=workReport/getWorkReportList'
        //         +'&param='+JSON.stringify({
        //             "userId": 84800,
        //             "companyId": 61,
        //             "pageNum": num,
        //             "pageSize": 10,
        //             "type": type,
        //             "from": "PC",
        //         })
        //     )
        //     .then(function (res) { 
        //         self.reportList = res.data.data.result;
        //         console.log(self.reportList)
        //         self.reportTotalPage = res.data.data.page.totalCount;
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     });
        // },
        // changePage: function(page){
        //     this.reportPage = page
        //     this.ajax(this.reportPage);
        // },
        // reportDetails: function(index){
        //     this.reportDetailsData = this.reportList[index];
        //     this.$refs.profile.ajax(this.reportDetailsData.id);
        // },
        // reportDetailsCourse: function(id){
        //     this.$ajax.post(Util.url, 
        //         'taskInfo/getTaskInfoById'
        //         +'&param='+JSON.stringify({
        //                 "userId": 61,
        //                 "companyId": 61,
        //                 "id": id,
        //                 "type": 3,
        //         })
        //     )
        //     .then(function (res) { 
        //         console.log(res)
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     });
        // },
        reportListAjax:  function(type){
            if(type==1){
                this.reportList = Data.reportList;
            }else{
                this.reportList = Data.reportMyList;
            }
        },
        reportDetailsAjax: function(index){
            this.reportDetailsData = this.reportList[index];
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