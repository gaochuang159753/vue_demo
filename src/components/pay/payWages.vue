<template>
    <div id='payRecord'>
        <el-tabs v-model="activeName">
            <el-tab-pane label="发放工资条" name="one">
                <el-steps :space="200" :active="wagesStep" :center="true" class="wages_step">
                    <el-step title="上传" description=""></el-step>
                    <el-step title="预览" description=""></el-step>
                    <el-step title="发放" description="" style="width: auto;"></el-step>
                </el-steps>

                <div class="wages_one" v-show="wagesStep==1">
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-upload :action="uploadUrl" :data="uploadData" :on-success="uploadSuccess" :show-file-list="false">
                            <el-button type="primary" class="wages_btn_m20">上传工资单</el-button>
                        </el-upload>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="center">
                        <div class="hrm_module">
                            <div class="hrm_module_nav">注意事项</div>
                            <div class="hrm_module_con">
                                <p>我们为你提供了工资单模板，请下载使用我们提供的工资单模板来录入工资数据，然后进行上传；</p>
                                <p>工资单模板不允许修改，如果列值不需要，系统会默认为0；</p>
                                <p>工资单模版中务必包含：手机和邮箱（用于发送提醒），并且要确保这些列的数据的正确无误；</p>
                            </div>
                        </div>
                    </el-row>
                </div>
                <div class="wages_two" v-show="wagesStep == 2">
                    <div class="hrm_module">
                        <div class="hrm_module_nav">预览工资单</div>
                        <div class="hrm_module_con">
                            <el-table :data="uploadList" style="width: 100%" align="center">
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
                        </div>
                        <el-button type="primary" class="wages_btn_m20 f_r" @click="wagesStep = 3">下一步</el-button>
                    </div>
                </div>
                <div class="wages_three" v-show="wagesStep == 3">
                    <div class="hrm_module">
                        <div class="hrm_module_nav">设置邮件信息</div>
                        <div class="hrm_module_con">
                            <div class="hrm_item">
                                <label>发薪月份</label>
                                <el-select v-model="emailData.emailMonth" placeholder="请选择发薪月份" style="width: 200px;">
                                    <el-option v-for="item in monthArray" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="hrm_item">
                                <label>发薪类型</label>
                                <el-input value="薪资" style="width: 200px;" :disabled="true"></el-input>
                            </div>
                            <div class="hrm_item">
                                <label>邮件标题</label>
                                <el-input v-model="emailData.emailTitle" placeholder="请输入邮件标题" style="width: 300px;"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_module">
                        <div class="hrm_module_nav">设置工资条展示信息</div>
                        <div class="hrm_module_con">
                            <table>
                                <tr><th v-for="(key,val) in topList"><el-checkbox :checked="true" @change="checkboxWagesMsg(val)"></el-checkbox></th></tr>
                                <tr><td v-for="(key,val) in topList">{{key}}</td></tr>
                            </table>
                        </div>
                    </div>
                    <el-button type="primary" class="f_r">下一步</el-button>
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
                wagesStep: 1, // 步骤
                uploadUrl: Util.uploadURL, // 上传地址
                uploadData: {
                    "param": "{'companyId': 61,'pid': '',}"
                },// ajax param
                uploadList: [],// 上传数据
                monthArray: ['2017年06月', '2017年07月', '2017年08月', '2017年09月', '2017年10月', '2017年11月', '2017年12月'],// 月份数据
                emailData: {
                    emailMonth: '',
                    emailType: '',
                    emailTitle: '',
                },
                topList: {}, // 表格表头对象
            }
        },
        mounted: function () {
        },
        methods: {
            ajax: function (url) {
                var self = this;
                this.$ajax.post(Util.url,
                    'method=spwSalaryPay/getSalaryBatchList'
                    + '&param=' + JSON.stringify({
                        "userId": 61,
                        "companyId": 61,
                        "pageNum": 1,
                        "pageSize": 10,
                    })
                )
                    .then(function (res) {
                        self.payrollList = res.data.data.result;
                        self.payrollListPage = res.data.data.page;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 上传工资单
            uploadSuccess: function (res, file, fileList) {
                this.uploadList = res.data.spwSalaryPays;
                this.topList = res.data.topList;
                console.log(this.topList)
                this.wagesStep = 2;
            },
            // 设置工资条展示信息
            checkboxWagesMsg: function (val) {
                console.log(val)
                
            }
            
        }

    }

</script>

<style scoped>
    .hrm_module p {
        line-height: 36px;
    }
    .wages_btn_m20 {
        margin: 20px 0;
    }
    .wages_step {
        margin: 50px 0;
    }
    .hrm_module_con table{
        text-align: center;
        border: 1px solid #dfe6ec;
        width: 100%;
    }
    .hrm_module_con table th{
        border-bottom: 1px solid #dfe6ec;
        background: #eef1f6;
        line-height: 40px;
    }
    .hrm_module_con table td{
        line-height: 40px;
        padding: 0 12px;
    }
    .hrm_module_con .el-checkbox{
        height: 30px;
    }
</style>