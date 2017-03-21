<template>
    <div id='payManage'>
        <div class="manage_nav">
            
        </div>
        <div class="manage_con">
            <el-select v-model="departmentValue" placeholder="请选择">
                <el-option
                v-for="item in departmentData"
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
                         <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==0">正式</el-tag>
                         <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==1">试用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="entryTime" label="入职时间"></el-table-column>
                <el-table-column prop="pay" label="基本工资"></el-table-column>
                <el-table-column label="编辑">
                    <template scope="scope">
                        <el-button @click="roleEdit(scope.$index)" type="text">编辑</el-button>
                        <el-button @click="roleDel()" type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="">
                <el-pagination layout="prev, pager, next" :total="payManageTotalPage" @current-change=""></el-pagination>
            </div>
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
            departmentValue: '',
        }
    },

}
</script>

<style scoped>

</style>