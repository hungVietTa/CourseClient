import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/index.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [

  // GENERAL
  {
    // INDEX
    path: '/',
    component:{
    HomeView
    },
    children:[
      {
        path: 'news/:id',
        name: 'news',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/NewsComp.vue')
      },
      {
        path: 'learning',
        name: 'learning',
        component: () => import(/* webpackChunkName: "about" */ '../views/LearningView.vue')
      },
      {
        path: 'learning-path',
        name: 'learningpath',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/LearningPathComp.vue')
      },
      {
        path: 'schedules',
        name: 'schedules',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/SchedulesComp.vue')
      },
      {
        path: 'schedules/:id',
        name: 'schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/ScheduleUnitComp.vue')
      },
      {
        path: 'courses',
        name: 'courses',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/CoursesComp.vue')
      },
      {
        path: 'courses/:id',
        name: 'courses.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/CourseUnitComp.vue')
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/BlogsComp.vue')
      },
      {
        path: 'draft',
        name: 'draft',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/BlogDraftComp.vue')
      },
      {
        path: 'blogs/:id',
        name: 'blogs.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Home/BlogUnitComp.vue')
      },
      {
        path: 'quiz',
        name: 'quiz',
        component: () => import(/* webpackChunkName: "about" */ '../components/Others/QuizComp.vue')
      },
      {
        path: 'forgot',
        name: 'forgot',
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
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/schedule/SchedulesComp.vue'),
      },
      {
        path: 'schedules/:id',
        name: 'admin.schedules.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/schedule/ScheduleModifyComp.vue'),
      },
      {
        path: 'courses',
        name: 'admin.courses',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/course/CoursesComp.vue'),
      },
      {
        path: 'courses/:id',
        name: 'admin.courses.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/course/CourseEditComp.vue'),
      },
      {
        path: 'lessons',
        name: 'admin.lessons',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/lesson/LessonsComp.vue'),
      },
      {
        path: 'lessons/:id',
        name: 'admin.lessons.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/lesson/LessonModifyComp.vue'),
      },
      {
        path: 'quizs',
        name: 'admin.quizs',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/quiz/QuizsComp.vue'),
      },
      {
        path: 'quizs/:id',
        name: 'admin.quizs.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/quiz/QuizModifyComp.vue'),
      },
      {
        path: 'questions',
        name: 'admin.questions',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/question/QuestionsComp.vue'),
      },
      {
        path: 'questions/:id',
        name: 'admin.questions.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/question/QuestionModifyComp.vue'),
      },
      {
        path: 'blogs',
        name: 'admin.blogs',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/blog/BlogsComp.vue'),
      },
      {
        path: 'blogs/:id',
        name: 'admin.blogs.id',
        component: () => import(/* webpackChunkName: "about" */ '../components/Admin/blog/BlogModifyComp.vue'),
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
        component: () => import(/* webpackChunkName: "about" */ '../components/User/profile/ProfileComp.vue'),
      },
      {
        path: 'schedules',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/schedule/SchedulesComp.vue'),
      },
      {
        path: 'schedules/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/schedule/ScheduleUnitComp.vue'),
      },
      {
        path: 'courses',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/course/CoursesComp.vue'),
      },
      {
        path: 'courses/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/course/CourseUnitComp.vue'),
      },
      {
        path: 'blogs',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/blog/BlogsComp.vue'),
      },
      {
        path: 'blogs/modify',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/blog/BlogModifyComp.vue'),
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
