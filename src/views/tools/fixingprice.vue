<template>
    <v-app>
        <div class="elevation-2">
            <v-row>
                <v-col cols="12" md="4">
                    <panel :title="depense.id?'Modification':'Formulaire'" class="elevation-1 mt-2 ml-2 mr-1">
                        <div class="mt-2 ml-2 mr-2 ">
                            <v-select label="Status" :items="status" item-text="text" item-value="value" v-model="depense.status" dense outlined placeholder="status du depense"></v-select>
                            <v-text-field label="price" v-model.number="depense.price" outlined dense placeholder="status du price"></v-text-field>
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
                                    <tr v-for="(item,index) in items" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{item.price}}</td>
                                        <td>
                                            <v-chip small class="info white--text" v-if="item.status=='Active'">Active</v-chip>
                                            <v-chip small class="warning white--text" v-if="item.status=='Desactive'">Desactive</v-chip>
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
export default{
    components:{ "panel": panelVue,  Spnipperpoint,snipperload },
    data(){
        return{
            finance:{},
            dialog:false,
            depense:{
                id:null,
                price:null,
                status:null,
                createdby: this.$store.state.user.id
            },
            status:[{text:'Active',value:'Active'},{text:'Desactive',value:'Desactive'}],
            depenses:[],
            search:null,
            headers:[{text:'N#'},{text:'Prix',value:'price'},{text:'Statut',value:'status'},{text:''}],
            loading:false,
            formloading:false,
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
                const res = await PriceServices.register(this.depense)
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
        this.loading =true
        this.depenses = (await PriceServices.all_price()).data
        this.loading =false
    }
}
</script>