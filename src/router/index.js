import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

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
  {
    path: '/schedule',
    name: 'schedule',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ScheduleView.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CoursesView.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogView.vue')
  },
  {
    path: '/quiz',
    name: 'quiz',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/QuizComp.vue')
  },
  // ADMIN

  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
    children: [
      {
        path: 'login',
        name: 'admin.login',
        component: () => import(/* webpackChunkName: "about" */ '../components/LoginComp.vue'),
      },
      {
        path: 'resources',
        name: 'admin.resources',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminResourcesComp.vue'),
      },
      {
        path: 'schedules',
        name: 'admin.schedules',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminSchedulesComp.vue'),
      },
      {
        path: 'schedules/:id',
        name: 'admin.schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminScheduleModifyComp.vue'),
      },
      {
        path: 'courses',
        name: 'admin.courses',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminCoursesComp.vue'),
      },
      {
        path: 'courses/:id',
        name: 'admin.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminCourseModifyComp.vue'),
      },
      {
        path: 'lessons',
        name: 'admin.lessons',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminLessonsComp.vue'),
      },
      {
        path: 'quizs',
        name: 'admin.quizs',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminQuizsComp.vue'),
      },
      {
        path: 'blogs',
        name: 'admin.blogs',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminBlogsComp.vue'),
      }
    ]
  },

  // USER

  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
    children: [
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

router.beforeEach((to, from, next) => {
  if ((store.state.isUserLogin == true && to.name == 'login') || (store.state.isUserLogin == true && to.name == 'register'))
    next({ name: 'home' })
  else if ((store.state.isAdminLogin == true && to.path == '/admin/login'))
    next({ name: 'admin' })
  else if (store.state.isAdminLogin == false && store.state.isUserLogin == true && (to.path == '/admin/login' || to.path == '/admin'))
    {
      alert("tai khoan cua ban khong du quyen truy cap trang nay")
      next({ name:from.name })
    }
  else if (store.state.isAdminLogin == false && store.state.isUserLogin == false && to.path == '/admin')
      next({ name: 'admin.login' })
  else 
    next()
  }
)

export default router
