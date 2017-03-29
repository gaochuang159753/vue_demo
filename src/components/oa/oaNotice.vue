<template>
    <div class='oaNotice'>
        <el-menu theme="light" class="notice_nav" mode="horizontal">
            <el-menu-item index="1" @click="activeIndex=1" >公告列表</el-menu-item>
            <el-menu-item index="2" @click="activeIndex=2">新建公告</el-menu-item>
        </el-menu>
        <div class="notice_con" v-show="activeIndex==1">
            <el-table :data="noticeList" style="width: 100%" align="center" class="notice_table">
                <el-table-column prop="createTime" label="时间" class="notice_td"></el-table-column>
                <el-table-column prop="title" label="标题" class="notice_td"></el-table-column>
                <el-table-column prop="content" label="内容" class="notice_td"></el-table-column>
                <el-table-column prop="userName" label="发送人" class="notice_td"></el-table-column>
                <el-table-column label="编辑" class="notice_td">
                    <template scope="scope">
                        <el-button @click="noticeStick(scope.$index);" type="text">置顶</el-button>
                        <el-button @click="noticeEdit(scope.$index);" type="text">编辑</el-button>
                        <el-button @click="noticeDetails(scope.$index);" type="text">详情</el-button>
                        <el-button @click="noticeDelete(scope.$index);" type="text">删除</el-button>
                        <el-button @click="noticeDelete(scope.$index);" type="text">删除</el-button>
                        <el-button @click="noticeDelete(scope.$index);" type="text">删除</el-button>
                        <el-button @click="noticeDelete(scope.$index);" type="text">删除</el-button>
                        <el-button @click="noticeDelete(scope.$index);" type="text">删除</el-button>
                        <el-button @click="noticeDelete(scope.$index);" type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="notice_page">
                <el-pagination layout="prev, pager, next" :total="noticeTotalPage" @current-change="changePage"></el-pagination>
            </div>
        </div>

        <div class="notice_con" v-show="activeIndex==2">
            <el-popover ref="popover4" placement="right" width="400" trigger="click">
                <el-input
                  placeholder="输入关键字进行过滤"
                  v-model="filterText"
                  class="notice_con_pop_input">
                </el-input>
                <el-tree
                  :data="noticeTreeData"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                  ref="tree">
                </el-tree>
            </el-popover>
            <el-form label-position="right" label-width="150px" :model="noticeForm">
                <el-form-item label="选择接收人" class="notice_form_input">
                    <!-- <el-input v-model="noticeForm.name"></el-input> -->
                    <span v-for="list in noticeRec"></span>
                    <el-tag
                    :key="tag"
                    v-for="tag in noticeRec"
                    :closable="true"
                    :close-transition="false"
                    @close="handleClose(tag)"
                    >
                    {{tag.name}}
                    </el-tag>
                    <el-button  v-popover:popover4>获取联系人</el-button>
                </el-form-item>
                <el-form-item label="公告标题" class="notice_form_input">
                    <el-input v-model="noticeForm.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="公告签名" class="notice_form_input">
                    <el-input v-model="noticeForm.signature" placeholder="请输入签名"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" class="notice_form_input">
                    <el-input v-model="noticeForm.content" type="textarea" row="4" placeholder="请输入内容"></el-input>
                </el-form-item>、
            </el-form>
            <div class="notice_btn">
                <el-button @click="activeIndex=1">取消</el-button>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Util from '../../script/util.js';
export default {
    name: 'oaNotice', 
    data () {
        return{
            filterText: '',
            noticeList: [],
            noticeListRead: [],
            noticePage: 1,
            noticeTotalPage: 0,
            activeIndex: 1,
            noticeForm: {},
            noticeRec: {},
            noticeTreeData: [{
              id: 1,
              label: '一级 1',
              children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            }
        }
    }, 
    mounted: function (){
        this.ajax(this.noticePage)
    }, 
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },                                
   
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        console: function(){
            console.log(this.activeIndex);
        },
        ajax: function (num){
            var self = this;
            this.$ajax.post(Util.url, 
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
                self.noticeListRead = res.data.data.isRead;
                console.log(self.noticeList);
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        changePage: function(page){
            this.noticePage = page
            this.ajax(this.noticePage);
        },
        // 公告置顶
        noticeStick: function (index){
            this.$message({
                message: '置顶成功',
                type: 'success'
            });
        },
        // 公告编辑
        noticeEdit: function (index){
            this.activeIndex = 2;
            this.noticeForm = this.noticeList[index];
            this.noticeRec = JSON.parse(this.noticeList[index].recipientDept);
            console.log(this.noticeRec)
        },
        handleClose(tag) {
            this.noticeRec.splice(this.noticeRec.indexOf(tag), 1
             );
        },
        // 公告详情
        noticeDetails: function (index){
            this.activeIndex = 2;
            this.noticeForm = this.noticeList[index];
            this.noticeRec = JSON.parse(this.noticeList[index].recipientDept);
            console.log(this.noticeRec)
        },
        // 公告删除
        noticeDelete: function (index){
            this.$message({
                message: '删除成功',
                type: 'success'
            });
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
.notice_con_pop_input{
    margin-bottom: 10px;
}
.notice_btn{
    padding-left: 150px;
}
</style>