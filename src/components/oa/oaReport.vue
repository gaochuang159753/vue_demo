<template>
    <div id='oaReport'>
        <el-menu theme="light" class="oa_common_nav" mode="horizontal" default-active="1">
            <el-menu-item index="1" @click="activeIndex=1;reportListAjax(1);">收到的汇报</el-menu-item>
            <el-menu-item index="4" @click="activeIndex=1;reportListAjax(2);">发出的汇报</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2;">新建汇报</el-menu-item>
        </el-menu>
        <div class="oa_common" v-show="activeIndex==1">
            <ul>
                <li v-for="list in reportList">
                <el-card class="box-card"> 
                    <div class="oa_common_msg">
                        <span class="oa_common_msg_header">{{list.senderName}}</span>
                        <div class="oa_common_msg_con">
                            <span class="oa_common_msg_con_span">{{list.senderName}}</span>
                            <el-tag type="primary" v-show="list.reportType==1">日报</el-tag>
                            <el-tag type="success" v-show="list.reportType==2">周报</el-tag>
                            <el-tag type="danger" v-show="list.reportType==3">月报</el-tag>
                            <br/>
                            <span class="oa_common_msg_con_span">{{list.createTime}}</span>发送给 ：<span class="oa_common_msg_con_span">{{list.recipientName}}</span>
                        </div>
                    </div>
                    <div class="oa_common_con" v-show="detailListToggle==list.id">
                        <div class="oa_common_item">
                            <p class="oa_common_item_title">今天工作内容</p>
                            <p class="oa_common_item_con">{{list.content.todayCon}}</p>
                        </div>
                        <div class="oa_common_item">
                            <p class="oa_common_item_title">明天工作内容</p>
                            <p class="oa_common_item_con">{{list.content.tomorrowCon}}</p>
                        </div>
                        <div class="oa_common_item">
                            <p class="oa_common_item_title">工作心得体会</p>
                            <p class="oa_common_item_con">{{list.content.feelCon}}</p>
                        </div>
                    </div>
                    <div class="oa_common_reply clearfix">
                        <div class="oa_common_reply_main">
                            <el-button type="text">点赞</el-button>
                            <el-button type="text" v-show="replyListToggle==0" @click="replyListToggle=list.id">回复</el-button>
                            <el-button type="text" v-show="replyListToggle==list.id" @click="replyListToggle=0">回复</el-button>
                            <el-button type="text" v-show="detailListToggle==0" @click="detailListToggle=list.id">展开</el-button>
                            <el-button type="text" v-show="detailListToggle==list.id" @click="detailListToggle=0">收起</el-button>
                        </div>
                        <div class="oa_common_reply_list" v-show="replyListToggle==list.id">
                            <el-input></el-input>
                            <div class="oa_common_msg">
                                <span></span>
                                <div class="oa_common_msg_con">
                                    <span></span>
                                    <span>回复</span>:
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>  
                </li>
            </ul>
        </div>
        <div class="oa_common_con" v-show="activeIndex==2">
            <el-form label-position="right" label-width="150px" :model="reportDetailsData">
                <el-form-item label="工作汇报类型" class="oa_common_form_input">
                      <el-select v-model="reportValue" placeholder="请选择">
                            <el-option
                            v-for="item in reportType"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="执行人" class="oa_common_form_input">
                    <el-popover
                        ref="popover"
                        placement="right"
                        width="400"
                        trigger="click">
                        <el-tree
                            :data="orgTree"
                            show-checkbox
                            node-key="id"
                            :default-expand-all="true"
                            :props="orgTreeProps">
                        </el-tree>
                    </el-popover>
                    <el-button v-popover:popover>获取执行人</el-button>
                    
                </el-form-item>
                <el-form-item label="今日工作内容" class="oa_common_form_input">
                    <el-input v-model="reportDetailsData.content.todayCon" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="明日工作内容" class="oa_common_form_input">
                    <el-input v-model="reportDetailsData.content.tomorrowCon" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="工作心得体会" class="oa_common_form_input">
                    <el-input v-model="reportDetailsData.content.feelCon" placeholder="请输入签名"></el-input>
                </el-form-item>
            </el-form>
            <div class="oa_common_btn">
                <el-button @click="activeIndex=1">返回</el-button>
                <el-button type="primary">发送</el-button>
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
            reportList: Data.reportList,// 列表
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
            orgTree: Data.orgTree,
            orgTreeProps: Data.orgTreeProps,
            detailListToggle: 0,
            replyListToggle: 0,
            
        }
    },
    mounted: function (){

    }, 
    methods: {
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
    .oa_common_nav{
        margin: 30px 0;
    }
    .oa_common_page{
        margin-top: 30px;
    }
    .oa_common_btn{
        padding-left: 150px;
    }
    .oa_common_form_input{
        width: 30%;
    }
    .oa_common_table_item .el-form-item{
        width: 100%;
    }
</style>