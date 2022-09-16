import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Users from '../views/users.vue'
import Login from '../views/Login'
import Fonctions from '../views/fonctions'
import Central from '../views/central'
import produit from '../views/produit'
import Succursales from '../views/Succursales'
import supplier from '../views/supllier'
import client from '../views/clients'
import banque from '../views/banque'
import brancheStoke from '../views/stocks/brancheStoke'
import axes from '../views/axes'
import field from '../views/field'
import order from '../views/orders'
import traitement from '../views/traitement'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '/home',
    name: 'Home',
    component: Home
  },

  {
    path: '/fonctions',
    name: 'Fonctions',
    component: Fonctions
  },
  {
    path: '/field/:id',
    name: 'Field',
    component: field
  },
  {
    path: '/clients',
    name: 'Client',
    component: client
  },
  {
    path: '/order',
    name: 'Order',
    component: order
  },
  {
    path: '/traitement/:id',
    name: 'Traitement',
    component: traitement
  },
  {
    path: '/axes',
    name: 'Axes',
    component: axes
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: supplier
  },
  {
    path: '/produit',
    name: 'Produit',
    component: produit
  },
  {
    path: '/banque',
    name: 'Banque',
    component: banque
  },
  {
    path: '/central',
    name: 'Centrals',
    component: Central
  },
  {
    path: '/branches',
    name: 'Succursales',
    component: Succursales
  },
  {
    path: '/agents',
    name: 'Users',
    component: Users
  },
  {
    path:'/stock',
    component:brancheStoke,
    name:'Stok-b'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && store.state.user==null) next({ name: 'Login'})
  else next()
})
export default router
