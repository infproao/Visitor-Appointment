import { createApp } from 'vue'
import FigmaComponentGallery from './FigmaComponentGallery.vue'
import { Calendar, Icon, Popup, Search, Uploader } from 'vant'
import 'vant/lib/index.css'
import './theme.css'

const app = createApp(FigmaComponentGallery)
;[Calendar, Icon, Popup, Search, Uploader].forEach(component => app.use(component))
app.mount('#app')
