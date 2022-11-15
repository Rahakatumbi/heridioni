<template>
    <v-app>
        <v-row>
            <v-col cols="12" md="12">
                <panel :title="`Tretaiment du Commande `"> 
                        <v-flex class="mr-2 ml-2 mt-1">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <div class="text-uppercase">
                                        <strong>Socoopher Sarl</strong><br>
                                        <span>Traitement du Commande N#</span><br>
                                       <strong><span class="success--text">CMD0{{$route.params.id}}</span></strong> 
                                    </div>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <h6>Client</h6>
                                    <div v-for="identify in identify" :key="identify.id">
                                    <small>
                                        Noms: <strong>{{identify.names}}</strong> <br>
                                        Email: <strong>{{identify.email}}</strong><br>
                                        Telephone: <strong>{{identify.phone}}</strong><br>
                                        Addresse: <strong>{{identify.address}}</strong>
                                    </small>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <h6>Informations Supplementaires</h6>
                                    <div v-for="identify in identify" :key="identify.id">
                                    <small>
                                        Mode de Payement: <strong>{{mode_de_payement==1?'CAD':mode_de_payement==2?'FOB':mode_de_payement==3?'CIF':mode_de_payement==4?'CFR':mode_de_payement==4?'CFR':mode_de_payement==5?'FOT':'Autre'}}</strong> <br>
                                        <!-- Lieu de Livraison: <strong>{{lieu_de_livraison}}</strong><br> -->
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
                                            <th>Qualite</th>
                                            <th>Echeance</th>
                                            <th>Qte Initiale</th>
                                            <th>Qte Deja Servit</th>
                                            <th>Balance</th>
                                            <th class="green--text">Nouvelle Qte Servit</th>
                                            <th class="info--text">Nouvelle Balance</th>
                                            <th>Depots</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="items.length">
                                        <tr v-for="(item,index) in items" :key="index">
                                            <td><a class="cut">x</a><span>{{index+1}}</span></td>
                                            <td>{{item.names}}</td>
                                            <td>{{item.quality==1?'1e':'2e'}}</td>
                                            <td>{{item.echeance}}</td>
                                            <td>{{item.quantity}}kg(s)</td>
                                            <td>{{item.served_quantity}} Kg(s)</td>
                                            <td>{{item.quantity - item.served_quantity}} Kg(s)</td>
                                            <td :id="`quantiy_used${item.id}`" class="green--text">{{0}} kg(s)</td>
                                            <td :id="`balance_qty${item.id}`" class="info--text">{{0}} kg(s)</td>
                                            <td>
                                                <v-btn x-small color="secondary" v-if="(item.quantity - item.served_quantity)>0" @click="findHouse(item)">Choisir Un Depot</v-btn>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">Total</td>
                                            <td>{{total}} Kg(s)</td>
                                            <td>{{totalserved}} kg(s)</td>
                                            <td>{{total-totalserved}} kg(s)</td>
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr>
                                            <td colspan="10">
                                                <v-card-actions>
                                                    <v-btn color="error" @click="annulerTout" small>Annuler</v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="#2C130D" class="white--text" @click="saveOrder" v-if="!loadinsave" small>Enregister la Commande</v-btn>
                                                    <v-btn color="info" v-else>
                                                        <Spnipperpoint></Spnipperpoint>
                                                    </v-btn>
                                                </v-card-actions>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" style="text-align:center">Fueille Vide</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-flex>
                </panel>
            </v-col>
        </v-row>
        <!-- <Viewtraitement class="mt-2"/> -->
        <v-dialog width="650" v-model="dialog">
            <panel :title="`Formulaire`" >
                <v-flex mt-2 mr-2 ml-2>
                    <v-autocomplete :items="depots" v-model="branche_id" item-text="names" item-value="id" label="Depot" placeholder="Taper le Noms du Depot" outlined dense></v-autocomplete>
                    <SnipperCircle align="center" class="mt-2 mr-2 ml-2" v-if="loading"></SnipperCircle>
                    <v-flex mr-2 ml-2  v-if="branche.length">
                        <span v-for="branche in branche" :key="branche.id">
                            <h4 style="text-align:center">Information du Depot</h4>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <strong>Depot:</strong><span> {{branche.names}}</span> <br>
                                    <strong>Province:</strong><span> {{branche.province}}</span> <br>
                                    <strong>Chef:</strong><span> {{branche.id}}</span> <br>
                                </v-col>
                                <v-col md="6" cols="12">
                                    <strong>Tel:</strong><span> {{branche.phone}}</span> <br>
                                    <strong>Types:</strong><span> {{branche.names}}</span> <br>
                                    <strong>Addresse:</strong><span> {{branche.address}}</span> <br>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <br>
                            <h4 style="text-align:center">Details du Stock</h4>
                            <v-divider></v-divider>
                            <br>
                        </span>
                        <v-data-table dense :items="newItems.slice().reverse()" :headers="itemsHead">
                            <template v-slot:body="{items}">
                                <tbody v-if="items.length" id="mytable">
                                    <tr v-for="(item,index) in items" :key="index"  @click="selectItem(index,item)" >
                                            <td>{{++index}}</td>
                                            <td>{{item.names}}</td>
                                            <td>{{item.qualite==1?'1ere':item.qualite==2?'2eme':'Inconnu'}} Kg(s)</td>
                                            <td>{{item.kgs-item.used_quantity}}</td>
                                            <td>{{item.price}}</td>
                                            <td>
                                                <v-btn color="#003d42" class="white--text"  @click="selectItem(index,item)" x-small>Selectionner</v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" style="text-align:center">Pas de Stock Disponible</td>
                                        </tr>
                                    </tbody>
                            </template>
                        </v-data-table>
                    </v-flex>
                    <br>
                    <div v-if="indexof">
                    <v-divider class="green"></v-divider>
                    <h4 style="text-align:center">Affectation du Stock</h4>
                    <v-divider class="green"></v-divider>
                    <br>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field class="mt-1" dense outlined disabled color="green" v-model="affectedItem.used_quantity" label="Qte Disponible" placeholder="Taper la Quantite"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field class="mt-1" dense outlined  disabled color="green" v-model="all_qty" label="Qte Demander" placeholder="Taper la Quantite"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field class="mt-1" dense outlined  disabled color="green" :value="affectedItem.used_quantity" label="Qte Servit" placeholder="Taper la Quantite"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="8">
                                <v-text-field class="mt-1" dense outlined label="Quantite A Servir" v-model.number="affectedItem.quantity" placeholder="Taper la Quantite"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field class="mt-1" dense outlined  disabled label="Reste A Servir" color="green" v-model="all_qty" placeholder="Taper la Quantite"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <v-divider></v-divider>
                    <v-card-actions v-if="affectedItem.quality !==null">
                        <v-btn color="error" @click="annuler" small>Annuler</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="warning" @click="AffecterOrder" small>Affecter</v-btn>
                    </v-card-actions>
                </v-flex>
            </panel>
        </v-dialog>
    </v-app>
</template>
<script>
import panel from '../components/global/panel.vue'
import brancheServices from '../services/brancheServices'
import _ from 'lodash'
import SnipperCircle from '../components/global/snipperCircle.vue'
import orderServices from '../services/orderServices'
import Spnipperpoint from '../components/global/spnipperpoint.vue'
// import Viewtraitement from './folders/viewtraitement.vue'
export default {
    components:{ panel, SnipperCircle, Spnipperpoint },
    data(){
        return{
            depots:[],
            branche:[],
            dialog:false,
            branche_id:null,
            datas:[],
            loading:false,
            quality:null,
            product_id:null,
            selectedRow: null,
            itemsHead:[{text:'N#'},{text:'Produit'},{text:'Qualite'},{text:'Qte'},{text:'Prix Un'},{text:'Action'}],
            indexof:null,
            idof:null,
            all_qty:null,
            loadinsave:false,
            mode_de_payement:null,
            affectedItem:{quantity:null,quality:null,product_id:null,creator:this.$store.state.user.id,used_quantity:null,achat_info_id:null}
        }
    },
    computed:{
        items(){
            return this.$store.state.orders
        },
        identify(){
            return this.$store.state.client
        },
        total(){
            return this.items.reduce((acc,item)=>acc + item.quantity,0)
        },
        totalserved(){
            return this.items.reduce((acc,item)=>acc + item.served_quantity,0)
        },
        newItems(){
            return this.datas.filter((data)=>{
                return data.kgs-data.used_quantity > 0 && data.qualite == this.quality 
                && data.produit_id==parseInt(this.product_id)
            })
            
        }
    },
    methods:{
        async annuler(){
            this.affectedItem={quantity:null,quality:null,product_id:null,creator:this.$store.state.user.id,used_quantity:null,achat_info_id:null}
            this.dialog = false
            this.indexof =null
            this.datas =[],
            this.branche = []
            this.branche_id=null
        },
        async annulerTout(){
            this.$store.dispatch('resetdoOrder')
            this.$router.push('/order')
        },
        async findHouse(item){
            this.dialog =true
            this.quality = item.quality
            this.idof = item.id
            this.product_id = item.product_id
            this.all_qty = item.quantity - item.served_quantity
        },
        async selectItem(index ,item){
            this.indexof = index
            this.affectedItem.product_id = this.product_id
            this.affectedItem.achat_info_id =item.id
            this.affectedItem.used_quantity = item.kgs-item.used_quantity
            this.affectedItem.quality = item.qualite
            var table = document.getElementById("mytable")
            for (let i =0; i < table.rows.length; i++){ 
                table.rows[i].onclick = function(){
                    Array.from(this.parentElement.children).forEach((el)=>{
                        el.classList.remove("selected-row")
                    })
                    this.classList.toggle("selected-row")
                    
                }
            }
        },
        async AffecterOrder(){
            var rowvalue = document.getElementById(`quantiy_used${this.idof}`).innerText;
            var row = document.getElementById(`quantiy_used${this.idof}`);
            var qty_blance = document.getElementById(`balance_qty${this.idof}`);
           row.innerHTML = parseFloat(rowvalue) + parseFloat(this.affectedItem.quantity) + "kg(s)"
           qty_blance.innerHTML = parseFloat(this.all_qty) - (parseFloat(rowvalue) + parseFloat(this.affectedItem.quantity)) +"/"+this.all_qty +"kg(s)"
            const arr ={
                branche_id: parseInt(this.branche_id),
                order_id:parseInt(this.$route.params.id),
                order_info_id:parseInt(this.idof),
                produit_id:parseInt(this.affectedItem.product_id),
                achat_info_id:parseInt(this.affectedItem.achat_info_id),
                quality: parseInt(this.affectedItem.quality),
                quantity:parseFloat(this.affectedItem.quantity)
            }
            this.$store.dispatch('doOrder',arr)
            this.annuler()
            this.$swal.fire({
                icon: 'success',
                title: `L'Operation a reussit.`,
                showConfirmButton: false,
                timer: 1500
            });
        },
        async saveOrder(){
            var createdby = this.$store.state.user.id
            this.loadinsave =true
            try{
                const res = await orderServices.solveOder({
                    createdBy : createdby,
                    items: this.$store.state.traitement
                })
                if(res){
                    this.loadinsave = false
                    // this.$store.dispatch('resetdoOrder')
                    this.$router.push('/order')
                    this.$swal.fire({
                        icon: 'success',
                        title: `L'Operation a reussit.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            catch(e){
                this.loadinsave =false
                this.$swal.fire({
                    icon: 'error',
                    title: `Il y a une erreur.`,
                    showConfirmButton: false,
                    timer: 1500
                }); 
            }
        }
    },
    async mounted(){
        this.$store.dispatch('resetdoOrder')
        this.depots = (await brancheServices.branches()).data
    },
    watch:{
        branche_id: _.debounce(async function (value) {
            this.loading = true
            this.datas = (await brancheServices.findData(value)).data
            this.loading = false
            const res = this.depots.filter((depot)=>{
                return depot.id == value
            })
            this.branche = res
        },700)
    }
}
</script>
<style scoped>
.selected-row{
    background-color: #003d42 !important ;
    color: white;
}
</style>