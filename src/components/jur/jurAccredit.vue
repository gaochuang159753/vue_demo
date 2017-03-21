<template>
    <div id='jur'>
        <div class="jur_common_btn">
            <el-button @click="" @click="jurSet()" type="primary">设置员工权限</el-button>
        </div>
        <div class="jur_common_con">
            <el-table :data="accreditList" highlight-current-row @current-change="jurClickTable" style="width: 100%" align="center" class="common_table">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="手机号码"></el-table-column>
                <el-table-column prop="state" label="用户状态">
                    <template scope="scope">
                         <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==0">已激活</el-tag>
                         <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==1">未激活</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="allocation" label="已分配角色">
                    <template scope="scope">
                         <el-tag type="gray" class="common_table_tag" v-for="tag in scope.row.allocation">{{tag}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <div class="jur_common_page">
                <el-pagination layout="prev, pager, next" :total="accreditTotalPage" @current-change=""></el-pagination>
            </div>
        </div>
        <el-dialog title="设置员工权限" v-model="jurPop" size="tiny">
            <el-checkbox-group v-model="accreditTableData">
                <el-checkbox label="普通用户" disabled></el-checkbox>
                <el-checkbox label="客服"></el-checkbox>
                <el-checkbox label="仓库管理"></el-checkbox>
                <el-checkbox label="仓储"></el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jurPop = false">取 消</el-button>
                <el-button type="primary" @click="jurPop = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Util from '../../script/util.js'
import CommonData from '../../script/data.js'


export default {
    name: 'jur',
    data() {
        return{
            accreditList: CommonData.accreditList,
            accreditTotalPage: 1,
            jurPop: false,
            jurPopCheckData: ['普通用户'],
            accreditTableData: '',
             
        }
    },
    mounted: function (){
    }, 
    methods: {
        jurClickTable: function (row){
            this.accreditTableData = row.allocation
        },
        jurSet: function (){
            if(this.accreditTableData == ''){
                this.$message({
                    message: '请点击表格选择人员',
                    type: 'warning'
                });
            }else{
                this.jurPopCheckData = this.accreditTableData
                this.jurPop = true
            }
            
        }
    }
}
</script>

<style scoped>

</style>