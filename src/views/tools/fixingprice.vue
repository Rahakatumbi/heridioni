<template>
    <v-app>
        <div class="elevation-2">
            <v-row>
                <v-col cols="12" md="4">
                    <panel :title="depense.id?'Modification':'Formulaire'" class="elevation-1 mt-2 ml-2 mr-1">
                        <div class="mt-2 ml-2 mr-2 ">
                            <v-text-field label="Prix" v-model="depense.price" outlined dense placeholder="Tapez le prix"></v-text-field>
                            <v-autocomplete label="Produit" :items="products" item-text="names" item-value="id" v-model.number="depense.product_id" dense outlined placeholder="Choisir le produit"></v-autocomplete>
                            <v-select label="Status" :items="status" item-text="text" item-value="value" v-model="depense.status" dense outlined placeholder="status du depense"></v-select>
                            <v-textarea label="Description" v-model="depense.description" outlined dense placeholder="Description du depense"></v-textarea>
                        </div>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="annuler" small>Annuler</v-btn>
                            <v-btn color="#2C130D" small @click="saveFinancement" class="white--text" v-if="!formloading">{{depense.id?'Modifier':'Enregister'}}</v-btn>
                            <v-btn v-else small>
                                <Spnipperpoint align="center"></Spnipperpoint>
                            </v-btn>
                        </v-card-actions>
                    </panel>
                </v-col>
                <v-col cols="12" md="8">
                    <panel title="Liste des Prix" class="elevation-1 mt-2 mr-1">
                        <v-text-field class="ml-3 mt-6 mr-3" v-model="search" dense label="Recherche" placeholder="Taper..."></v-text-field>
                        <v-data-table dense :headers="headers" :items="depenses" :search="search">
                            <template v-slot:body="{items}">
                                <tbody v-if="items.length">
                                    <tr v-for="(item,index) in items.slice().reverse()" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.product}}</td>
                                        <td>{{item.price}}</td>
                                        <td>{{ item.code }}</td>
                                        <td>
                                            <v-chip small class="info white--text" v-if="item.status===`Actif`">Actif</v-chip>
                                            <v-chip small class="warning white--text" v-if="item.status==='Desactif'">Desactif</v-chip>
                                        </td>
                                        <td>
                                            <v-btn x-small color="#2C130D" class="white--text" @click="depense=item">Modifier
                                                <v-icon x-small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr v-if="!loading">
                                        <td colspan="3" class="text-center" style="text-align: center;">Pas des depenses Disponible</td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="3"><snipperload align="center"></snipperload></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-data-table>
                    </panel>
                </v-col>
            </v-row>
        </div>
    </v-app>
</template>
<script>
import panelVue from '../../components/global/panel.vue'
import snipperload from '../../components/global/snipperload.vue'
import Spnipperpoint from '../../components/global/spnipperpoint.vue'
import PriceServices from '../../services/PriceServices'
import productsServices from '../../services/productsServices'
export default{
    components:{ "panel": panelVue,  Spnipperpoint,snipperload },
    data(){
        return{
            finance:{},
            dialog:false,
            depense:{
                price:null,
                product_id:null,
                status:null,
                created_by: this.$store.state.user.id
            },
            status:[{text:'Actif',value:'Actif'},{text:'Desactif',value:'Desactif'}],
            depenses:[],
            search:null,
            headers:[{text:'N#'},{text:'Produit',value:'product'},{text:'Prix'},{text:'Code',value:'code'},{text:'Statut',value:'status'},{text:''}],
            loading:false,
            formloading:false,
            products:[],
        }
    },
    methods:{
        async annuler(){
            this.depense={
                id:null,
                price:null,
                status:null,
            }
        },
        async saveFinancement(){
            this.formloading = true
            try{
                const res = await PriceServices.register({
                    price:this.depense.price,
                    created_by:this.depense.created_by,
                    status:this.depense.status,
                    product_id:this.depense.product_id
                })
                if(res.status == 200){
                    this.depenses.push(res.data)
                    this.annuler()
                    this.formloading = false
                    this.$swal({
                        icon: 'success',
                        title: `L'operation a reussit avec successs.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else{
                    this.formloading = false
                    this.$swal({
                        icon: 'error',
                        title: `Il y'a une erreur.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }catch(e){
                this.formloading = false
                this.$swal({
                    icon: 'error',
                    title: `${e.data.error}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    },
    async mounted(){
        this.loading =true
        this.depenses = (await PriceServices.all_price()).data
        this.products = (await productsServices.products()).data
        this.loading =false
    }
}
</script>