<template>
  <v-app>
    <div v-if="$store.state.isLogging">
      <navbar/>
    </div>
    
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <div v-if="$store.state.isLogging">
      <Footer/>
    </div>
  </v-app>
</template>

<script>
import Footer from '@/components/footer.vue'
import Navbar from '@/components/navbar.vue'
export default {
  components: { Navbar,Footer },
  name: 'App',

}
</script>