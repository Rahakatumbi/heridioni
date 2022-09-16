<template>
    <v-app>
        <subheader title="Agents">
            <v-spacer></v-spacer>
            <h6>Est. Heridioni</h6>
        </subheader>
         
        <v-card tile>
            <v-row class="ml-0 mt-0 mr-0 mb-0">
                    <v-col cols="12" md="4">
                        <panel title="Formulaire">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="user.names" dense outlined label="Noms Complets de l'Agent"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select
                                         v-model="user.role"
                                         item-text="text"
                                         item-value="id"
                                         :items="fonction" 
                                         dense 
                                         outlined 
                                         label="Fonction de l'Agent">
                                         </v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="user.status"
                                         item-text="text"
                                         item-value="id"
                                         :items="status" 
                                         dense outlined label="Statut de l'Agent">
                                         </v-select>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="user.email" dense outlined label="Email addresse de l'Agent"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="user.phone" dense outlined label="Numero de telephone de l'Agent"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="user.gender"
                                         item-text="text"
                                         item-value="id"
                                         :items="gender"  
                                        dense outlined label="Sexe de l'Agent"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="user.address" dense outlined label="Addresse Physique de l'Agent"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn color="error" small @click="annuler">Annuler</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="#2C130D" class="white--text" small @click="saveUser">Enregistrer</v-btn>
                            </v-card-actions>
                        </panel>
                    </v-col>
                    <v-col cols="12" md="8">
                        <panel title="Liste des Agents">
                            <v-card-text>
                                <v-text-field v-model="search" dense label="Recherche..."></v-text-field>
                                <v-data-table :items="users.slice().reverse()" dense :headers="headers" :search="search">
                                    <template v-slot:body="{items}">
                                        <tbody v-if="items.length">
                                            <tr v-for="(item,index) in items" :key="index">
                                                <td>{{++index}}</td>
                                                <td>{{item.names}}</td>
                                                <td>{{item.email}}</td>
                                                <td>{{item.code}}</td>
                                                <td>{{item.status}}</td>
                                                <td>{{item.address}}</td>
                                                <td>{{item.phone}}</td>
                                                <td>
                                                    <v-btn x-small color="#2C130D" class="white--text" @click="user=item">Modifier</v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </panel>
                    </v-col>
                </v-row>
        </v-card>
    </v-app>
</template>
<script>
import panel from '../components/global/panel.vue'
import subheader  from '../components/global/subheader.vue'
import userServices from '../services/userServices'
export default {
    components:{
        panel,
        subheader
    },
    data(){
        return{
            loading:false,
            search:null,
            alert:false,
            msg:null,
            type:null,
            user:{id:null,names:null,phone:null,address:null,email:null,status:null,role:null,gender:null},
            gender:[{text:'Homme',id:1},{text:'Femme',id:2}],
            status:[{text:'Operationnel',id:1},{text:'Desactiver',id:2}],
            fonction:[{text:'Admin',id:1},{text:'Chef de Depot',id:2},{text:'Gerant',id:3},{text:'Agronome',id:4},{text:'Financier',id:5},],
            headers:[{text:"N#"},{text:"Noms"},{text:"Email"},{text:"Fonction"},{text:"Etat"},{text:"Addresse"},{text:"Phone"},{text:""}],
            users:[],
        }
    },
    methods:{
        async annuler(){
            this.user={id:null,names:null,phonexx:null,address:null,email:null,status:null,role:null,gender:null}
            this.loading =false
        },
        async saveUser(){
            this.loading =true
            try{
                const response = await userServices.register(this.user)
                if(response){
                    this.annuler()
                    this.$swal.fire({
                        icon: 'success',
                        title: `L'operation a reussit.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    if(this.user.id==null){this.users.push(response.data)}
                }
            }
            catch(e){
                this.$swal.fire({
                        icon: 'error',
                        title: `L'operation a echouer. Reessaye!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        },
    },
    async mounted(){
        this.loading =true
        this.users = (await userServices.display()).data
        this.loading = true
    }
}
</script>