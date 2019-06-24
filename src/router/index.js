import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'Login'}},
    {name: 'Login', path: '/login', component: Login}
  ]
})
