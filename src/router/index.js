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
    component: HomeView
  },
  {
    path: '/audio',
    name: 'audio',
    component: AudioView
  },
  {
    path: '/read',
    name: 'read',
    component: ReadView,
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
    },{
      path: '/read/BookData',
      name: 'Booklet',
      component: () => import("../components/ReadBookData.vue"),
    }]
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
