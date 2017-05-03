<template>
    <div id='payRecord'>
        <div class="Rrecord_nav">
           
        </div>
        <div class="record_con">
            <el-tabs v-model="activeName">
                <el-tab-pane label="发放记录" name="one">
                    <el-table :data="payrollList" style="width: 100%" align="center" class="notice_table">
                        <el-table-column prop="salaryName" label="名称" class="notice_td"></el-table-column>
                        <el-table-column prop="userName" label="发送人" class="notice_td"></el-table-column>
                        <el-table-column prop="sendTime" label="发送时间" class="notice_td"></el-table-column>
                        <el-table-column label="编辑" class="notice_td">
                            <template scope="scope">
                                <el-button @click="payrollDetail(scope.row.id);" type="text">明细</el-button>
                                <el-button @click="" type="text">撤销</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs> 
        </div>
        <el-dialog
        title="工资单明细"
        v-model="dialogVisible"
        size="large">
            <span class="">
                <el-table :data="payrollDetailList" style="width: 100%" align="center" class="notice_table">
                    <el-table-column prop="staffNo" label="工号" class="notice_td"></el-table-column>
                    <el-table-column prop="name" label="名字" class="notice_td"></el-table-column>
                    <el-table-column prop="email" label="邮箱" class="notice_td"></el-table-column>
                    <el-table-column prop="phone" label="手机" class="notice_td"></el-table-column>
                    <el-table-column prop="deptName" label="部门" class="notice_td"></el-table-column>
                    <el-table-column prop="releaseTime" label="发放月份" class="notice_td"></el-table-column>
                    <el-table-column prop="basicPay" label="基本工资" class="notice_td"></el-table-column>
                    <el-table-column prop="percentage" label="提成" class="notice_td"></el-table-column>
                    <el-table-column prop="yearEndBonuses" label="年终奖" class="notice_td"></el-table-column>
                    <el-table-column prop="leaveDays" label="请假天数" class="notice_td"></el-table-column>
                    <el-table-column prop="leaveDeductMoney" label="请假扣减" class="notice_td"></el-table-column>
                    <el-table-column prop="overtimePay" label="加班费" class="notice_td"></el-table-column>
                    <el-table-column prop="attendanceDeduct" label="考勤扣减" class="notice_td"></el-table-column>
                    <el-table-column prop="bonus" label="奖金" class="notice_td"></el-table-column>
                    <el-table-column prop="welfare" label="福利" class="notice_td"></el-table-column>
                    <el-table-column prop="totalDeduct" label="工资扣减" class="notice_td"></el-table-column>
                    <el-table-column prop="socialSecurityPays" label="社保个人" class="notice_td"></el-table-column>
                    <el-table-column prop="providentFundPay" label="公积金个人" class="notice_td"></el-table-column>
                    <el-table-column prop="withholdingTax" label="代扣个税" class="notice_td"></el-table-column>
                    <el-table-column prop="needPayment" label="实发工资" class="notice_td"></el-table-column>
                </el-table>
                <el-button type="primary" @click="dialogVisible = false" class="pay_btn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>

<script>
import Util from '../../script/util.js'


export default {
    name: 'payManage',
    data (){
        return{
            activeName: 'one', // 导航切换
            url: "spwSalaryPay/getSalaryBatchList", // 工资单列表url
            payrollList: [], // 工资单列表数据
            dialogVisible: false, // 弹框
            payrollDetailList: [], // 列表数据
        }
    },
    mounted: function (){
    }, 
    methods:{
        ajax: function (url){
            var self = this;
            this.$ajax.post(Util.url, 
                'method=spwSalaryPay/getSalaryBatchList'
                +'&param='+JSON.stringify({
                    "userId": 61,
                    "companyId": 61,
                    "pageNum": 1,
                    "pageSize": 10,
                })
            )
            .then(function (res) { 
                self.payrollList = res.data.data.result;
                self.payrollListPage = res.data.data.page;
                console.log(res.data.data.result)
            })
            .catch(function (err) {
                console.log(err);
            });
        },
    }

}
</script>

<style scoped>
.manage_con span{margin-right: 10px;}
.manage_con .manage_select{margin-right: 30px;}
</style>