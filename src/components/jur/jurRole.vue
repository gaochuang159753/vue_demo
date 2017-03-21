<template>
    <div id='jur'>
        <div class="jur_common_btn">
            <el-button @click="" @click="jurPop=true" type="primary">添加角色</el-button>
        </div>
        <div class="jur_common_con">
            <el-table :data="roleListData" highlight-current-row @current-change="jurClickTable" style="width: 100%" align="center" class="jur_common_table">
                <el-table-column prop="id" label="序号" class="jur_common_td"></el-table-column>
                <el-table-column prop="roleName" label="角色" class="jur_common_td"></el-table-column>
                <el-table-column prop="authority" label="权限" class="jur_common_td"></el-table-column>
                <el-table-column label="编辑" class="jur_common_td">
                    <template scope="scope">
                        <el-button @click="" type="text">编辑</el-button>
                        <el-button @click="" type="text">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="jur_common_page">
                <el-pagination layout="prev, pager, next" :total="accreditTotalPage" @current-change=""></el-pagination>
            </div>
        </div>
        <el-dialog title="设置员工权限" v-model="jurPop" size="tiny">
            
            <div class="common_item clearfix">
                <span class="common_item_label">角色</span>
                <div class="common_item_com">
                    <el-input placeholder="请输入角色名称"></el-input>
                </div>
            </div>
            <div class="common_item clearfix">
                <span class="common_item_label">选择权限</span>
                <div class="common_item_com">
                    <el-button @click="selectAccredit=1">协同办公</el-button>
                    <el-button @click="selectAccredit=2">HRM</el-button>
                </div>
            </div>
            <div class="common_item clearfix" v-show="selectAccredit==2">
                <div class="common_item_com">
                    <el-checkbox-group class="common_item_checkbox" @change="handleCheckAll" v-model="jurPopCheckData">
                        <el-checkbox label="全选"></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group class="common_item_checkbox" v-model="jurPopCheckData">
                        <el-checkbox label="薪资管理"></el-checkbox>
                        <el-checkbox label="发放工资单" disabled></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group class="common_item_checkbox" v-model="jurPopCheckData">
                        <el-checkbox label="组织管理"></el-checkbox>
                        <el-checkbox label="部门管理" disabled></el-checkbox>
                        <el-checkbox label="职务管理" disabled></el-checkbox>
                        <el-checkbox label="员工管理" disabled></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group class="common_item_checkbox" v-model="jurPopCheckData">
                        <el-checkbox label="权限管理"></el-checkbox>
                        <el-checkbox label="角色管理" disabled></el-checkbox>
                        <el-checkbox label="员工授权" disabled></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="common_item clearfix" v-show="selectAccredit==1">
                <div class="common_item_com">
                    <el-checkbox-group class="common_item_checkbox" v-model="jurPopCheckData">
                        <el-checkbox label="OA权限"></el-checkbox>
                    </el-checkbox-group>
                    
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jurPop = false">取消</el-button>
                <el-button type="primary" @click="jurPop = false">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Util from '../../script/util.js'
import CommonData from '../../script/data.js'

const checkOptions = ['薪资管理','组织管理','权限管理','全选'];


export default {
    name: 'jur',
    data() {
        return{
            roleListData: CommonData.roleListData,
            accreditTotalPage: 1,
            jurPop: false,
            jurPopCheckbox: ['普通用户'],
            jurClickTableId: '',
            jurPopCheckData: [],
            selectAccredit: 0,
        }
    },
    mounted: function (){
    }, 
    methods: {
        jurClickTable: function (row){
            this.jurClickTableId = row.id
        },
        handleCheckAll: function (){
            this.jurPopCheckData=this.jurPopCheckData.length == 3?[]:checkOptions
        }
    }
}
</script>

<style scoped>
.jur_common_table{
    margin: 30px 0;
}

</style>