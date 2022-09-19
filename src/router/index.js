import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [

  // HOME

  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/learning',
    name: 'learning',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LearningView.vue')
  },
  // ADMIN

  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
    children:[
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../components/LoginComp.vue'),
      },
    ]
  },

  // USER

  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
    children:[
      {
        path: 'profile',
        component: () => import(/* webpackChunkName: "about" */ '../components/UserProfileComp.vue'),
      },
      {
        path: 'progress',
        component: () => import(/* webpackChunkName: "about" */ '../components/UserProgressComp.vue'),
      },
      {
        path: 'timetable',
        component: () => import(/* webpackChunkName: "about" */ '../components/UserTimetableComp.vue'),
      },
      {
        path: 'courses',
        component: () => import(/* webpackChunkName: "about" */ '../components/UserCoursesComp.vue'),
      },
      {
        path: 'blog',
        component: () => import(/* webpackChunkName: "about" */ '../components/UserBlogComp.vue'),
      },
    ]
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
