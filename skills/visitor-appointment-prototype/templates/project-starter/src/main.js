import { createApp } from 'vue'
import App from './App.vue'
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
  DatetimePicker,
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

const app = createApp(App)

// 注册组件
const components = [
  Button, Field, CellGroup, Form, Popup, Picker,
  Checkbox, CheckboxGroup, RadioGroup, Radio,
  Search, Tag, Tabs, Tab, Step, Steps, Uploader,
  NoticeBar, Calendar, DatetimePicker, TimePicker,
  NumberKeyboard, Dialog, Empty, DropdownMenu, DropdownItem,
  NavBar, VanImage, Icon
]
components.forEach(c => app.use(c))

app.mount('#app')
