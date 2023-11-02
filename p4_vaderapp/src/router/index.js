import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/~43861/vaderapp/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Weather App'
      }
    },
    {
      path: '/fav',
      name: 'fav',
      component: () => import('../views/FavView.vue'),
      meta: {
        title: 'Favorite'
      }
    } ,  
    {
      path: '/:catchAll(.*)',
      component: HomeView,
    },
  ]
})
router.beforeEach((to) => {
  document.title = to.meta.title || 'Weather App'
})

export default router
