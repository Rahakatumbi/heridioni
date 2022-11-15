<template>
    <v-app>
        <subheader title="Stocks">
                <v-spacer></v-spacer>
                <h6>HERIDIONI SARL</h6>
        </subheader>
        <v-card tile>
        <v-row class="ml-0 mt-0 mr-0 mb-0">
            <v-col md="4" cols="12">
                <panel :title="supplier.id?'Modification du Fermier':'Formulaire d\'Enregistrement'">
                    <v-card-text>
                        <v-row>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="supplier.names"
                                label="Nom du Fermier"
                                placeholder="Entrer le Nom du Fermier"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="supplier.address"
                                label="Addresse du Fermier"
                                placeholder="Entrer l'Addresse du Fermier"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="supplier.phone"
                                label="Telephone du Fermier"
                                placeholder="Entrer le Telephone du Fermier"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-select v-model="supplier.civil"
                                label="Etat Civil du Fermier"
                                placeholder="Entrer l'Etat Civil du Fermier"
                                counter="50"
                                dense
                                :items="civil"
                                item-text="text"
                                item-value="id"
                                outlined
                                ></v-select>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-select v-model="supplier.sexe"
                                label="Genre du Fermier"
                                placeholder="Entrer le sexe du Fermier"
                                counter="50"
                                dense
                                :items="sexe"
                                item-text="text"
                                item-value="id"
                                outlined
                                ></v-select>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="supplier.bod"
                                label="Date de Naissance du Fermier"
                                placeholder="Entrer la Date de Naissance  du Fermier"
                                counter="50"
                                type="date"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn small @click="annuler" color="error">Annuler</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn small color="#2C130D" :loading="loading" class="white--text" @click="saveSupplier">{{supplier.id?'Modifier':'Enregister'}}</v-btn>
                    </v-card-actions>
                </panel>
            </v-col>
            <v-col cols="12" md="8">
                <panel title="Liste de Fermiers">
                    <v-data-table :items="items.slice().reverse()" dense :headers="headers" :search="search">
                        <template v-slot:body="{items}">
                            <tbody v-if="items.length">
                                <tr v-for="(item,index) in items" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.names}}</td>
                                    <td>{{item.code}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{item.phone}}</td>
                                    <td>
                                        <v-btn x-small color="green" class="white--text" @click="addField(item)"><v-icon small>mdi-plus</v-icon>Ajouter un champs</v-btn>
                                        <v-btn x-small @click="supplier=item" color="#2C130D" class="white--text"><v-icon small>mdi-pencil</v-icon>Modifier</v-btn>
                                        <v-btn x-small @click="displayChamps(item.id)" color="warning" class="white--text"> <v-icon small>mdi-eye</v-icon> Champs</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </panel>
            </v-col>
        </v-row>
        </v-card>
        <v-dialog v-model="dialog" width="600">
            <panel :title="`Enregistrement de Nouveau Champs`">
                <v-card-text>
                    <v-text-field v-model="champ.supplier" dense outlined disabled label="Fermier"></v-text-field>
                    <v-text-field v-model="champ.code" dense outlined disabled label="Code"></v-text-field>
                    <v-autocomplete :items="axes" item-value="id" item-text="names" v-model="champ.axe_id" dense outlined label="Axe du Champs"></v-autocomplete>
                    <v-text-field v-model="champ.size" outlined dense label="Superficie du Champs"></v-text-field>
                    <v-text-field v-model="champ.plante" outlined dense label="Nombre de Plantes"></v-text-field>
                    <v-text-field v-model="champ.adelivrer" outlined dense label="Quantite A Delivrere "></v-text-field>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn small @click="annulerdialog" color="error">
                            Annuler 
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn small color="#2C130D" class="white--text" @click="saveChamp">Enregistrer</v-btn>
                    </v-card-actions>
                </v-card-text>
            </panel>
        </v-dialog>
    </v-app>
</template>
<script>
import subheader from '../components/global/subheader.vue'
    import panel from '../components/global/panel.vue'
    import supllierServices from '../services/supllierServices'
    import axeServices from '../services/AxeServices'
import champServices from '../services/champServices'
export default {
    components:{subheader,panel},
    data(){
        return{
            loading:false,
            items:[],
            headers:[{text:'N#'},{text:"Nom du Fermier"},{text:'Code'},{text:'Addresse'},{text:'Telephone'},{text:'Actions'}],
            search:null,
            supplier:{names:null,phone:null,address:null,id:null,creator:this.$store.state.user.id,type:null,sexe:null,civil:null,
            bod:null,branche_id:this.$store.state.user.id},
            champ:{supplier:null,supplier_id:null,code:null,axe_id:null,champs:null,createdby:this.$store.state.user.id,address:null,size:null,plante:null,adelivrer:null},
            dialog:false,
            axes:[],
            dialogchamp:false,
            civil:[{text:'Celibataire',id:1},{text:'Marrie',id:2},{text:'Divorce',id:3},{text:'Veuve',id:4}],
            sexe:[{text:'Masculin',id:1},{text:'Feminin',id:2},]
        }
    },
    methods:{
        async displayChamps(index){
            this.$router.push('/field/'+index)
        },
        async annuler(){
            this.supplier={names:null,phone:null,address:null,id:null,creator:1,sexe:null,civil:null,bod:null},
            this.loading =false
        },
        async saveSupplier(){
            this.loading=true
            try{
                const response = await supllierServices.register({
                    id:parseInt(this.supplier.id),
                    names:this.supplier.names,
                    phone:parseInt(this.supplier.phone),
                    address:this.supplier.address,
                    branche_id:parseInt(this.supplier.branche_id),
                    civil:this.supplier.civil,
                    sexe:this.supplier.sexe,
                    bod:this.supplier.bod,
                    creator:parseInt(this.supplier.creator),
                })
                if(response){
                    this.loading =false
                    if(this.supplier.id==null){
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
                        title: `${e}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.loading = false
            }
        },
        async addField(item){
            this.dialog =true
            this.champ.supplier=item.names
            this.champ.code = item.code
            this.champ.supplier_id =item.id
        },
        async saveChamp(){
            try{
                const response = await champServices.register({
                    supplier_id:parseInt(this.champ.supplier_id),
                    createdby:parseInt(this.champ.createdby),
                    address:this.champ.address,
                    size:parseFloat(this.champ.size),
                    plante:parseFloat(this.champ.plante),
                    adelivrer:parseFloat(this.champ.adelivrer),
                    axe_id:parseInt(this.champ.axe_id)
                })
                if(response){
                    this.annulerdialog()
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
                        title: `${e.response.data}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        },
        async annulerdialog(){
            this.champ = {supplier:null,supplier_id:null,code:null,champs:null,createdby:this.$store.state.user.id,address:null}
            this.dialog = false
        }
    },
   async mounted(){
       this.items = (await supllierServices.supllier()).data
       this.axes = (await axeServices.axes()).data
    }
}
</script>