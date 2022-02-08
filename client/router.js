import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m)

const routes = [
  { path: '/', name: 'welcome', component: page('welcome.vue') },
  { path: '/home', name: 'home', component: page('index.vue') },
  { path: '/login', name: 'login', component: page('login.vue') },
  { path: '/register', name: 'register', component: page('register.vue') },
]

export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history',
  })
}
