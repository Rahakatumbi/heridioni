<template>
    <v-app>
        <subheader title="Succursales"></subheader>
        <v-row>
            <v-col cols="12" md="4">
                <panel title="Formulaire">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-autocomplete :items="axes" item-value="id" item-text="names" label="Axe du Depot" outlined dense v-model="branche.axe_id"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field label="Nom du Depot" outlined dense v-model="branche.names"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-autocomplete :items="agents" item-value="id" item-text="names" label="chef de Depot" outlined dense v-model="branche.chef_id"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field label="Telephone du Depot" outlined dense v-model="branche.phone"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-select :items="status" item-text="text" item-value="id" label="Etat du Depot" outlined dense v-model="branche.status"></v-select>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-textarea label="Addresse Physique du Depot" outlined dense v-model="branche.address"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="error" small>Annuler</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="#2C130D accent-4" @click="saveBranche" small>Ajouter</v-btn>
                    </v-card-actions>
                </panel>
            </v-col>
            <v-col md="8" cols="12">
                <panel :title="`Liste de Depots`">
                    <v-text-field label="search" class="mt-4 mr-2 ml-2" v-model="search" dense></v-text-field>
                    <v-data-table :items="items.slice().reverse()" dense :headers="headers" :search="search">
                        <template v-slot:body="{items}">
                            <tbody v-if="items.length">
                                <tr v-for="(item,index) in items" :key="index">
                                    <td>{{++index}}</td>
                                    <td>{{item.names}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{item.stock}}</td>
                                    <td>
                                        <v-btn x-small color="yellow accent-4">Details</v-btn>
                                        <v-btn x-small color="#2C130D accent-4" @click="branche=item">Modifier</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </panel>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import panel from '../components/global/panel.vue'
import subheader  from '../components/global/subheader.vue'
import AxeServices from '../services/AxeServices'
import brancheService from '../services/brancheServices'
import userServices from '../services/userServices'
export default {
    components:{
        subheader,
        panel
    },
    data(){
        return{
            branche:{id:null,names:null,address:null,chef_id:null,status:null,phone:null,axe_id:null,creator:this.$store.state.user.id},
            dialog:false,
            search:null,
            items:[],
            axes:[],
            users:[],
            headers:[{text:"N#"},{text:"Branche"},{text:"Addresse"},{text:"Stocks"},{text:"Actions"}],
            status:[{text:'Operationnel',id:1},{text:'Desactiver',id:2}],
        }
    },
    computed:{
        agents(){
            return this.users.filter((blog)=>{
                return blog.role==2
            })
        }
    },
    methods:{
        async annuler(){
            this.branche={id:null,names:null,address:null,chef_id:null,status:null,phone:null,axe_id:null,creator:this.$store.state.user.id}
        },
        async saveBranche(){
            try{
                const response = await brancheService.register(this.branche)
                if(response){
                    this.annuler()
                    this.$swal.fire({
                        icon: 'success',
                        title: `L'operation a reussit.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    if(this.branche.id==null){this.items.push(response.data)}
                }
            }catch(e){
                    this.$swal.fire({
                        icon: 'error',
                        title: `Il y a une erreur!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        }
    },
    async mounted(){
        this.items = (await brancheService.branches()).data
        this.axes = (await AxeServices.axes()).data
        this.users = (await userServices.display()).data
    }
}
</script>