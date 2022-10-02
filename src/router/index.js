import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [

  // HOME

  {
    path: '',
    component: HomeView,
    children:[
      {
        path: '/',
        name: 'index',
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeIndexComp.vue')
      },
      {
        path: 'news/:id',
        name: 'news',
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeNewsComp.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: 'login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
      },
      {
        path: 'register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
      },
      {
        path: 'learning',
        name: 'learning',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/LearningView.vue')
      },
      {
        path: 'schedules',
        name: 'schedules',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeSchedulesComp.vue')
      },
      {
        path: 'schedules/:id',
        name: 'schedules.id',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeScheduleUnitComp.vue')
      },
      {
        path: 'courses',
        name: 'courses',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeCoursesComp.vue')
      },
      {
        path: 'courses/:id',
        name: 'courses.id',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeCourseUnitComp.vue')
      },
      {
        path: 'blogs',
        name: 'blogs',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeBlogsComp.vue')
      },
      {
        path: 'blogs/:id',
        name: 'blogs.id',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/HomeBlogUnitComp.vue')
      },
      {
        path: 'quiz',
        name: 'quiz',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/QuizComp.vue')
      }
    ]
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
        path: 'lessons/:id',
        name: 'admin.lessons.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminLessonModifyComp.vue'),
      },
      {
        path: 'quizs',
        name: 'admin.quizs',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminQuizsComp.vue'),
      },
      {
        path: 'quizs/:id',
        name: 'admin.quizs.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminQuizModifyComp.vue'),
      },
      {
        path: 'questions',
        name: 'admin.questions',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminQuestionsComp.vue'),
      },
      {
        path: 'questions/:id',
        name: 'admin.questions.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminQuestionModifyComp.vue'),
      },
      {
        path: 'blogs',
        name: 'admin.blogs',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminBlogsComp.vue'),
      },
      {
        path: 'blogs/:id',
        name: 'admin.blogs.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/AdminBlogModifyComp.vue'),
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
        component: () => import(/* webpackChunkName: "about" */ '../components/UserBlogsComp.vue'),
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
      next(({ path:from.path}))
    }
  else if (store.state.isAdminLogin == false && store.state.isUserLogin == false && to.path == '/admin')
      next({ name: 'admin.login' })
  else 
    next()
  }
)

export default router
