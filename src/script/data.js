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
        allocation: ['管理员']
    },{
        id: 2,
        name: '李大宝',
        department: '爱聚测试你',
        email: '72314551@qq.com',
        phone: 13002131234,
        state: 1,
        allocation: ['普通用户','客服']
    }
    ,{
        id: 3,
        name: '李大宝',
        department: '爱聚测试你',
        email: '72314551@qq.com',
        phone: 13002131234,
        state: 1,
        allocation: ['普通用户']
    }
    ,{
        id: 4,
        name: '李三',
        department: '人事部',
        email: '72314551@qq.com',
        phone: 13002131234,
        state: 0,
        allocation: ['仓储']
    }
]

exports.roleListData = [
    {
        id: 1,
        roleName: '管理员',
        authority: ['所有权限'],
    },{
        id: 2,
        roleName: '普通用户',
        authority: ['薪资管理'],
    },{
        id: 3,
        roleName: '客服',
        authority: ['薪资管理','组织管理'],
    },{
        id: 4,
        roleName: '仓储',
        authority: ['权限管理'],
    }

]

// 工资管理

exports.payManageList = [
    {
        id: 1,
        name: '维斯',
        jobNum: 1,
        department: '人事部',
        phone: 13921234123,
        email: '62131451@qq.com',
        state: 2,
        entryTime: '2016-12-12',
        pay: 8000,
    },{
        id: 2,
        name: '大和',
        jobNum: 2,
        department: '人事部',
        phone: 13921234123,
        email: '62131451@qq.com',
        state: 2,
        entryTime: '2016-12-12',
        pay: 8000,
    },{
        id: 3,
        name: '孟轲',
        jobNum: 3,
        department: '人事部',
        phone: 13921234123,
        email: '62131451@qq.com',
        state: 3,
        entryTime: '2016-12-12',
        pay: 8000,
    },{
        id: 4,
        name: '阿萨德',
        jobNum: 4,
        department: '人事部',
        phone: 13921234123,
        email: '62131451@qq.com',
        state: 3,
        entryTime: '2016-12-12',
        pay: 8000,
    },{
        id: 5,
        name: '李大宝',
        jobNum: 5,
        department: '人事部',
        phone: 13921234123,
        email: '62131451@qq.com',
        state: 2,
        entryTime: '2016-12-12',
        pay: 8000,
    }
]
exports.payManageEditData = [
    {
        time: '2017-12-02',
        beforePay: '1500.00',
        afterPay: '2000.00',
        range: '150.00',
        reason: '表现好',
    }
]
exports.departmentData = [
    {
        value: '01',
        label: '爱聚公司'
    },{
        value: '02',
        label: '技术部'
    },{
        value: '03',
        label: '人事部'
    },{
        value: '04',
        label: '产品部'
    },{
        value: '05',
        label: '财务部'
    },
]
exports.departmentStateData = [
    {
        value: 1,
        label: '全部'
    },{
        value: 2,
        label: '正式'
    },{
        value: 3,
        label: '试用'
    },{
        value: 4,
        label: '兼职'
    },{
        value: 5,
        label: '实习'
    },
]

exports.payRecordList = [
    {
        id: 1,
        name: '维斯',
        jobNum: '001',
        department: '技术部',
        entryTime: '2016-12-11',
        beforePay: '1500.00',
        afterPay: '2000.00',
        effectiveTime: '2017-05-01',
        range: '150.00',
        operator: '二郎',
        operationTime: '2017-04-20'
    }
]

// 工作汇报列表
exports.reportList = [
    {
        id: 1,
        createTime: '2017-05-03 14:00:00',
        senderName: '大和',
        recipientName: '卢克',
        content: {
            todayCon: '今天我做了啥',
            tomorrowCon: '明天我做了啥',
            feelCon: '我有啥体会',
        }
    },{
        id: 2,
        createTime: '2017-05-03 14:00:00',
        senderName: '大和',
        recipientName: '二郎',
        content: {
            todayCon: '今天我做了啥',
            tomorrowCon: '明天我做了啥',
            feelCon: '我有啥体会',
        }
    },{
        id: 3,
        createTime: '2017-05-03 14:00:00',
        senderName: '卢克',
        recipientName: '二郎',
        content: {
            todayCon: '今天我做了啥',
            tomorrowCon: '明天我做了啥',
            feelCon: '我有啥体会',
        }
    },{
        id: 4,
        createTime: '2017-05-03 14:00:00',
        senderName: '卢克',
        recipientName: '二郎',
        content: {
            todayCon: '今天我做了啥',
            tomorrowCon: '明天我做了啥',
            feelCon: '我有啥体会',
        }
    }
]
// 我发出的汇报
exports.reportMyList = [
    {
        id: 1,
        createTime: '2017-05-03 14:00:00',
        senderName: '大和',
        recipientName: '卢克',
        content: {
            todayCon: '今天我做了啥',
            tomorrowCon: '明天我做了啥',
            feelCon: '我有啥体会',
        }
    },{
        id: 2,
        createTime: '2017-05-03 14:00:00',
        senderName: '大和',
        recipientName: '二郎',
        content: {
            todayCon: '今天我做了啥',
            tomorrowCon: '明天我做了啥',
            feelCon: '我有啥体会',
        }
    }
]
// 人员结构
exports.orgTree = [
    {
        id:1,
        label: '爱聚科技公司',
        children: [
            {
                id: 11,
                label: '人事部',
                children: [
                    {
                        id: 101,
                        label: '优姬',
                    },{
                        id: 102,
                        label: '沉香',
                    },{
                        id: 103,
                        label: '鸣人',
                    }
                ]
            },{
                id: 12,
                label: '技术部',
                children: [
                    {
                        id: 201,
                        label: '大和',
                    },{
                        id: 202,
                        label: '奇牙',
                    },{
                        id: 203,
                        label: '菲亚',
                    }
                ]
            }
        ]
    }
]
exports.orgTreeProps = {
     children: 'children',
     label: 'label'
}





