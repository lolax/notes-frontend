import VueRouter from 'vue-router'
import New from './components/New'
import Notes from './components/Notes'
import LoneNote from './components/LoneNote'
import Enter from './components/Enter'

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
      path: '/new',
      name: 'new',
      component: New,
    },
    {
      path: '/',
      name: 'enter',
      component: Enter
    }
  ]
})
