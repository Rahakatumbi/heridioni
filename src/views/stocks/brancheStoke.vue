<template>
    <v-app>
        <subheader title="Stocks">
                <v-spacer></v-spacer>
                <h6>HERIDIONI SARL</h6>
        </subheader>
        
        <v-card tile>
            <v-row class="ml-0 mt-0 mr-0 mb-0">
                <v-col md="4" cols="12">
                    <panel title="Enregistrement du Stok">
                        <v-card-text>
                            <v-row>
                                <v-col md="12" cols="12">
                                    <v-text-field label="Recherche" 
                                    placeholder="Taper le code du Candidat(e) ou Le Nom" 
                                    append-icon="mdi-magnify" 
                                    v-model="search" 
                                    dense >
                                    </v-text-field>
                                </v-col>
                                <v-flex v-if="supplier">
                                    <v-row>
                                        <v-col md="12" cols="12">
                                            <v-autocomplete label="Nom du Produit" 
                                            placeholder="vueillez Choisir le nom du produit" 
                                            v-model="produit.product_id"
                                            :items="produits"
                                            @change="productId(produit.product_id)"
                                            item-value="id"
                                            item-color="#2C130D"
                                            item-text="names"
                                            counter="50"
                                            dense
                                            outlined
                                            v-if="!loadingsearch"
                                            ></v-autocomplete>
                                            <span v-else>
                                                <spnipperpoint align="center"></spnipperpoint>
                                            </span>
                                        </v-col>
                                        <v-col md="6" cols="6">
                                            <v-text-field v-model="produit.quantity"
                                            label="Nombre de Kilogramme"
                                            placeholder="Entrer la Quantite des Kg"
                                            counter="10"
                                            dense
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col md="6" v-if="prix" cols="6">
                                            <v-text-field
                                            v-model.number="prix.price"
                                            label="Prix Unitaire."
                                            placeholder="Entrer le prix Unitaire"
                                            counter="10"
                                            dense
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col md="12" cols="12">
                                            <v-select v-model="produit.quality"
                                            label="Qualite"
                                            placeholder="Entrer le Kg"
                                            counter="10"
                                            :items="qualites"
                                            item-text="text"
                                            item-value="text"
                                            dense
                                            outlined
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-checkbox v-model="produit.check" value="1" label="Possede Un champ"></v-checkbox>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-checkbox  value="2" v-model="produit.check" label="Ne Possede pas un Champ"></v-checkbox>
                                        </v-col>
                                        <v-col md="12" cols="12" v-if="produit.check==1">
                                            <v-autocomplete v-model="produit.champ_id"
                                            label="Champs"
                                            placeholder="Entrer le prix Unitaire"
                                            counter="10"
                                            :items="champs"
                                            item-value="id"
                                            item-text="address"
                                            dense
                                            outlined
                                            ></v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-flex>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small color="error">Annuler</v-btn>
                            <v-btn small color="#2C130D" @click="feuille" class="white--text">Ajouter A la Feuille</v-btn>
                        </v-card-actions>
                    </panel>
                </v-col>
                <v-col cols="12" md="8">
                    <panel :title="`Feuille d'Approvisionnement`">
                        <v-flex class="mr-2 ml-2 mt-1">
                            <v-row>
                                <v-col cols="12" md="6">
                            <div class="mt-2 ml-2 mb-4">
                                <v-layout wrap row>
                                <v-flex sm6 xs12 md6 lg12>
                                    <v-card class="ma-1">
                                        <div class="overline mt-2">
                                            <v-icon dark small color="#2C130D" class="ml-1 rounded ">mdi-bank-outline</v-icon>
                                            <strong><span class="ml-2 " style="size: 100px;">Balance Actuel</span></strong> <br>
                                            <div class="ml-6">
                                            <span>Montant du Financement </span>
                                            <strong class="info--text">{{finbalance}} $</strong>
                                            <br> 
                                            <span>Depasse </span><strong class="warning--text">{{total}} $</strong>
                                            <br>
                                            <v-divider></v-divider>
                                            </div>
                                            <div class="text-left ml-6">
                                            <span>Reste</span><strong class="ml-9 primary--text">{{finbalance - total}} $</strong>
                                            <span v-if="(finbalance - total) <0"><v-icon color="red" small>{{'mdi-alert'}}</v-icon></span>
                                            <span v-if="(finbalance - total) >= 0"><v-icon color="info" small>{{'mdi-check-all'}}</v-icon></span>
                                            </div>  
                                        </div>  
                                    </v-card>
                                </v-flex>
                                </v-layout>
                            </div>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <h6>Fournisseur</h6>
                                    <div v-if="supplier">
                                    <small>
                                        Noms: <strong>{{supplier.names}}</strong> <br>
                                        Code: <strong>{{supplier.code}}</strong><br>
                                        Addresse: <strong>{{supplier.address}}</strong>
                                        Telephone: <strong>{{supplier.telephone}}</strong>
                                    </small>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex m-r2 ml-2 mt-2>
                            <v-simple-table dense id="table">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>#</th>
                                            <th>Item</th>
                                            <td>Qualite</td>
                                            <th>Qte</th>
                                            <th>Montant</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="items.length">
                                        <tr v-for="(item,index) in items" :key="index">
                                            <td><v-icon color="error" @click="item.splice(index,1)" small>mdi-beaker-remove</v-icon></td>
                                            <td>{{index+1}}</td>
                                            <td>{{item.names}}</td>
                                            <td>{{item.quality}}</td>
                                            <td>{{item.quantity}} Kg(s)</td>
                                            <td>${{item.montant}}</td>
                                            <td>${{(item.montant * item.quantity)}}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td colspan="3">Total</td>
                                            <td>{{itemKgs}} Kg(s)</td>
                                            <td>${{unitprice}}</td>
                                            <td>${{total}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="error" small @click="annuler">Annuler Tout</v-btn>
                                                    <v-btn color="#2C130D" class="white--text" v-if="!loading" @click="saveStock" small>Enregister</v-btn>
                                                    <v-btn color="warning" v-else small>
                                                        <Spnipperpoint align="center"></Spnipperpoint>
                                                    </v-btn>
                                                </v-card-actions>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6">Fueille Vide</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-flex>
                    </panel>
                </v-col>
            </v-row>
            <v-card-text>
                <v-flex>
                    <panel title="Liste de Stocks">
                        <v-data-table :items="privious" dense :headers="headers" :search="saerch">
                            <template v-slot:body="{items}">
                                <tbody v-if="items.length">
                                    <tr v-for="(item,index) in items" :key="index">
                                        <td>{{++index}}</td>
                                        <td>{{item.code}}</td>
                                        <td>{{item.fermier}}</td>
                                        <td>{{item.montant}} USD</td>
                                        <td>{{item.created_at}}</td>
                                        <td>{{item.branche}}</td>
                                        <td>
                                            <v-btn @click="$router.push(`/achat/${item.id}`),$store.dispatch('achatView',item)" x-small color="green" class="white--text">Afficher <v-icon small>mdi-eye</v-icon> </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td class="6" style="text-align: center">Pas de donnees</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-data-table>
                    </panel>
                </v-flex>
            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
import subheader from '../../components/global/subheader.vue'
import panel from '../../components/global/panel.vue'
import productsServices from '../../services/productsServices'
import supllierServices from '../../services/supllierServices'
import stockServices from '../../services/stockServices'
import _ from 'lodash'
import Spnipperpoint from '../../components/global/spnipperpoint.vue'
import financementServices from '../../services/financementServices'
import PriceServices from '../../services/PriceServices'
import champServices from '../../services/champServices'
export default {
    components:{ subheader, panel, Spnipperpoint },
    data(){
        return{
            balance: this.finbalance-this.total,
            check:null,
            qualites:[{text:'Premiere Qualite',value:1},{text:'Deuxieme Qualite',value:2}],
            headers:[{text:'N#'},{text:"Code"},{text:'Fermier'},{text:'Montant'},{text:'Date'},{text:'Depot'},{text:'Actions'}],
            saerch:null,
            search:null,
            produit:{product_id:null,montant:null,champ_id:null,price_id:null,
            quality:null,names:null,check:null,quantity:null},
            produits:[],
            disabled:false,
            feuilles:[],
            privious:[],
            supplier:null,
            champs:[],
            prix:null,
            loadingsearch:false,
            loading:false,
            balances:[]
        }
    },
    computed:{
        finbalance(){
            return this.balances.reduce((acc,item)=>acc + item.montant - item.used_amount,0)
        },
       items(){
            return this.$store.state.sheet
        },
        total(){
            return this.items.reduce((acc,item)=>acc + item.montant * item.quantity,0)
        },
        itemKgs(){
           return this.items.reduce((acc,item)=>acc + parseFloat(item.quantity),0) 
        },
        unitprice(){
            return this.items.reduce((acc,item)=>acc + parseFloat(item.montant),0)
        },
    },
    methods:{
        async remove(index){
            this.items.slice(index,1)
        },
        async checked(){
            this.check =1
        },
        async annuler(){
            this.$store.dispatch("ResetSheet")
            this.produit={produit_id:null,kgs:null,names:null,quantite:null,price:null,supplier_id:null}
            this.prix = null
            this.search =null
        },
        async productId(item){
            this.prix= (await PriceServices.last_price(item)).data
            this.champs = (await champServices.supplierId(this.supplier.id)).data
            const data = this.produits.filter(product=>{
                return product.id == item 
            })
             data.forEach(element => {
                return this.produit.names =element.names
             });
        },
        async feuille(){
            var chapId = this.produit.champ_id
            if (chapId==null){
                chapId = 0
            }
            console.log(chapId)
            const data ={
                product_id:this.produit.product_id,
                champ_id:chapId,
                quality:this.produit.quality,
                names:this.produit.names,
                price_id:this.prix.id,
                quantity:this.produit.quantity,
                montant:this.prix.price,
            }
            this.$store.dispatch("setFeuille",data)
            this.produit={product_id:null,quality:null,quantity:null,price_id:null,prix:null}
        },
        async saveStock(){
            this.loading =true
            const financement = this.finbalance - this.total
            const response = await stockServices.saveStock({
                created_by:this.$store.state.user.id,
                fermier_id:this.supplier.id,
                branche_id:this.$store.state.branche.id,
                montant:this.total.toString(),
                financement:financement.toString(),
                data:this.items
            })
            if(response){
                this.loading =false
                this.annuler()
                this.$swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `L'Operation a reussit.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        async searchFermer(value){
            if(value!==null){
                this.loadingsearch =true
                const response = await supllierServices.saerch({
                    code:value,
                    name:value
                })
                this.supplier = response.data
                this.loadingsearch =false
            }
        }
    },
   async mounted(){
       this.produits = (await productsServices.products()).data
       this.privious = (await stockServices.stock()).data
       this.balances = (await financementServices.financement(this.$store.state.branche.id)).data
    },
    watch:{
        search: _.debounce(async function (value) {
           this.searchFermer(value)
        },700)
        
    }

}
</script>