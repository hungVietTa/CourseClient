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
        name: 'home.courses',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/courses/index.vue')
      },
      {
        path: 'courses/:id',
        name: 'home.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/courses/_id.vue')
      },
      {
        path: 'blogs',
        name: 'home.blogs',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/blogs/index.vue')
      },
      {
        path: 'blogs/:id',
        name: 'home.blogs.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/blogs/_id.vue')
      },
      {
        path: 'blogs/draft',
        name: 'home.blogs.draft',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/blogs/draft.vue')
      },
      {
        path: 'quizs',
        name: 'home.quizs',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/quizs/index.vue')
      },
      {
        path: 'quizs/:id',
        name: 'home.quizs.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/general/quizs/_id.vue')
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
        path: 'lessons',
        name: 'admin.lessons',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/lessons/index.vue'),
      },
      {
        path: 'lessons/:id',
        name: 'admin.lessons.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/lessons/_id.vue'),
      },
      {
        path: 'quizs',
        name: 'admin.quizs',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/quizs/index.vue'),
      },
      {
        path: 'quizs/:id',
        name: 'admin.quizs.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/quizs/_id.vue'),
      },
      {
        path: 'questions',
        name: 'admin.questions',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/questions/index.vue'),
      },
      {
        path: 'questions/:id',
        name: 'admin.questions.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/questions/_id.vue'),
      },
      {
        path: 'blogs',
        name: 'admin.blogs',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/blogs/index.vue'),
      },
      {
        path: 'blogs/:id',
        name: 'admin.blogs.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/admin/blogs/_id.vue'),
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
        path: 'user.profile',
        name: 'user.profile.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/profile/index.vue'),
      },
      {
        path: 'user.schedules',
        name: 'user.schedule.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/schedules/index.vue'),
      },
      {
        path: 'user.schedules/:id',
        name: 'user.schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/schedules/_id.vue'),
      },
      {
        path: 'user.courses',
        name: 'user.courses',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/courses/index.vue'),
      },
      {
        path: 'user.courses/:id',
        name: 'user.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/courses/_id.vue'),
      },
      {
        path: 'user.blogs',
        name: 'user.blogs',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/blogs/index.vue'),
      },
      {
        path: 'user.blogs',
        name: 'user.blogs.id',
        component: () => import(/* webpackChunkName: "about" */ '@/views/user/blogs/_id.vue'),
      },
      {
        path: 'user.timetable',
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
  if (store.state.isUserLogin == true && ( to.name == 'login' || to.name == 'register' ))
    {
      next({ name: 'home' })
    }
  else if ((store.state.isAdminLogin == true && to.path == '/admin/login'))
    next({ name: 'admin' })
  else if (store.state.isAdminLogin == false && store.state.isUserLogin == true && to.path.includes("/admin"))
    { console.log(from.path)
      alert("Tài khoản của bạn không đủ quyền truy cập trang này")
      next({ path:from.path})
    }
  else if (store.state.isAdminLogin == false && store.state.isUserLogin == false && to.path.includes("/admin")&&to.path!=("/admin/login"))
      next({ name: 'admin.login' })
  else 
    next()
  }
)

export default router
