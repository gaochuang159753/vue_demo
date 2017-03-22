<template>
    <div id='payManage'>
        <div class="manage_nav">
           
        </div>
        <div class="manage_con">
            <el-tabs v-model="activeName">
                <el-tab-pane label="本月计薪" name="one">
                    <span>筛选部门</span>
                    <el-select v-model="departmentValue" placeholder="请选择部门" class="manage_select">
                        <el-option
                        v-for="item in departmentData"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span>筛选编制</span>
                    <el-select v-model="departmentStateValue" placeholder="请选择编制" @change="filtrateTable(departmentStateValue)">
                        <el-option
                        v-for="item in departmentStateData"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-table :data="payManageList" style="width: 100%" align="center" class="common_table">
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="jobNum" label="工号"></el-table-column>
                        <el-table-column prop="department" label="部门"></el-table-column>
                        <el-table-column prop="email" label="邮箱"></el-table-column>
                        <el-table-column prop="phone" label="手机号码"></el-table-column>
                        <el-table-column prop="state" label="编制">
                            <template scope="scope">
                                <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==2">正式</el-tag>
                                <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==3">试用</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="entryTime" label="入职时间"></el-table-column>
                        <el-table-column prop="pay" label="基本工资"></el-table-column>
                        <el-table-column label="编辑">
                            <template scope="scope">
                                <el-button @click="" type="text">调薪</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="">
                        <el-pagination layout="prev, pager, next" :total="payManageTotalPage" @current-change=""></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="调薪记录" name="two">
                    <el-table :data="payRecordList" style="width: 100%" align="center" class="common_table">
                        <el-table-column prop="id" label="序号"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="jobNum" label="工号"></el-table-column>
                        <el-table-column prop="department" label="部门"></el-table-column>
                        <el-table-column prop="entryTime" label="入职时间"></el-table-column>
                        <el-table-column prop="beforePay" label="调整前薪资"></el-table-column>
                        <el-table-column prop="afterPay" label="调整后薪资"></el-table-column>
                        <el-table-column prop="effectiveTime" label="生效时间"></el-table-column>
                        <el-table-column prop="range" label="涨幅程度"></el-table-column>
                        <el-table-column prop="operator" label="操作人"></el-table-column>
                        <el-table-column prop="operationTime" label="操作时间"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs> 
            
        </div>
    </div>
</template>

<script>
import CommonData from '../../script/data.js'

export default {
    name: 'payManage',
    data (){
        return{
            payManageList: CommonData.payManageList,
            payManageTotalPage: 1,
            departmentData: CommonData.departmentData,
            departmentStateData: CommonData.departmentStateData,
            departmentValue: '',
            departmentStateValue: '',
            activeName: 'one',
            payRecordList: CommonData.payRecordList,
        }
    },
    methods:{
        filtrateTable: function (value){
            var newPayManageList = [];
            for(var i=0;i<CommonData.payManageList.length;i++){
                if(CommonData.payManageList[i].state == value){
                    newPayManageList.push(CommonData.payManageList[i])
                }
            }
            this.payManageList = newPayManageList;
        }
    }

}
</script>

<style scoped>
.manage_con span{margin-right: 10px;}
.manage_con .manage_select{margin-right: 30px;}
</style>