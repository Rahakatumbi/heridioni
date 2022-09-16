<template>
    <v-app>
        <subheader title="Stocks">
                <v-spacer></v-spacer>
                <h6>Ets. Heridioni</h6>
        </subheader>
        <v-card tile>
        <v-row class="ml-0 mt-0 mr-0 mb-0">
            <v-col md="4" cols="12">
                <panel :title="axe.id?'Modification du Fournisseur':'Formulaire d\'Enregistrement'">
                    <v-card-text>
                        <v-row>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="axe.names"
                                label="Nom du Fournisseur"
                                placeholder="Entrer le Nom du Fournisseur"
                                counter="50"
                                dense
                                outlined
                                ></v-text-field>
                            </v-col>
                            <v-col md="12" cols="12">
                                <v-text-field v-model="axe.address"
                                label="Addresse du Fournisseur"
                                placeholder="Entrer l'Addresse du Fournisseur"
                                counter="50"
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
                        <v-btn small color="#2C130D" :loading="loading" class="white--text" @click="saveAxes">{{axe.id?'Modifier':'Enregister'}}</v-btn>
                    </v-card-actions>
                </panel>
            </v-col>
            <v-col cols="12" md="8">
                <panel title="Liste des Axes">
                    <v-data-table :items="items.slice().reverse()" dense :headers="headers" :search="search">
                        <template v-slot:body="{items}">
                            <tbody v-if="items.length">
                                <tr v-for="(item,index) in items" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.names}}</td>
                                    <td>{{item.address}}</td>
                                    <td>
                                        <v-btn x-small color="green" class="white--text">Ajouter Un Chef de depot<v-icon small>mdi-plus</v-icon></v-btn>
                                        <v-btn x-small @click="axe=item" color="#2C130D" class="white--text">Modifier<v-icon small>mdi-pencil</v-icon></v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </panel>
            </v-col>
        </v-row>
        </v-card>
    </v-app>
</template>
<script>
import subheader from '../components/global/subheader.vue'
    import panel from '../components/global/panel.vue'
    import axeServices from '../services/AxeServices'
export default {
    components:{subheader,panel},
    data(){
        return{
            loading:false,
            items:[],
            headers:[{text:'N#'},{text:"Nom de l'Axe"},{text:'Province'},{text:'Actions'}],
            search:null,
            axe:{names:null,address:null,id:null,creator:this.$store.state.id},
        }
    },
    methods:{
        async annuler(){
            this.axe={names:null,phone:null,address:null,id:null,creator:1,},
            this.loading =false
        },
        async saveAxes(){
            this.loading=true
            try{
                const response = await axeServices.register({
                    id:parseInt(this.axe.id),
                    names:this.axe.names,
                    address:this.axe.address,
                    createdby:this.axe.creator
                })
                if(response){
                    this.loading =false
                    if(this.axe.id==null){
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
                        title: `${e.response.data}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        },
    },
   async mounted(){
       this.items = (await axeServices.axes()).data
    }
}
</script>