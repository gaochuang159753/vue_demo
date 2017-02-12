import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'  
import Table from 'components/Table'
import About from 'components/About'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
  ]
})
