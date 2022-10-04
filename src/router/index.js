import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView'
import AudioView from '../views/AudioView/AudioView'
import UserView from '../views/UserView/UserView'
import ReadView from '../views/ReadView/ReadView'

import AllView from '../views/ReadView/AllView/AllView.vue'
import MagazineView from '../views/ReadView/MagazineView/MagazineView.vue'
import BookletView from '../views/ReadView/BookletView/BookletView.vue'

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
<<<<<<< HEAD
    meta:{
      showfater:true
    },
=======
    children:[{
      path: '/read/',
      name: 'all',
      component: AllView,
    },{
      path: '/read/magazine',
      name: 'magazine',
      component: MagazineView,
    },{
      path: '/read/Booklet',
      name: 'Booklet',
      component: BookletView,
    }]
>>>>>>> readPage
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
