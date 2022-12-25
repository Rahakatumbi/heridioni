<template>
    <v-app>
        <subheader title="Stocks">
                <v-spacer></v-spacer>
                <h6>HERIDIONI SARL</h6>
        </subheader>
        
        <v-card tile>
            <v-row class="ml-0 mt-0 mr-0 mb-0">
                <v-col md="4" cols="12">
                    <panel :title="produit.id?'Modification du Produit':'Formulaire d\'Enregistrement'">
                        <v-card-text>
                            <v-row>
                                <v-col md="12" cols="12">
                                    <v-text-field v-model="produit.names"
                                    label="Nom du Produit"
                                    placeholder="Entrer le Nom du Produit"
                                    counter="50"
                                    dense
                                    outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col md="12" cols="12">
                                    <v-autocomplete
                                    v-model="produit.status"
                                    label="Statut"
                                    :items="status"
                                    item-value="text"
                                    item-text="text"
                                    placeholder="Choisir le Statut"
                                    counter="50"
                                    dense
                                    outlined
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn small @click="annuler" color="error">Annuler</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn small color="#2C130D" :loading="loading" class="white--text" @click="saveProduct">{{produit.id?'Modifier':'Enregister'}}</v-btn>
                        </v-card-actions>
                    </panel>
                </v-col>
                <v-col cols="12" md="8">
                    <panel title="Liste de Produits">
                        <v-data-table :items="items.slice().reverse()" dense :headers="headers" :search="search">
                            <template v-slot:body="{items}">
                                <tbody v-if="items.length">
                                    <tr v-for="(item,index) in items" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.names}}</td>
                                        <td>{{item.code }}</td>
                                        <td>
                                            <v-btn x-small @click="produit=item" color="#2C130D" class="white--text">Modifier</v-btn>
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
import productsServices from '../services/productsServices'
export default {
    components:{subheader,panel},
    data(){
        return{
            loading:false,
            items:[],
            headers:[{text:'N#'},{text:"Nom du Produit"},{text:"Code du Produit"},{text:'Actions'}],
            search:null,
            produit:{names:null,id:null,created_by:this.$store.state.user.id,status:null},
            status:[{text:'Actif',id:1},{text:'Desactiver',id:2}],
        }
    },
    methods:{
        async annuler(){
            this.produit={names:null,id:null}
            this.loading =false
        },
        async saveProduct(){
            this.loading=true
            try{
                const response = await productsServices.register(this.produit)
                if(response){
                    this.loading =false
                    if(this.produit.id==null){
                    this.items.push(response.data)
                    }
                    this.annuler()
                    this.$swal.fire({
                        icon: 'success',
                        title: `L'operation a reussit.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
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
            }
        }
    },
   async mounted(){
       this.items = (await productsServices.products()).data
    }
}
</script>