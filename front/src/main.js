import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './tailwind.css'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts);
app.component('apexChart', VueApexCharts)

app.mount('#app')
