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
import approvisionnement from '../views/rapports/approvisionnement'
import achat from '../views/stocks/viewAchat'
import expedition from '../views/rapports/expedition'
import axes from '../views/axes'
import field from '../views/field'
import order from '../views/orders'
import traitement from '../views/traitement'
import addprix from '../views/addPrice'
import depense from '../views/tools/depense'
import document from '../views/tools/document'
import financement from '../views/tools/financement'
import prices from '../views/tools/fixingprice'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/addprix/:id',
    name:'Price',
    component:addprix
  },
  {
    path: '/fonctions',
    name: 'Fonctions',
    component: Fonctions
  },
  {
    path: '/financement',
    name: 'Financement',
    component: financement
  },
  {
    path: '/achat/:id',
    name: 'AchatId',
    component: achat
  },
  {
    path: '/depense',
    name: 'Depense',
    component: depense
  },
  {
    path: '/document',
    name: 'Document',
    component: document
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
    path: '/prices',
    name: 'Prices',
    component: prices
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
    path: '/arapport',
    name: 'Approvisionnement',
    component: approvisionnement
  },
  {
    path: '/erapport',
    name: 'Expedition',
    component: expedition
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
