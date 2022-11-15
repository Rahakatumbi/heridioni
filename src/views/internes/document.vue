<template>
    <v-app>
        <div class="elevation-2">
            <v-row>
                <v-col cols="12" md="4">
                    <panel class="elevation-1 mt-2 ml-2 mr-1" title="Formulaire">
                        <div class="elvation-6 mt-2 ml-2 mr-2 ">
                            <v-text-field label="Intitule du document" v-model="depense.intitule" dense outlined placeholder="Intitule du document"></v-text-field>
                            <v-text-field label="Oject du Document" v-model="depense.object" dense outlined placeholder="Object du depense"></v-text-field>
                            <v-text-field label="Document" type="file" v-model.number="depense.document" outlined dense placeholder="Document"></v-text-field>
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
                                        <td>{{item.intitule}}</td>
                                        <td>{{item.object}}</td>
                                        <td>
                                            <v-btn x-small color="warning" class="white--text" @click="depense=item">Modifier
                                                <v-icon x-small>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn x-small color="info" class="white--text" @click="dialog=true, finance=item">Afficher
                                                <v-icon x-small>mdi-eye</v-icon>
                                            </v-btn>
                                            <v-btn x-small color="#2C130D" class="white--text" @click="dialog=true, finance=item">Details
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
                        <span>Intitle du Document</span>
                        <strong class="info--text">{{finance.motif}}</strong><br>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="overline">
                        <span>Object du document</span>
                        <strong class="info--text">{{finance.object}}</strong><br>
                </v-card-actions>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <div class="ml-2 mt-1 mr-2">
                    <span class="overline">Description</span><br>
                    <span>{{finance.description}}</span>
                </div>
                <br>
                <v-divider></v-divider>
                <v-card-actions class="overline">
                        <v-btn small>Lire</v-btn>
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
                object:null,
                intitule:null,
                description:null,
                document: null,
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
                object:null,
                intitule:null,
                description:null,
                document: null,
                createdby: this.$store.state.user.id
            }
        },
        async saveFinancement(){
            this.formloading = true
            try{
                let form =  new FormData()
                form.append('id',this.depense.id)
                form.append('intitule',this.depense.intitule)
                form.append('object',this.depense.object)
                form.append('description',this.depense.description)
                form.append('createdby',this.depense.createdby)
                form.append('document',this.depense.document)
                const res = await financeServices.document(form,{headers: {
                    'Content-Type': 'multipart/form-data'
                }})
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
        this.depenses = (await financeServices.documents()).data
    }
}
</script>