import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index'  
import xzgl from 'components/xzgl/xzglIndex'
import zzrs from 'components/zzrs/zzrsIndex'  
import jur from 'components/jur/jurIndex'  

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
      path: '/xzgl',
      name: 'xzgl',
      component: xzgl
    },
    {
      path: '/zzrs',
      name: 'zzrs',
      component: zzrs
    },
    {
      path: '/jur',
      name: 'jur',
      component: jur
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
