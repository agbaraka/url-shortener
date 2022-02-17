import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    { path: '/', component: () => import('./pages/home.vue') },
    { path: '/link/not_found', name:'404', component: () => import('./pages/not_found.vue') },
    { path: '/:code/stats', name:'stats', component: () => import('./pages/stats.vue') },
    { path: '/:catchAll(.*)', component: () => import('./pages/not_found.vue') },
]

export default  createRouter({
    history: createWebHistory(),
    routes
})