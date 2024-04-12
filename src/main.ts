import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
})
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
