import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView'
import AudioView from '../views/AudioView/AudioView'
import UserView from '../views/UserView/UserView'
import ReadView from '../views/ReadView/ReadView'

import AllView from '../views/ReadView/AllView/AllView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      showfater:true
    },
    children: [
      {
        path: 'home-article',
        name: 'home-article',
        meta:{
          showfater:false
        },
        component: () => import("../views/HomeChildren/HomeArticleView.vue"),
      }
    ]
  },
  {
    path: '/audio',
    name: 'audio',
    component: AudioView,
    meta:{
      showfater:true
    },
  },
  {
    path: '/read',
    name: 'read',
    component: ReadView,
    meta:{
      showfater:true
    },
    children:[{
      path: '/read/',
      name: 'all',
      component: AllView,
      meta:{
        showfater:true
      },
    },{
      path: '/read/magazine',
      name: 'magazine',
      component:()=>import("../views/ReadView/MagazineView/MagazineView.vue"),
      meta:{
        showfater:true
      },
    },{
      path: '/read/Booklet',
      name: 'Booklet',
      component: ()=>import("../views/ReadView/BookletView/BookletView.vue"),
      meta:{
        showfater:true
      },
    }]

  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta:{
      showfater:true
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
