import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SuccessPage from './pages/SuccessPage.vue'
import AppointmentFormPage from './pages/AppointmentFormPage.vue'
import AppointmentDetailPage from './pages/AppointmentDetailPage.vue'
import AppointmentRecordPage from './pages/AppointmentRecordPage.vue'
import SecurityDetailPage from './pages/SecurityDetailPage.vue'
import ComponentGallery from './ComponentGallery.vue'
import SpecialPageView from './pages/SpecialPageView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/components' },
    { path: '/home', name: 'home', component: HomePage },
    { path: '/appointment/success', name: 'appointment-success', component: SuccessPage },
    { path: '/appointment/share', name: 'appointment-share', component: SpecialPageView, props: { kind: 'share-success' } },
    { path: '/appointment/new', name: 'appointment-form', component: AppointmentFormPage },
    { path: '/appointment/detail', name: 'appointment-detail', component: AppointmentDetailPage },
    { path: '/appointment/records', name: 'appointment-records', component: AppointmentRecordPage },
    { path: '/pass', name: 'pass', component: SpecialPageView, props: { kind: 'pass' } },
    { path: '/pass/empty', name: 'pass-empty', component: SpecialPageView, props: { kind: 'empty-pass' } },
    { path: '/security/entry', name: 'security-entry', component: SpecialPageView, props: { kind: 'security-entry' } },
    { path: '/security/detail', name: 'security-detail', component: SecurityDetailPage },
    { path: '/companion', name: 'companion', component: SpecialPageView, props: { kind: 'companions' } },
    { path: '/components', name: 'components', component: ComponentGallery }
  ]
})
