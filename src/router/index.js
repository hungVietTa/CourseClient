import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/general/index.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [

  // GENERAL
  {
    // home page and shared layout except login and register 
    path: '/',
    component:HomeView,
    children:[
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/home/index.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/general/about/index.vue')
      },
      {
        path: 'news',
        name: 'home.news',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/news/index.vue')
      },
      {
        path: '/schedules',
        name: 'home.schedules',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/schedules/index.vue')
      },
      {
        path: 'schedules/:id',
        name: 'home.schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/schedules/_id.vue')
      },
      {
        path: 'courses',
        alias:'courses/:category',
        name: 'home.courses',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/courses/index.vue')
      },
      {
        path: 'courses/:id/learning',
        name: 'home.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/courses/_id.vue')
      },
      {
        path: 'quizzes',
        name: 'home.quizzes',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/quizzes/index.vue')
      },
      {
        path: 'quizzes/:id',
        name: 'home.quizzes.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/quizzes/_id.vue')
      }
    ]
  },
  // general login and register which does not share the layout with Home
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/general/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/general/register.vue')
  },

  // ADMIN PAGE
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/admin/index.vue'),
    children: [
      {
        path: 'login',
        name: 'admin.login',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/login.vue'),
      },
      {
        path: 'users',
        name: 'admin.users',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/users/index.vue'),
      },
      {
        path: 'users/:id',
        name: 'admin.users.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/users/_id.vue'),
      },
      {
        path: 'categories',
        name: 'admin.categories',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/categories/index.vue'),
      },
      {
        path: 'billboards',
        name: 'admin.billboards',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/billboards/index.vue'),
      },
      {
        path: 'billboards/:id',
        name: 'admin.billboards.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/billboards/_id.vue'),
      },
      {
        path: 'schedules',
        name: 'admin.schedules',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/schedules/index.vue'),
      },
      {
        path: 'schedules/:id',
        name: 'admin.schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/schedules/_id.vue'),
      },
      {
        path: 'courses',
        name: 'admin.courses',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/courses/index.vue'),
      },
      {
        path: 'courses/:id',
        name: 'admin.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/courses/_id.vue'),
      },
      {
        path: 'courses/:id/lessons/new',
        name: 'admin.lessons.new',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/courses/lessons/new.vue'),
      },
      {
        path: 'courses/:id/lessons/:lesson_id',
        name: 'admin.lessons',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/courses/lessons/_id.vue'),
      },
      {
        path: 'courses/:id/quizzes/:quiz_id',
        name: 'admin.quizzes.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/courses/quizzes/_id.vue'),
      }
    ]
  },

  // USER

  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/index.vue'),
    children: [
      {
        path: 'profile',
        name: 'user.profile.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/profile/index.vue'),
      },
      {
        path: 'schedules',
        name: 'user.schedule.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/schedules/index.vue'),
      },
      {
        path: 'schedules/:id',
        name: 'user.schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/schedules/_id.vue'),
      },
      {
        path: 'user.courses',
        name: 'user.courses',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/courses/index.vue'),
      },
      {
        path: 'courses/:id',
        name: 'user.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/courses/_id.vue'),
      },
      {
        path: 'timetable',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/timetable/index.vue'),
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (store.state.authen.isUserLogin == true && ( to.name == 'login' || to.name == 'register' ))
    {
      next({ name: 'home' })
    }
  else if ((store.state.authen.isAdminLogin == true && to.path == '/admin/login'))
    next({ name: 'admin' })
  else if (store.state.authen.isAdminLogin == false && store.state.authen.isUserLogin == true && to.path.includes("/admin"))
    { console.log(from.path)
      alert("Tài khoản của bạn không đủ quyền truy cập trang này")
      next({ path:from.path})
    }
  else if (store.state.authen.isAdminLogin == false && store.state.authen.isUserLogin == false && to.path.includes("/admin")&&to.path!=("/admin/login"))
      next({ name: 'admin.login' })
  else 
    next()
  }
)

export default router
