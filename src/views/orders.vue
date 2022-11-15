<template>
    <v-app>
        <subheader :title="`Commandes`"></subheader>
        <v-row>
            <v-col cols="12" md="4">
                <panel title="Formulaire">
                    <v-card-text>
                        <v-row>
                            <v-col md="12" cols="12">
                                <v-autocomplete :items="clients" @change="client" v-model="order.client_id" item-text="names" item-value="id" label="Client" placeholder="Choisir le Client" outlined dense></v-autocomplete>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-select label="Mode de payement" v-model="order.mode_de_payement" :items="modes" item-value="id" item-text="text" placeholder="Selectionner" outlined dense></v-select>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-text-field label="Lieu de Livraison" v-model="order.lieu_de_livraison" placeholder="Tapez le lieu de livraison" outlined dense></v-text-field>
                            </v-col>
                            <v-col :md="order.type==1?6:12" cols="12">
                                <v-select label="Type de Commande" :items="types" item-value="id" item-text="text" v-model="order.type" placeholder="Selectionner le type" outlined dense></v-select>
                            </v-col>
                            <v-col md="6" cols="12" v-if="order.type==1">
                                <v-text-field label="Montant du Financement" type="number" v-model="order.financement" placeholder="Tapez le Montant di financement" outlined dense></v-text-field>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-select :items="qualites" v-model="order.quality" item-value="id" item-text="text" label="Quatite(s)" placeholder="Selectionner" outlined dense></v-select>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-text-field type="date" label="Echeance(s)" v-model="order.echeance" placeholder="Tapez le nombre de kg(s)" outlined dense></v-text-field>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-autocomplete :items="products" item-value="id" item-text="names"  label="Produit" v-model="order.product_id" placeholder="Tapez le nom du produit" outlined dense></v-autocomplete>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-text-field label="Quantite(s)" type="number" v-model="order.quantity" placeholder="Tapez le nombre de kg(s)" outlined dense></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn color="error" @click="annuler" small>Annuler</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="#2C130D" class="white--text" @click="addOnOrder" small>Ajouter a la Feuille</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </panel>
            </v-col>
            <v-col cols="12" md="8">
                <panel :title="`Commande `"> 
                        <v-flex class="mr-2 ml-2 mt-1">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <div class="text-uppercase">

                                    <strong>Socoopher Sarl</strong><br>
                                    <span>Commande N#</span>
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
                                        Lieu de Livraison: <strong>{{lieu_de_livraison}}</strong><br>
                                        Date: <strong>{{echeance}}</strong><br>
                                        status: <strong>{{status==1?'En Entente':status==2?'En Cours':status==3?'Termine':'???'}}</strong>
                                    </small>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-flex>
                    <v-divider></v-divider>
                        <v-flex m-r2 ml-2 mt-2>
                            <v-simple-table dense id="table" v-if="previous">
                                <template v-slot:default >
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Designation</th>
                                        <th>Qualite</th>
                                        <th>Echeance</th>
                                        <th>Qte</th>
                                    </tr>
                                    </thead>
                                    <tbody v-if="items.length">
                                        <tr v-for="(item,index) in items" :key="index">
                                            <td><a class="cut">x</a><span>{{index+1}}</span></td>
                                            <span v-if="item.produit">
                                                <span v-for="product in item.produit" :key="product.id">
                                                    <td>{{product.names}}</td>
                                                </span>
                                            </span>
                                            <span v-else>
                                                <td>{{item.names}}</td>
                                            </span>
                                            <td>{{item.quality==1?'1e':'2e'}}</td>
                                            <td>{{item.echeance}}</td>
                                            <td>{{item.quantity}} Kg(s)</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">Total</td>
                                            <td>{{total}} Kg(s)</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6">
                                                <v-card-actions>
                                                    <v-btn color="error" small @click="resetOrders">Annuler Tout</v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="#2C130D" class="white--text" v-if="previous" @click="saveOrder(); savetype=1" small>Enregister Seulement</v-btn>
                                                    <v-btn color="warning" class="white--text" v-if="previous" @click="saveOrder(); savetype=2" small>Enregister Et Traiter</v-btn>
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
                            <v-simple-table dense id="table" v-else>
                                <template v-slot:default v-if="!loading">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Designation</th>
                                            <th>Qualite</th>
                                            <th>Echeance</th>
                                            <th>Qte</th>
                                            <th>Qte Servit</th>
                                            <th>Balance</th>
                                            <th>Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="!loading && viewItems.length">
                                        <tr v-for="(item,index) in viewItems" :key="index">
                                            <td><a class="cut">x</a><span>{{index+1}}</span></td>
                                            <td>{{item.names}}</td>
                                            <td>{{item.quality==1?'1e':'2e'}}</td>
                                            <td>{{item.echeance}}</td>
                                            <td>{{item.quantity}} Kg(s)</td>
                                            <td>{{item.served_quantity}} Kg(s)</td>
                                            <td>{{item.quantity - item.served_quantity}} Kg(s)</td>
                                            <td :class="(item.quantity - item.served_quantity)>0?'red--text':'success--text'">{{(item.quantity - item.served_quantity)>0?'En entente':'Complet'}}</td>
                                        </tr>
                                            <tr>
                                                <td colspan="4">Total</td>
                                                <td>{{totalpreview}} Kg(s)</td>
                                                <td colspan="3"></td>
                                            </tr>
                                        <tr>
                                            <td colspan="8" v-if="viewItems.length">
                                                <v-card-actions>
                                                    <v-btn color="error" small @click="resetOrders">Annuler Tout</v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn x-small v-if="totalpreview-totalserved>=1" color="warning" @click="start_traitement();$router.push('traitement/'+order_id)" v-text="`Traiter`"></v-btn>
                                                    <span text v-else color="info">
                                                        <span text class="warning--text mr-4">Traitement deja Terminer?????</span>
                                                        <v-btn x-small color="primary" @click="start_traitement();$router.push('addprix/'+order_id)">Passer A la Facturation</v-btn>
                                                    </span>
                                                </v-card-actions>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="8" style="text-align:center">Fueille Vide</td>
                                        </tr>
                                    </tbody>
                                </template>
                                <template v-slot:default v-else>
                                    <tbody>
                                    <snipperload align="center"></snipperload>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-flex>
                </panel>
                <panel :title="`Liste de demandes`" class="mt-2 uppercase-text">
                    <v-data-table :items="orders.slice().reverse()" dense :search="search" :headers="headers" v-if="!dataloads">
                        <template v-slot:body="{items}">
                            <tbody v-if="items.length && !dataloads">
                                <tr v-for="(item,index) in items" :key="index">
                                    <td>{{++index}}</td>
                                    <td>CMD0{{item.id}}</td>
                                    <td>{{item.names}}</td>
                                    <td>{{item.status==1?'En Entente':item.status==2?'En Cours':item.status==3?'Termine':'???'}}</td>
                                    <td :class="item.type==1?'green--text':'warning--text'">{{item.type==1?'Financer':'Auto Financement'}}</td>
                                    <td>{{item.mode_de_payement==1?'CAD':item.mode_de_payement==2?'FOB':item.mode_de_payement==3?'CIF':item.mode_de_payement==4?'CFR':item.mode_de_payement==5?'FOT':'Autre'}}</td>
                                    <td>
                                        <v-btn x-small @click="viewOrder(item)" color="info">
                                        <v-icon small>mdi-eye</v-icon>
                                        Afficher</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="7" style="text-align:center">Vide</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                    <div v-else>
                        <snipper-circle align="center"></snipper-circle>
                    </div>
                </panel>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import Panel from '../components/global/panel.vue'
import subheader from '../components/global/subheader.vue'
import clientsServices from '../services/clientsServices'
import orderServices from '../services/orderServices'
import orderService from '../services/orderServices'
import productsServices from '../services/productsServices'
import Snipperload from '../components/global/snipperload.vue'
import SnipperCircle from '../components/global/snipperCircle.vue'
export default {
  components: { subheader, Panel, Snipperload, SnipperCircle },
  data(){
    return{
        savetype:null,
        search:null,
        mode_de_payement:null,
        lieu_de_livraison:null,
        clients:[],
        identify:null,
        echeance:null,
        loading: false,
        status:null,
        order_id:null,
        orders:[],
        products:[],
        produit:null,
        dataloads:false,
        order:{id:null,client_id:null,quality:null,type:null,financement:null,product_id:null,quantity:null,mode_de_payement:null,echeance:null,lieu_de_livraison:null,creator:this.$store.state.user.id},
        headers:[{text:'N#'},{text:'Code'},{text:'Client'},{text:'Etat'},{text:'Type'},{text:'Mode de Payement'},{text:'Actions'}],
        qualites:[{text:'Premiere Qualite',id:1},{text:'Deuxieme Qualite',id:2}],
        types:[{text:'Financer',id:1},{text:'Auto Financement',id:2}],
        modes:[{text:'CAD',id:1},{text:'FOB',id:2},{text:'CIF',id:3},{text:'CFR',id:4},
        {text:'FOT',id:5},{text:'Autre...',id:6}],
        previous:false,
        viewItems:[],
    }
  },
  computed:{
       items(){
            return this.$store.state.orders
        },
        total(){
            return this.items.reduce((acc,item)=>acc + item.quantity,0)
        },
        totalpreview(){
            return this.viewItems.reduce((acc,item)=>acc + item.quantity,0)
        },
        totalserved(){
            return this.viewItems.reduce((acc,item)=>acc + item.served_quantity,0)
        }
  },
  methods:{
    async client(){
        this.previous = true
        if(this.previous){
            this.resetOrders()
        }
        const data= this.clients.filter((client)=>{
                return client.id == this.order.client_id
            })
        this.identify =data
    },
    async start_traitement(){
        this.$store.dispatch('setClientOrder',this.identify)
        this.viewItems.forEach(element => {
            this.$store.dispatch('setOrder',element)
        });
    },
    async annuler(){
        this.order={id:null,client_id:null,type:null,financement:null,quality:null,quantity:null,mode_de_payement:null,
        echeance:null,lieu_de_livraison:null,creator:this.$store.state.user.id}
    },
    async addOnOrder(){
        if(this.previous){
            const produit = this.products.filter((item)=>{
                return item.id == this.order.product_id && item.names
            })
            const data ={
                product_id: this.order.product_id,
                produit:produit,
                quality:this.order.quality,
                quantity:parseFloat(this.order.quantity),
                echeance:this.order.echeance,
            }
            this.$store.dispatch('setOrder',data)
        }
        else{
           this.$swal.fire({
                icon: 'error',
                title: `Vide la Fueille pour Continuer.`,
                showConfirmButton: false,
                timer: 3000
            })
        }
    },
    async viewOrder(index){
        this.previous = false
        this.resetOrders()
        const data= this.clients.filter((client)=>{
            return client.id == index.client_id
        })
        this.identify =data
        this.echeance = index.createdAt
        this.status = index.status
        this.lieu_de_livraison = index.lieu_de_livraison
        this.mode_de_payement = index.mode_de_payement
        this.order_id = index.id
        this.loading = true
        try {
            const res = await orderServices.orderinfo(index.id)
            this.loading = false
            this.viewItems = res.data
        }catch(e){
            this.loading = false
            this.$swal.fire({
                    icon: 'error',
                    title: `Oops!`,
                    text:'Il y\'a une erreur',
                    showConfirmButton: false,
                    timer: 1500
                });
        }
    },
    async resetOrders(){
        this.$store.dispatch('resetOrders')
        this.identify=null,
        this.viewItems = []
    },
    async saveOrder(){
        this.dataloads=true
        try{
            const response = await orderService.register({
                mode_de_payement:this.order.mode_de_payement,
                lieu_de_livraison:this.order.lieu_de_livraison,
                client_id:this.order.client_id,
                type:this.order.type,
                financement:parseFloat(this.order.financement),
                creator:this.order.creator,
                info:this.items,
            })
            if(response){
                this.dataloads =false
                // if(this.savetype ==2){
                //     console.log(JSON.stringify(response.data.info))
                //     this.$store.dispatch('setOrder',response.data.info)
                //     this.$router.push('traitement/'+response.data.id)
                // }
                if(this.order.id==null){
                    this.orders.push(response.data)
                }
                this.resetOrders()
                this.annuler()
                this.$swal.fire({
                    icon: 'success',
                    title: `L'Operation a reussit.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }catch(e){
            this.dataloads =false
                this.$swal.fire({
                    icon: 'error',
                    title: `Une erreur s'est produit.`,
                    showConfirmButton: false,
                    timer: 1500
                });

        }
    }
  },
 async mounted(){
    this.clients = (await clientsServices.client()).data
    this.products = (await productsServices.product()).data
    this.dataloads =true
    this.orders = (await orderService.orders()).data
    .filter(status=>{
        return status.status != 3 &&status.status !=2
    })
    this.dataloads =false
  }
    
}
</script>