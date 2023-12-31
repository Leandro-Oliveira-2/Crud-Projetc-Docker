import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/betting',
    name: 'betting',
    component: ()=> import('../views/bettingpage.vue'),
    props:true,
  },
  {
    path: '/deposit',
    name: 'deposit',
    component: ()=> import('../views/depositPage.vue')
  },
  {
    path: '/saque',
    name: 'saquePage',
    component: ()=> import('../views/saquePage.vue')
  },
  {
    path: '/alter',
    name: 'alterUser',
    component: ()=> import('../views/AlterUserView.vue'),
    props:true,
  },
  {
    path: '/userScreen',
    name: 'userScreen',
    component: ()=> import('../views/UserScreen.vue')
  },
  {
    path: '/transations',
    name: 'transations',
    component: ()=> import('../views/TransationsView.vue')
  },
  {
    path: '/transfers',
    name: 'transferPage',
    component: ()=> import('../views/TransferView.vue')
  },
  {
    path: '/aboutUser',
    name: 'aboutUser',
    component: ()=> import('../views/AboutUserView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
