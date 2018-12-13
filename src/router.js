import VueRouter from 'vue-router'
import Notes from '@/components/Notes'
import LoneNote from '@/components/LoneNote'
import Register from '@/components/Register'
import Login from '@/components/Login'

export default new VueRouter({
  routes: [
    {
      path: '/notes',
      name: 'notes',
      component: Notes,
    },
    {
      path: '/notes/:id',
      name: 'lone-note',
      component: LoneNote
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
