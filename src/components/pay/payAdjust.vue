<template>
    <div id='payRecord'>
        <el-tabs v-model="activeName">
            <el-tab-pane label="调整薪资" name="one">
                <div class="wages_three_item hrm_box">
                    <div class="wages_three_item_nav">调整薪资</div>
                    <div class="wages_three_item_con">
                        <div class="hrm_item">
                            <label for="">当前基本薪资</label>
                            <el-input v-model="payAdjustCur" style="width: 200px;" :disabled="true"></el-input>
                        </div>
                        <div class="hrm_item">
                            <label for="">调整后基本薪资</label>
                            <el-input style="width: 200px;"></el-input>
                        </div>
                        <div class="hrm_item">
                            <label for="">调整幅度</label>
                            <el-input style="width: 200px;" icon="search"></el-input>
                        </div>
                        <div class="hrm_item">
                            <label for="">生效时间</label>
                            <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            style="width: 200px;">
                            </el-date-picker>
                        </div>
                        
                        <div class="hrm_item">
                            <label for="">调薪理由</label>
                            <el-input type="textarea" style="width: 400px;" :rows="3"></el-input>
                        </div>
                    </div>
                </div>
                <div class="wages_three_item hrm_box">
                    <div class="wages_three_item_nav">调薪记录</div>
                    <div class="wages_three_item_con">

                        <el-steps :space="100" direction="vertical">
                            <el-step v-for="item in payAdjustRecord" v-bind:title="item.forceTime" v-bind:description="item.text"></el-step>
                        </el-steps>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Util from '../../script/util.js'


    export default {
        data() {
            return {
                activeName: 'one',
                payAdjustRecord: [], // 调薪记录
                payAdjustCur: '', // 当前薪资
            }
        },
        mounted: function () {
            this.ajax()
        },
        methods: {
            ajax: function (url) {
                var self = this;
                this.$ajax.post(Util.url,
                    'method=spwSalaryChange/getAdjustSalaryLog'
                    + '&param=' + JSON.stringify({
                        "setUserId": 14539,
                        "companyId": 139353,
                    })
                )
                    .then(function (res) {
                        
                        self.payAdjustRecord = res.data.data.result;
                        var len = self.payAdjustRecord.length
                        for(var i= 1; i< len; i++){
                            self.payAdjustRecord[i].text = 
                            "由"
                            +self.payAdjustRecord[i].beforeBasicPay+
                            "元调整为"
                            +self.payAdjustRecord[i].afterBasicPay+
                            "元；";
                            if(self.payAdjustRecord[i].adjustReason!=undefined){
                                self.payAdjustRecord[i].text += "调薪理由："+self.payAdjustRecord[i].adjustReason+""
                            }
                        }
                        self.payAdjustCur = self.payAdjustRecord[len-1].afterBasicPay;
                        self.payAdjustRecord[0].text = "初始薪资"+self.payAdjustRecord[0].afterBasicPay+""
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        }
    }
</script>

<style scoped>
    .wages_three_item {
        border-radius: 2px;
        margin-bottom: 20px;
        width: 49%;
        float: left;
    }
    .wages_three_item+.wages_three_item{
        margin-left: 20px;;
    }
    
    .wages_three_item_nav {
        background: #ecf0f3;
        line-height: 36px;
        height: 36px;
        padding-left: 20px;
    }
    
    .wages_three_item_con {
        padding: 20px;
    }
</style>