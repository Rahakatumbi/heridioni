<template>
    <v-app>
        <subheader title="Stocks">
                <v-spacer></v-spacer>
                <h6>HERIDIONI SARL</h6>
        </subheader>
        <v-card tile>
        <v-row class="ml-0 mt-0 mr-0 mb-0">
            <v-col md="4" cols="12">
                <panel :title="banque.id?'Modification du Banque':'Formulaire d\'Enregistrement'">
                    <v-card-text>
                        <v-row>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="banque.names"
                                label="Nom de la Banque"
                                placeholder="Entrer le Nom du Banque"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="banque.compte"
                                label="Numero de Compte"
                                placeholder="Entrer le Numero de Compte"
                                counter="23"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="banque.phone"
                                label="Telephone du Banque"
                                placeholder="Entrer le Telephone du Banque"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="banque.address"
                                label="Addresse de la Banque"
                                placeholder="Entrer l'Addresse de la banque"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="banque.email"
                                label="Mail de la Banque"
                                placeholder="Entrer le Mail de la Banque"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="banque.identification"
                                label="Id Nat. de la Banque"
                                placeholder="Entrer l'Id Nationale de la Banque"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="banque.rccm"
                                label="Numero RCCM de la Banque"
                                placeholder="Entrer le Numero RCCM  de la Banque"
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
                        <v-btn small color="#2C130D" :loading="loading" class="white--text" @click="saveSupplier">{{banque.id?'Modifier':'Enregister'}}</v-btn>
                    </v-card-actions>
                </panel>
            </v-col>
            <v-col cols="12" md="8">
                <panel title="Liste de Banques">
                    <v-data-table :items="items.slice().reverse()" dense :headers="headers" :search="search">
                        <template v-slot:body="{items}">
                            <tbody v-if="items.length">
                                <tr v-for="(item,index) in items" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.names}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{item.phone}}</td>
                                    <td>
                                        <v-btn x-small @click="banque=item" color="#2C130D" class="white--text">Modifier</v-btn>
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
import banqueServices from '../services/banqueServices'
export default {
    components:{subheader,panel},
    data(){
        return{
            loading:false,
            items:[],
            headers:[{text:'N#'},{text:"Nom du Banque"},{text:'Addresse'},{text:'Telephone'},{text:'Actions'}],
            search:null,
            banque:{names:null,email:null,compte:null,phone:null,address:null,id:null,creator:1,type:null,identification:null,rccm:null},
        }
    },
    methods:{
        async annuler(){
            this.banque={names:null,email:null,compte:null,phone:null,address:null,id:null,creator:1,type:null,identification:null,rccm:null}
            this.loading =false
        },
        async saveSupplier(){
            this.loading=true
            try{
                const response = await banqueServices.register({
                    id:parseInt(this.banque.id),
                    names:this.banque.names,
                    phone:parseInt(this.banque.phone),
                    address:this.banque.address,
                    compte:this.banque.compte,
                    email:this.banque.email,
                    creator:this.banque.creator,
                    rccm:this.banque.rccm,
                    identification:this.banque.identification,
                    created_by:this.$store.state.user.id
                })
                if(response){
                    this.loading =false
                    if(this.banque.id==null){
                    this.items.push(response.data)
                    }
                    this.annuler()
                    this.$swal.fire({
                        icon: 'success',
                        title: `L'operation a reussit avec successs.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            catch(e){
                console.log(e.data)
                    this.$swal.fire({
                        icon: 'error',
                        title: `${e.response.data.error}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        }
    },
   async mounted(){
       this.items = (await banqueServices.banque()).data
    }
}
</script>