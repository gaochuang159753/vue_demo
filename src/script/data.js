'use strict';

/**
 * 服务器地址
 * @return {String} url
 */
exports.accreditList = [
    {
        id: 1,
        name: '李大宝',
        department: '爱聚测试你',
        email: '72314551@qq.com',
        phone: 13002131234,
        state: 0,
        allocation: '管理员'
    },{
        id: 2,
        name: '李大宝',
        department: '爱聚测试你',
        email: '72314551@qq.com',
        phone: 13002131234,
        state: 1,
        allocation: '普通用户'
    }
    ,{
        id: 3,
        name: '李大宝',
        department: '爱聚测试你',
        email: '72314551@qq.com',
        phone: 13002131234,
        state: 1,
        allocation:'普通用户'
    }
    ,{
        id: 4,
        name: '李三',
        department: '人事部',
        email: '72314551@qq.com',
        phone: 13002131234,
        state: 0,
        allocation: '库管'
    }
]

exports.roleListData = [
    {
        id: 1,
        roleName: '管理员',
        authority: ['所有权限','HRM'],
    },{
        id: 2,
        roleName: '普通用户',
        authority: ['HRM'],
    },{
        id: 3,
        roleName: '客服',
        authority: ['HRM','协同办公'],
    },{
        id: 4,
        roleName: '仓储',
        authority: ['所有权限','HRM'],
    }

]


