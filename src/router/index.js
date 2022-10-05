import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [

  // HOME
  {
    path: '/blog',
    name: 'blog',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogView.vue')
  }
,
  {
    path: '',
    component: HomeView,
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/IndexComp.vue')
      },
      {
        path: 'news/:id',
        name: 'news',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/NewsComp.vue')
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
        path: 'learning-path',
        name: 'learningpath',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/LearningPathComp.vue')
      },
      {
        path: 'schedules',
        name: 'schedules',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/SchedulesComp.vue')
      },
      {
        path: 'schedules/:id',
        name: 'schedules.id',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/ScheduleUnitComp.vue')
      },
      {
        path: 'courses',
        name: 'courses',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/CoursesComp.vue')
      },
      {
        path: 'courses/:id',
        name: 'courses.id',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/CourseUnitComp.vue')
      },
      {
        path: 'blogs',
        name: 'blogs',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/BlogsComp.vue')
      },
      {
        path: 'draft',
        name: 'draft',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/BlogDraftComp.vue')
      },
      {
        path: 'blogs/:id',
        name: 'blogs.id',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/BlogUnitComp.vue')
      },
      {
        path: 'quiz',
        name: 'quiz',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/Others/QuizComp.vue')
      },
      {
        path: 'forgot',
        name: 'forgot',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName:"about"*/ '../components/Others/ForgotPasswordComp.vue')
      }
    ]
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
  // ADMIN

  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
    children: [
      {
        path: 'login',
        name: 'admin.login',
        component: () => import(/* webpackChunkName: "about" */ '../components/Others/LoginComp.vue'),
      },
      {
        path: 'schedules',
        name: 'admin.schedules',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/SchedulesComp.vue'),
      },
      {
        path: 'schedules/:id',
        name: 'admin.schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/ScheduleModifyComp.vue'),
      },
      {
        path: 'courses',
        name: 'admin.courses',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/CoursesComp.vue'),
      },
      {
        path: 'courses/:id',
        name: 'admin.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/CourseEditComp.vue'),
      },
      {
        path: 'lessons',
        name: 'admin.lessons',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/LessonsComp.vue'),
      },
      {
        path: 'lessons/:id',
        name: 'admin.lessons.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/LessonModifyComp.vue'),
      },
      {
        path: 'quizs',
        name: 'admin.quizs',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/QuizsComp.vue'),
      },
      {
        path: 'quizs/:id',
        name: 'admin.quizs.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/QuizModifyComp.vue'),
      },
      {
        path: 'questions',
        name: 'admin.questions',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/QuestionsComp.vue'),
      },
      {
        path: 'questions/:id',
        name: 'admin.questions.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/QuestionModifyComp.vue'),
      },
      {
        path: 'blogs',
        name: 'admin.blogs',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/BlogsComp.vue'),
      },
      {
        path: 'blogs/:id',
        name: 'admin.blogs.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/BlogModifyComp.vue'),
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
        component: () => import(/* webpackChunkName: "about" */ '../components/User/ProfileComp.vue'),
      },
      {
        path: 'schedules',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/SchedulesComp.vue'),
      },
      {
        path: 'schedules/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/ScheduleUnitComp.vue'),
      },
      {
        path: 'courses',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/CoursesComp.vue'),
      },
      {
        path: 'courses/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/CourseUnitComp.vue'),
      },
      {
        path: 'blogs',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/BlogsComp.vue'),
      },
      {
        path: 'blogs/modify',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/BlogModifyComp.vue'),
      },
      {
        path: 'timetable',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/TimetableComp.vue'),
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
  if (store.state.isUserLogin == true && to.name == 'login' || to.name == 'register')
    {
      next({ name: 'home' })
    }
  else if ((store.state.isAdminLogin == true && to.path == '/admin/login'))
    next({ name: 'admin' })
  // else if (store.state.isAdminLogin == false && store.state.isUserLogin == true && to.path.includes("/admin"))
  //   { console.log(from.path)
  //     alert("Tài khoản của bạn không đủ quyền truy cập trang này")
  //     next({ path:from.path})
  //   }
  // else if (store.state.isAdminLogin == false && store.state.isUserLogin == false && to.path.includes("/admin")&&to.path!=("/admin/login"))
  //     next({ name: 'admin.login' })
  else 
    next()
  }
)

export default router
