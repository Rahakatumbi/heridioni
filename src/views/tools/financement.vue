<template>
    <v-app>
        <div class="elevation-2">
            <v-row>
                <v-col cols="12" md="4">
                    <panel class="elevation-1 mt-2 ml-2 mr-1" title="Formulaire">
                        <div class="elvation-6 mt-2 ml-2 mr-2 ">
                            <v-text-field label="Motif" v-model="depense.motif" dense outlined placeholder="Motif du depense"></v-text-field>
                            <v-autocomplete :items="depots" dense outlined v-model="depense.depot_id" item-text="names" item-value="id" label="Depot" placeholder="Veuillez Choisir un depot"></v-autocomplete>
                            <v-text-field label="Montant" v-model.number="depense.montant" outlined dense placeholder="Motif du Montant"></v-text-field>
                            <v-textarea label="Description" v-model="depense.description" outlined dense placeholder="Description du depense"></v-textarea>
                        </div>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="annuler" small>Annuler</v-btn>
                            <v-btn color="#2C130D" small @click="saveFinancement" class="white--text" v-if="!formloading">Enregister</v-btn>
                            <v-btn v-else small>
                                <Spnipperpoint align="center"></Spnipperpoint>
                            </v-btn>
                        </v-card-actions>
                    </panel>
                </v-col>
                <v-col cols="12" md="8">
                    <panel class="elevation-1 mt-2 mr-1" title="Liste des Financements">
                        <v-text-field class="ml-3 mt-6 mr-3" v-model="search" dense label="Recherche" placeholder="Taper..."></v-text-field>
                        <v-data-table dense :headers="headers" :items="depenses" :search="search">
                            <template v-slot:body="{items}">
                                <tbody v-if="items.length">
                                    <tr v-for="(item,index) in items" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.motif}}</td>
                                        <td>{{item.montant}}</td>
                                        <td>{{item.used_amount}}</td>
                                        <td>{{item.depot}}</td>
                                        <td>
                                            <v-chip class="info white--text" small v-if="item.montant - item.used_amount >=1">Actif</v-chip>
                                            <v-chip class="info white--text" small v-if="item.montant - item.used_amount <0">Depense et Dette</v-chip>
                                            <v-chip class="info white--text" small v-if="item.montant - item.used_amount ==0">Depense et Finit</v-chip>
                                        </td>
                                        <td>
                                            <v-btn x-small color="warning" class="white--text" @click="depense=item" v-if="item.used_amount == 0">Modifier
                                                <v-icon x-small>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn x-small color="#2C130D" class="white--text" @click="dialog=true, finance=item">Afficher
                                                <v-icon x-small>mdi-eye</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr v-if="!loading">
                                        <td colspan="7" class="text-center" style="text-align: center;">Pas des depenses Disponible</td>
                                    </tr>
                                    <tr v-else>
                                        <Spnipperpoint align="center"></Spnipperpoint>
                                    </tr>
                                </tbody>
                            </template>
                        </v-data-table>
                    </panel>
                </v-col>
            </v-row>
        </div>
        <v-dialog v-model="dialog" width="500">
            <panel :title="`Financement 00${finance.id}`">
                <v-card-actions class="overline">
                        <span>Motif du financement</span>
                        <v-spacer></v-spacer>
                        <strong class="info--text">{{finance.motif}}</strong><br>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="overline">
                        <span>Montant total du financement</span>
                        <v-spacer></v-spacer>
                        <strong class="info--text">{{finance.montant}}</strong><br>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="overline">
                        <span>Montant total depense</span>
                        <v-spacer></v-spacer>
                        <strong class="info--text">{{finance.used_amount}}</strong><br>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="overline">
                        <span>Montant Restant</span>
                        <v-spacer></v-spacer>
                        <strong class="info--text">{{finance.montant - finance.used_amount}}</strong><br>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="overline">
                        <span>Depot Finance</span>
                        <v-spacer></v-spacer>
                        <strong class="info--text">{{finance.depot}}</strong><br>
                </v-card-actions>
                <v-divider></v-divider>
                <div class="ml-2 mt-1 mr-2">
                    <span class="overline">Description</span><br>
                    <span>{{finance.description}}</span>
                </div>
                <br>
                <v-divider></v-divider>
                <v-card-actions class="overline">
                        <span>Statut</span>
                        <v-spacer></v-spacer>
                        <strong class="info--text" v-if="finance.montant - finance.used_amount >=1">Actif</strong><br>
                        <strong class="info--text" v-if="finance.montant - finance.used_amount <0">Depense et Dette</strong><br>
                        <strong class="info--text" v-if="finance.montant - finance.used_amount ==0">Depense et Finit</strong><br>
                </v-card-actions>
            </panel>
        </v-dialog>
    </v-app>
</template>
<script>
import panelVue from '../../components/global/panel.vue'
import financeServices from '../../services/financementServices'
import brancheServices from '../../services/brancheServices'
import Spnipperpoint from '../../components/global/spnipperpoint.vue'
export default{
    components:{"panel":panelVue,Spnipperpoint},
    data(){
        return{
            finance:{},
            dialog:false,
            depense:{
                id:null,
                montant:null,
                motif:null,
                description:null,
                depot_id: null,
                createdby: this.$store.state.user.id
            },
            depenses:[],
            depots:[],
            search:null,
            headers:[{text:'N#'},{text:'Motif',value:'motif'},{text:'Montant',value:'montant'},{text:'Montant Depense'},{text:'Depot'},{text:'Statut'},{text:'Actions'}],
            loading:false,
            formloading:false,
        }
    },
    methods:{
        async annuler(){
            this.depense={
                id:null,
                montant:null,
                motif:null,
                description:null,
                depot_id: null,
            }
        },
        async saveFinancement(){
            this.formloading = true
            try{
                const res = await financeServices.register(this.depense)
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
                    title: `Verifier les informations envoyes ou votre connection internet.`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    },
    async mounted(){
        this.depenses = (await financeServices.financements()).data
        this.depots = (await brancheServices.branches()).data
    }
}
</script>