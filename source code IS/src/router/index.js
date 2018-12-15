import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/Views/NotFound'
import Home from '@/components/Views/Home'
import Login from '@/components/Views/Authentication/login'
import Register from '@/components/Views/Authentication/register'
import ViewTeacher from '@/components/Views/Lecturer/viewTeacher'
import viewTeachers from '@/components/Views/Authentication/viewTeachers'
import viewGrades from '@/components/Views/Grades/viewGrades'
import createGrades from '@/components/Views/Grades/createGrades'
import updateGrades from '@/components/Views/Grades/updateGrades'
import viewMyGrades from '@/components/Views/Grades/viewMyGrades'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/view/Teacher',
      name: 'viewTeacher',
      component: ViewTeacher
    },
    {
      path: '/grades/view-all',
      name: 'viewGrades',
      component: viewGrades
    },
    {
      path: '/grades/create',
      name: 'createGrades',
      component: createGrades
    },
    {
      path: '/grades/updateGrades',
      name: 'updateGrades',
      component: updateGrades
    },
    {
      path: '/grades/viewMyGrades',
      name: 'viewMyGrades',
      component: viewMyGrades
    },
    //this NotFound wildcard for non-matched routes must be the last entry
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
