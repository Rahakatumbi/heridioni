<template>
    <v-app>
        <Panel :title="`Tretaiment du Commande `"> 
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
                                <th>Quantite</th>
                            </tr>
                        </thead>
                        <tbody v-if="items.length" id="mytable">
                            <tr v-for="(item,index) in items" :key="index" @mouseenter="selectRow();" @click="facture=item">
                                <td>{{index+1}}</td>
                                <td>{{item.names}}</td>
                                <td>{{item.quality==1?'1e':'2e'}}</td>
                                <td>{{item.echeance}}</td>
                                <td>{{item.quantity}}kg(s)</td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">Total</td>
                                <td>{{total}} Kg(s)</td>
                            </tr>
                            <tr>
                                <td colspan="10">
                                    <v-card-actions>
                                        <v-btn color="error" @click="annulerTout" small>Annuler</v-btn>
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
        </Panel>
        <div class="mt-4">
            <v-card tile>
            <v-divider class="test"></v-divider>
            <v-row class="mr-2 mt-1 ml-2">
                <v-col cols="12" md="3">
                    <span><strong>Facturation</strong></span>
                    <div class="mt-1">
                    <v-text-field outlined dense readonly v-model="facture.names" label="Produit"></v-text-field>
                    <v-text-field outlined dense readonly v-model="facture.quality" label="Qualite"></v-text-field>
                    <v-text-field outlined dense readonly v-model="facture.quantity" label="Quantite"></v-text-field>
                    <v-text-field outlined dense v-model.number="facture.price" label="Prix Unitaire"></v-text-field>
                    <v-btn small @click="addPrice" color="primary">Ajouter a la Facture</v-btn><br><br>
                    <span v-if="error" class="error--text">Le prix est vide!!!</span>
                </div>
                </v-col>
                <v-col cols="12" md="9">
                    <div>
                        <h4>Cotation</h4>
                        <v-flex class="mr-2 ml-2 mt-1">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-img src="../assets/socoopher.jpeg" height="70" width="100"></v-img>
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
                                                <!-- Mode de Payement: <strong>{{mode_de_payement==1?'CAD':mode_de_payement==2?'FOB':mode_de_payement==3?'CIF':mode_de_payement==4?'CFR':mode_de_payement==4?'CFR':mode_de_payement==5?'FOT':'Autre'}}</strong> <br> -->
                                                <!-- Lieu de Livraison: <strong>{{lieu_de_livraison}}</strong><br> -->
                                    </small>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex class="">
                            <v-simple-table dense id="table">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Item</th>
                                            <th>Qualite</th>
                                            <th>Quantite</th>
                                            <th>Prix Unitaire</th>
                                            <th>Prix Total</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="data.length" id="mytable">
                                        <tr v-for="(item,index) in data" :key="index">
                                            <td>{{index+1}}</td>
                                            <td>{{item.names}}</td>
                                            <td>{{item.quality==1?'1e':'2e'}}</td>
                                            <td>{{item.quantity}}kg(s)</td>
                                            <td>{{item.price}} USD</td>
                                            <td>{{item.price*item.quantity}} USD</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="5">Total</td>
                                            <td>{{totalinvoice}} USD</td>
                                        </tr>
                                        <tr class="mt-2">
                                            <td colspan="3" ><strong>Banque</strong>:</td>
                                            <td><v-autocomplete class="mt-2" v-model="invoice.banque_id" :items="banques" 
                                                item-value="id" item-text="names" color="info" label="Banque" placeholder="Nom de la Banque" outlined dense>
                                            </v-autocomplete></td>
                                            <td><v-text-field class="mt-2" color="info" dense v-model="invoice.bordereau" outlined label="No Bordereau" placeholder="Numero de Borderau">
                                            </v-text-field></td>
                                            <td><v-text-field class="mt-2" color="info" dense v-model.number="invoice.paid_amount" outlined label="Montant" placeholder="Montant Payer">
                                            </v-text-field></td>
                                        </tr>
                                        <tr>
                                            <td colspan="5">Balance</td>
                                            <td><strong class="info--text">{{totalinvoice-invoice.paid_amount}} USD</strong></td>
                                        </tr>
                                        <tr>
                                            <td colspan="10">
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="error" @click="annuler" small>Annuler</v-btn>
                                                    <v-btn color="#2C130D" class="white--text" @click="savePrcie" v-if="!loadinsave" small>Enregister la Commande</v-btn>
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
                    </div>
                </v-col>
            </v-row>
            </v-card>
        </div>
    </v-app>
</template>
<script>
import Panel from '../components/global/panel.vue';
import banqueServices from '../services/banqueServices';
import orderServices from '../services/orderServices';
export default {
    data() {
        return {
            depots: [],
            branche: [],
            dialog: false,
            datas: [],
            loading: false,
            itemsHead: [{ text: "N#" }, { text: "Produit" }, { text: "Qualite" }, { text: "Qte" }, { text: "Prix Un" }, { text: "Action" }],
            loadinsave: false,
            facture:{id:null,names:null,order_id:null,product_id:null,quality:null,quantity:null,price:null},
            data:[],
            error:false,
            invoice:{montant:null,paid_amount:null,client_id:null,banque_id:null,bordereau:null,creator:this.$store.state.user.id,order_id:this.$route.params.id},
            banques:[]
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
        totalinvoice(){
            return this.data.reduce((acc,item)=>acc + (item.quantity * item.price),0)
        },
        totalserved(){
            return this.items.reduce((acc,item)=>acc + item.served_quantity,0)
        },
    },
    methods:{
        async annulerTout(){
            this.$store.dispatch('resetdoOrder')
            this.$router.push('/order')
        },
        async selectRow(){
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
        async annuler(){
            this.data =[]
            // this.facture={id:3,names:null,order_id:null,product_id:null,quality:null,quantity:null,price:null}
        },
        async addPrice(){
            if(this.facture.price){
            this.data.push(this.facture)
            this.facture={id:null,names:null,order_id:null,product_id:null,quality:null,quantity:null,price:null}
            this.error = false
            }else{
                this.error =true
            }
        },
        async savePrcie(){
            this.loadinsave =true
            this.identify.forEach(element => {
                this.invoice.client_id =element.id
            })
            
            try{
                const res = await orderServices.facturation({
                    items:this.data,
                    montant:this.totalinvoice,
                    paid_amount:this.invoice.paid_amount,
                    banque_id:this.invoice.banque_id,
                    bordereau:this.invoice.bordereau,
                    client_id:this.invoice.client_id,
                    creator:this.invoice.creator,
                    order_id:parseInt(this.invoice.order_id)
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
    components: { Panel },
   async mounted(){
    this.banques = (await banqueServices.banque()).data
   } 
}
</script>
<style scoped>
    .selected-row{
        background-color: #003d42 !important ;
        color: white;
    }

.test {
       border-width: 2px !important;
       border-color: #2C130D !important;
       height: 100%;
       background-color: #1B483E;
}
</style>
