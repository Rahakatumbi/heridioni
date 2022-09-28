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
                                            v-model="produit.produit_id"
                                            :items="produits"
                                            @change="product(produit.produit_id)"
                                            item-value="id"
                                            item-color="green"
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
                                            <v-text-field v-model.number="produit.kgs"
                                            label="Nombre de Kilogramme"
                                            placeholder="Entrer la Quantite des Kg"
                                            counter="10"
                                            dense
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col md="6" cols="6">
                                            <v-text-field v-model.number="produit.price"
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
                                            placeholder="Entrer le prix Unitaire"
                                            counter="10"
                                            :items="qualites"
                                            item-text="text"
                                            item-value="value"
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
                                            <v-autocomplete v-model="produit.field_id"
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
                            <v-btn small color="error">Annuler</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn small color="#2C130D" @click="feuille" class="white--text">Ajouter A la Feuille</v-btn>
                        </v-card-actions>
                    </panel>
                </v-col>
                <v-col cols="12" md="8">
                    <panel :title="`Feuille d'Approvisionnement`">
                        <v-flex class="mr-2 ml-2 mt-1">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-img src="../../assets/logo.jpg" height="70" width="100"></v-img>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <h6>Fournisseur</h6>
                                    <div v-if="supplier">
                                    <small>
                                        Noms: <strong>{{supplier.supplier.names}}</strong> <br>
                                        Code: <strong>{{supplier.supplier.code}}</strong><br>
                                        Addresse: <strong>{{supplier.supplier.address}}</strong>
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
                                            <td><a class="cut">x</a><span>{{index+1}}</span></td>
                                            <span v-if="item.produit.legnth">
                                                <span v-for="product in item.produit " :key="product.id">
                                                    <td>{{product.names}}</td>
                                                </span>
                                            </span>
                                            <span v-else>
                                                <td>{{item.produit_id==1?'Cacao':item.produit_id==2?'Caffee':'Caoutchout'}}</td>
                                            </span>
                                            <td>{{item.quality==1?'1e':'2e'}}</td>
                                            <td>{{item.kgs}} Kg(s)</td>
                                            <td>${{item.price}}</td>
                                            <td>${{(item.price * item.kgs)}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">Total</td>
                                            <td>{{itemKgs}} Kg(s)</td>
                                            <td>${{unitprice}}</td>
                                            <td>${{total}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6">
                                                <v-card-actions>
                                                    <v-btn color="error" small @click="annuler">Annuler Tout</v-btn>
                                                    <v-spacer></v-spacer>
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
                                        <td>{{item.id}}</td>
                                        <td>00{{item.id}}</td>
                                        <td>{{item.supplier_id}}</td>
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
export default {
    components:{ subheader, panel, Spnipperpoint },
    data(){
        return{
            check:null,
            qualites:[{text:'Premiere Qualite',value:1},{text:'Deuxieme Qualite',value:2}],
            headers:[{text:'N#'},{text:'Fermier'},{text:'Code'},{text:'Date'},{text:'Enregistrer Par'},{text:'Actions'}],
            saerch:null,
            search:null,
            produit:{produit_id:{id:null,names:null},supplier:{},produit:{names:null},
            kgs:null,names:null,check:null,field_id:null,quantite:null,price:null,creator:this.$store.state.user.id,supplier_id:null},
            produits:[],
            disabled:false,
            feuilles:[],
            privious:[],
            supplier:null,
            loadingsearch:false,
            loading:false
        }
    },
    computed:{
        champs(){
            return this.supplier.champs
        },
       items(){
            return this.$store.state.sheet
        },
        total(){
            return this.items.reduce((acc,item)=>acc + item.price * item.kgs,0)
        },
        itemKgs(){
           return this.items.reduce((acc,item)=>acc + item.kgs,0) 
        },
        unitprice(){
            return this.items.reduce((acc,item)=>acc + item.price,0)
        }
    },
    methods:{
        async checked(){
            this.check =1
        },
        async annuler(){
            this.$store.dispatch("ResetSheet")
            this.produit={produit_id:null,kgs:null,names:null,quantite:null,price:null,supplier_id:null}
            this.search =null
        },
        async product(id){
          const data= this.produits.filter(item=>{
                return item.id ==id
            })
            this.produit.produit= data
        },
        async feuille(){
            this.$store.dispatch("setFeuille",this.produit)
            this.produit={produit_id:null,kgs:null,names:null,quantite:null,price:null}
            this.produit.supplier_id = this.$store.state.sheet.supplier_id
        },
        async saveStock(){
            this.loading =true
            const response = await stockServices.saveStock({
                creator:this.$store.state.user.id,
                supplier_id:this.produit.supplier_id,
                branche_id:this.$store.state.branche.id,
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
        }
    },
   async mounted(){
       this.produits = (await productsServices.product()).data
       this.privious = (await stockServices.stock()).data
    },
    watch:{
        search: _.debounce(async function (value) {
            this.loadingsearch =true
            this.supplier = (await supllierServices.saerch(value)).data
            this.loadingsearch =false
        },700)
    }

}
</script>
<style>
.cut
{
	border-width: 1px;
	display: block;
	font-size: .8rem;
	padding: 0.25em 0.5em;	
	float: left;
	text-align: center;
	width: 0.6em;
}

.cut
{
	background: rgb(226, 19, 19);
	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	background-image: -moz-linear-gradient(#f5280dc2 5%, #dd3705 100%);
	background-image: -webkit-linear-gradient(#c24d09 5%, #f3440e 100%);
	border-radius: 0.5em;
	border-color: #fa570b;
	color: #FFF;
	cursor: pointer;
	font-weight: bold;
	text-shadow: 0 -1px 2px rgba(0,0,0,0.333);
}

.cut { opacity: 0; position: absolute; top: 0; left: -1.5em; }
/* .cut { -webkit-transition: opacity 100ms ease-in; } */

.orderclass:hover .cut { opacity: 1; }
</style>