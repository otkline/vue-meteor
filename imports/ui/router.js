import { createRouter, createWebHistory } from 'vue-router'
import { Meteor } from 'meteor/meteor'

const Home = () => import('../ui/pages/Home.vue')
const Dashboard = () => import('../ui/pages/Dashboard.vue')
const LoginForm = () => import('../ui/components/LoginForm.vue')
const SignupForm = () => import('../ui/components/SignupForm.vue')

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/login', component: LoginForm },
    { path: '/signup', component: SignupForm },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!Meteor.userId()
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

export default router
