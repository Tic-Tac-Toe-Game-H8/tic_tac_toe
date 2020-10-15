import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/home';
import Lobby from './views/lobby';
import Game from './components/game';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
  {
    path: '/:id',
    name: 'Game',
    component: Game,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
