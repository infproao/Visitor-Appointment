import { createApp } from 'vue'
import App from './App.vue'
import TemplateGallery from './TemplateGallery.vue'
import ComponentGallery from './ComponentGallery.vue'
import FigmaComponentGallery from './FigmaComponentGallery.vue'
import './theme.css'

// 按需引入 Vant 组件（也可改为全量引入，见下方注释）
import {
  Button,
  Field,
  CellGroup,
  Form,
  Popup,
  Picker,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Search,
  Tag,
  Tabs,
  Tab,
  Step,
  Steps,
  Uploader,
  NoticeBar,
  Calendar,
  TimePicker,
  NumberKeyboard,
  Dialog,
  Empty,
  DropdownMenu,
  DropdownItem,
  NavBar,
  Image as VanImage,
  Icon
} from 'vant'
import 'vant/lib/index.css'

const app = createApp(window.location.hash === '#templates' ? TemplateGallery : window.location.hash === '#components' ? ComponentGallery : window.location.hash === '#figma-components' ? FigmaComponentGallery : App)

// 注册组件
const components = [
  Button, Field, CellGroup, Form, Popup, Picker,
  Checkbox, CheckboxGroup, RadioGroup, Radio,
  Search, Tag, Tabs, Tab, Step, Steps, Uploader,
  NoticeBar, Calendar, TimePicker,
  NumberKeyboard, Dialog, Empty, DropdownMenu, DropdownItem,
  NavBar, VanImage, Icon
]
components.forEach(c => app.use(c))

app.mount('#app')
