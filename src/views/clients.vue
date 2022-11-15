<template>
    <v-app>
        <subheader title="Stocks">
                <v-spacer></v-spacer>
                <h6>HERIDIONI SARL</h6>
        </subheader>
        <v-card tile>
        <v-row class="ml-0 mt-0 mr-0 mb-0">
            <v-col md="4" cols="12">
                <panel :title="client.id?'Modification du Client':'Formulaire d\'Enregistrement'">
                    <v-card-text>
                        <v-row>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="client.names"
                                label="Nom du Client"
                                placeholder="Entrer le Nom du Client"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="client.address"
                                label="Addresse du Client"
                                placeholder="Entrer l'Addresse du Client"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="client.phone"
                                label="Telephone du Client"
                                placeholder="Entrer le Telephone du Client"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="client.email"
                                label="Mail Addresse du Client"
                                placeholder="Entrer le Mail Addresse du Client"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn small @click="annuler" color="error">Annuler</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn small color="#2C130D" :loading="loading" class="white--text" @click="saveSupplier">{{client.id?'Modifier':'Enregister'}}</v-btn>
                    </v-card-actions>
                </panel>
            </v-col>
            <v-col cols="12" md="8">
                <panel title="Liste de Clients">
                    <v-data-table :items="items.slice().reverse()" dense :headers="headers" :search="search">
                        <template v-slot:body="{items}">
                            <tbody v-if="items.length">
                                <tr v-for="(item,index) in items" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.names}}</td>
                                    <td>{{item.email}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{item.phone}}</td>
                                    <td>
                                        <v-btn x-small @click="client=item" color="#2C130D" class="white--text">Modifier</v-btn>
                                        <v-btn x-small color="error" class="white--text">Supprimer</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </panel>
            </v-col>
        </v-row>
        </v-card>
    </v-app>
</template>
<script>
import subheader from '../components/global/subheader.vue'
import panel from '../components/global/panel.vue'
import clientServices from '../services/clientsServices'
export default {
    components:{subheader,panel},
    data(){
        return{
            loading:false,
            items:[],
            headers:[{text:'N#'},{text:"Nom du Client"},{text:'Mail'},{text:'Addresse'},{text:'Telephone'},{text:'Actions'}],
            search:null,
            client:{names:null,phone:null,email:null,address:null,id:null,creator:1,type:null,country:null},
        }
    },
    methods:{
        async annuler(){
            this.client={names:null,phone:null,email:null,address:null,id:null,creator:1,country:null},
            this.loading =false
        },
        async saveSupplier(){
            this.loading=true
            try{
                const response = await clientServices.register({
                    id:parseInt(this.client.id),
                    names:this.client.names,
                    phone:parseInt(this.client.phone),
                    address:this.client.address,
                    email:this.client.email,
                    country:this.client.country
                })
                if(response){
                    this.loading =false
                    if(this.client.id==null){
                    this.items.push(response.data)
                    }
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `L'Operation a reussit. Code du Client: ${response.data.code}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.annuler()
                }
            }
            catch(e){
                console.log(e.data)
            }
        }
    },
   async mounted(){
       this.items = (await clientServices.client()).data
    }
}
</script>