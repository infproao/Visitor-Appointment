import { createApp } from 'vue'
import { Calendar, Icon, Popup, Search, Uploader } from 'vant'
import 'vant/lib/index.css'
import './theme.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
;[Calendar, Icon, Popup, Search, Uploader].forEach(component => app.use(component))
app.use(router)
app.use(i18n)
app.mount('#app')
