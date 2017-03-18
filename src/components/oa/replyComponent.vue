<template>
    <div>
        <div class="new_oa_list clearfix" v-for="list in replyData">
            <span class="new_oa_list_header">{{list.lastLetter}}</span>
            <div class="new_oa_list_msg">
                <span>{{list.userName}}</span>
                <span>回复</span>
                <span>{{list.receiveName}}</span>：
                <span>{{list.replyCon}}</span>
            </div>
            <el-button type="text" class="new_oa_list_con_btn">点赞{{list.receiveUid}}</el-button>
            <el-button type="text" class="new_oa_list_con_btn" @click="replyInputToggle = list.id">回复</el-button>
            <el-input placeholder="请输入内容" class="new_oa_list_con_input" v-show="replyInputToggle == list.id"></el-input>
            <el-button type="text" class="new_oa_list_con_btn" v-show="replyInputToggle == list.id">提交</el-button>
        </div>
    </div>
</template>

<script>
import Util from '../../script/util.js';
    
export default {
    data (){
        return{
             replyData : {},
             replyInputToggle: 1,
        }
    },
    mounted: function (){
    }, 
    methods: {
        ajax: function (id){
            var self = this;
            this.$ajax.post(Util.url, 
                'method=reply/getReplyByPid'
                +'&param='+JSON.stringify({
                    "companyId": 61,
                    "pid": id,
                    "sceneType": 2,
                })
            )
            .then(function (res) {
                self.replyData = res.data.data.result
                console.log(self.replyData);
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        consolelog: function (){
            console.log('haoma')
        }
        // 回复
        // 回复别人的回复
        // 点赞
        // 撤回
    }
}
</script>

<style scoped>

</style>