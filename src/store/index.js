import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    user:null,
    token:null,
    isLogging:false,
    sheet:[],
    branche:null,
    traitement:[],
    client:null,
    orders:[],
    achat:null
  },
  mutations: {
    setToken(state,token){
      state.token = token
      if(token){
        state.isLogging = true
      }
      else{
        state.isLogging = false
      }
    },
    achatView(state,item){
      state.achat = item
    },
    setUser(state,User){
      state.user = User
    },
    UpdateSheet(state,token){
      state.sheet.push(token)
    },
    setOrder(state,token){
      state.orders.push(token)
    },
    ResetSheet(state){
      state.sheet = []
    },
    resetOrders(state){
      state.orders = []
    },
    setBranche(state,data){
      state.branche =data
    },
    setClientOrder(state,data){
      state.client = data
    },
    doOrder(state,order){
      state.traitement.push(order)
    },
    resetdoOrder(state){
      state.traitement=[]
    }
  },
  actions: {
    setToken({commit},token){
      commit('setToken',token)
    },
    setUser({commit},user){
      commit('setUser',user)
    },
    setFeuille({commit},data){
      commit('UpdateSheet',data)
    },
    resetOrders({commit}){
      commit('resetOrders')
    },
    ResetSheet({commit}){
      commit('ResetSheet')
    },
    resetdoOrder({commit}){
      commit('resetdoOrder')
    },
    setBranche({commit},data){
      commit('setBranche',data)
    },
    setClientOrder({commit},data){
      commit('setClientOrder',data)
    },
    setOrder({commit},order){
      commit('setOrder',order)
    },
    doOrder({commit},order){
      commit('doOrder',order)
    },
    achatView({commit},item){
      commit('achatView',item)
    }
  },
  modules: {
  }
})
