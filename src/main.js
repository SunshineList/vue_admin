import { createApp } from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SvgIcon from '@/components/SvgIcon'// svg component

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)

app.component('SvgIcon', SvgIcon)
app.mount('#app')
