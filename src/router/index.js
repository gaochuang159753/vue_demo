import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index'  
import payManage from 'components/pay/payManage'
import payRecord from 'components/pay/payRecord'
import payWages from 'components/pay/payWages'
import payAdjust from 'components/pay/payAdjust'




import jurAccredit from 'components/jur/jurAccredit'  
import jurRole from 'components/jur/jurRole'  


import oa from 'components/oa/oaIndex'
import oaReport from 'components/oa/oaReport'
import oaExamine from 'components/oa/oaExamine'
import oaAssignment from 'components/oa/oaAssignment'
import oaNotice from 'components/oa/oaNotice'

  
  

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'null',
      component: index
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/pay/payManage',
      name: 'payManage',
      component: payManage
    },
    {
      path: '/pay/payRecord',
      name: 'payRecord',
      component: payRecord
    },
    {
      path: '/pay/payWages',
      name: 'payWages',
      component: payWages
    },
    {
      path: '/pay/payAdjust',
      name: 'payAdjust',
      component: payAdjust
    },
    {
      path: '/jur/Accredit',
      name: 'jurAccredit',
      component: jurAccredit
    },
    {
      path: '/jur/role',
      name: 'jurRole',
      component: jurRole
    },
    {
      path: '/oa',
      name: 'oa',
      component: oa,
      children: [
        {
          path: '/oa/report',
          name: 'oaReport',
          component: oaReport
        },
        {
          path: '/oa/examine',
          name: 'oaExamine',
          component: oaExamine
        },
        {
          path: '/oa/assignment',
          name: 'oaAssignment',
          component: oaAssignment
        },
        {
          path: '/oa/notice',
          name: 'oaNotice',
          component: oaNotice
        },
      ]
    },
    
  ]
})
