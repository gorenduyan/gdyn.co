import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Download from './views/Download.vue'
import NotFound from './views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/indir',
      name: 'download',
      component: Download
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
