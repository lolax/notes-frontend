import VueRouter from 'vue-router'
import Notes from '@/components/Notes'
import LoneNote from '@/components/LoneNote'

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
    }
  ]
})
