import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Wood from '../views/Wood.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Users
  },
  {
    path: '/wood',
    name: 'Wood',
    component: Wood
  },
  {
    path: '/user',
    name: 'User',
    component: Users
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
