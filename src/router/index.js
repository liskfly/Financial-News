import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView'
import AudioView from '../views/AudioView/AudioView'
import UserView from '../views/UserView/UserView'
import ReadView from '../views/ReadView/ReadView'

import AllView from '../views/ReadView/ReadChildren/AllView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      showfater: true
    },
    children: [
      {
        path: 'home-article',
        name: 'home-article',
        meta: {
          showfater: false
        },
        component: () => import("../views/HomeChildren/HomeArticleView.vue"),
      },
      {
        path:'/magazineData',
        name:'magazineData',
        component: () => import("@/components/magazineData.vue"),
      },
      {
        path:'/choieBook',
        name:'choieBook',
        component: () => import("@/components/choicBook.vue"),
      }
    ]
  },
  {
    path: '/audio',
    name: 'audio',
    component: AudioView,
    meta: {
      showfater: true
    },
  },
  {
    path: '/read',
    name: 'read',
    component: ReadView,
    meta: {
      showfater: true
    },
    children: [{
      path: '/read/',
      name: 'all',
      component: AllView,
      meta: {
        showfater: true
      }
    }, {
      path: '/read/magazine',
      name: 'magazine',
      component: () => import("../views/ReadView/ReadChildren/MagazineView.vue"),
      meta: {
        showfater: true
      },
    }, {
      path: '/read/Booklet',
      name: 'Booklet',
      component: () => import("../views/ReadView/ReadChildren/BookletView.vue"),
      meta: {
        showfater: true
      }
    }]
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      showfater: true
    },
  },
  {
    path: '/keyword-article',
    name: 'keyword-article',
    component: () => import("@/components/KeywordArticle"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location) {
  return routerReplace.call(this, location).catch(error => error)
}


export default router
