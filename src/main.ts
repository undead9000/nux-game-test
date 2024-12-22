import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from '@/stores'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
useStore().init()
