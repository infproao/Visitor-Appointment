import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SuccessPage from './pages/SuccessPage.vue'
import AppointmentFormPage from './pages/AppointmentFormPage.vue'
import AppointmentDetailPage from './pages/AppointmentDetailPage.vue'
import ComponentGallery from './ComponentGallery.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/appointment/success', name: 'appointment-success', component: SuccessPage },
    { path: '/appointment/new', name: 'appointment-form', component: AppointmentFormPage },
    { path: '/appointment/detail', name: 'appointment-detail', component: AppointmentDetailPage },
    { path: '/components', name: 'components', component: ComponentGallery }
  ]
})
