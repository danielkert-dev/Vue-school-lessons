import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '/daniel',
      name: 'daniel',
      component: () => import('../views/DanielView.vue'),
      meta: {
        title: 'Daniel'
      }
    },
    {
      path: '/user/:name',
      name: 'User',
      component: () => import('../views/UserView.vue'),
      props: true

    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NoShow.vue'),
    },
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'Home'
})

export default router
