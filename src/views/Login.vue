<template>
  <v-app>
  <v-layout column>
    <v-flex>
      <panel :title="img">
        <!-- <v-img src="@/assets/logo.png" width="180" height="30"></v-img> -->
      </panel>
    </v-flex>
  </v-layout>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="4" xs="12">
            <v-alert text :value="error" border="left" type="error" tile>{{msg}}</v-alert>
            <v-card>
                    <v-card-title class="white">
                        <div style="margin:auto; text-align:center;" >
                          <span class="text-uppercase">Login</span>
                          <!-- <span>Hyfro</span> -->
                            <!-- <v-img src="@/assets/img/logo.jpeg" width="180" height="30"></v-img> -->
                        </div>
                      </v-card-title>
                        <v-divider></v-divider>
                        <v-form @submit.prevent="signin" method="post"> 
                            <v-card-text class="text-center display-2 text--accent-3">
                                <v-text-field
                                    v-model="username"
                                    label="Email"
                                    type="email"
                                    color="#2C130D"
                                />

                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    color="#2C130D"
                                />
                            </v-card-text>
                            <div class="text-center mt-3">
                                <v-btn v-if="loading==false" rounded color="#2C130D accent-4" type="submit" @click="signin" dark>S'IDENTIFIER</v-btn>
                                <v-progress-circular
                                  v-if="loading"
                                  indeterminate
                                  color="#2C130D"
                                ></v-progress-circular>
                            </div>
                        </v-form>
                    <br>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import panel from '../components/global/model.vue';
import userSerives  from '../services/userServices'
export default {
  components: { panel },
  data: () => ({
    img: require('../assets/logo.jpg'),
    msg:null,
    error:false,
    loading:false,
    username:'',
    password:'',
    classe:''
  }),
  methods: {
      async signin(){
        this.loading =true
          try{
              const response = await userSerives.login({
                  username: this.username,
                  password: this.password
              })
              if(response.data.message){
                    this.loading =false
                    this.$swal.fire({
                        icon: 'error',
                        title: `${response.data.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
              }else{
                this.loading =false
                this.$store.dispatch('setToken',response.data.token)
                this.$store.dispatch('setUser',response.data.user)
                if(response.data.branche!==null){
                  this.$store.dispatch('setBranche',response.data.branche)
                }
                this.$router.push({
                name: 'Home'
              })
              }
          }
          catch(e){
              this.$swal.fire({
                position: 'top-end',
                        icon: 'error',
                        title: `${e.response.data.error}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.loading =false
          }
      }
  }
};
</script>
<style scoped>
</style>