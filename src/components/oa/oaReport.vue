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
                <el-card class="box-card oa_common_card"> 
                    <div class="oa_common_msg" @click="detailToggle(list.id)">
                        <span class="oa_common_msg_header">{{list.senderName}}</span>
                        <div class="oa_common_msg_con">
                            <span class="oa_common_msg_span">{{list.senderName}}</span>
                            <el-tag type="primary" v-show="list.reportType==1">日报</el-tag>
                            <el-tag type="success" v-show="list.reportType==2">周报</el-tag>
                            <el-tag type="danger" v-show="list.reportType==3">月报</el-tag>
                            <br/>
                            <span class="oa_common_msg_span oa_common_time">{{list.createTime}}</span>发送给：<span class="oa_common_msg_con_span">{{list.recipientName}}</span>
                        </div>
                    </div>
                    <div class="oa_common_con" v-show="detailToggleData==list.id">
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
                                <el-button type="text"v-show="replyListToggle==0" @click="replyListToggle=list.id">回复</el-button>
                                <el-button type="text" v-show="replyListToggle==list.id" @click="replyListToggle=0">回复</el-button>
                                <el-button type="text">点赞</el-button>
                                
                            </el-badge>
                        </div>
                        <div class="oa_common_reply_list" v-show="replyListToggle==list.id">
                            <el-input placeholder="添加回复"></el-input>
                            <div class="oa_common_msg oa_common_msg_reply" v-for="replyList in replyList">
                                <span class="oa_common_msg_header">{{replyList.senderName}}</span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_span">{{replyList.senderName}}</span>
                                    <span class="oa_common_msg_span" v-show="replyList.recipientName!=''">回复 {{replyList.recipientName}}</span>：
                                    <span class="oa_common_msg_span">{{replyList.content}}</span><br/>
                                    <span class="oa_common_msg_span oa_common_time">{{replyList.createTime}}</span>
                                    <el-button type="text">撤回</el-button>
                                    <el-button type="text" v-show="replyInputToggle==0" @click="replyInputToggle=replyList.id">回复</el-button>
                                    <el-button type="text" v-show="replyInputToggle==replyList.id" @click="replyInputToggle=0">回复</el-button>
                                    <el-button type="text">点赞</el-button>
                                    <el-button type="text">点赞</el-button>
                                    <el-button type="text">点赞</el-button>
                                    <el-button type="text">点赞</el-button>
                                    <el-input v-show="replyInputToggle==replyList.id" placeholder="添加回复"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>  
                </li>
            </ul>
            <div class="oa_common_page">
                <el-pagination layout="prev, pager, next" :total="reportTotalPage"></el-pagination>
            </div>
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
                    <el-input v-model="reportDetailsData.content.todayCon" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="明日工作内容" class="oa_common_form_input">
                    <el-input v-model="reportDetailsData.content.tomorrowCon" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="工作心得体会" class="oa_common_form_input">
                    <el-input v-model="reportDetailsData.content.feelCon" placeholder=""></el-input>
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
            detailToggleData: 0,
            replyListToggle: 0,
            replyInputToggle: 0,
            replyList: Data.replyList,
            
        }
    },
    mounted: function (){

    }, 
    methods: {
        detailToggle: function (id){
            if(this.detailToggleData == 0){
                this.detailToggleData = id;
            }else{
                this.detailToggleData = 0;
            }
        },
        reportListAjax: function(type){
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
</style>