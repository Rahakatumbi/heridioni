<template>
    <v-app>
        <subheader title="Rapport d'Exportation">
                <v-spacer></v-spacer>
                <h6>HERIDIONI SARL</h6>
        </subheader>
        <panel title="Formulaire de rapports">
            <div class="ml-2 mr-2 mt-2">
                <v-row>
                    <v-col md="3" cols="12">
                        <v-select :items="types" item-value="id" item-text="text" v-model="rapport.type"
                        dense outlined label="Type" placeholder="Faire un Choix"></v-select>
                    </v-col>
                    <v-col md="9" cols="12">
                        <v-row>
                            <v-col cols="12" v-if="rapport.type" md="4">
                                <v-autocomplete dense v-model="rapport.depot_id" 
                                :items="branches"
                                item-value="id" label="Au" outlined placeholder="Client">      
                                    <template v-slot:selection="{ item }">
                                        <span>B00HR{{item.id}}</span> - <span>{{item.names}}</span>
                                    </template>
                                    <template v-slot:item="slotProps" >
                                        <span :class="['mr-2',]">B00HR{{slotProps.item.id}} {{slotProps.item.names}}</span>
                                    </template>
                                </v-autocomplete>
                            </v-col> 
                            <v-col cols="12" :md="rapport.type==1?4:6">
                                <v-text-field type="date" dense v-model="rapport.from" label="Du" outlined placeholder="A partir"></v-text-field>
                            </v-col>
                            <v-col cols="12" :md="rapport.type==1?4:6">
                                <v-text-field type="date" dense v-model="rapport.until" label="Au" outlined placeholder="Jusqu'au"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-card-actions class="mt-2">
                    <v-spacer></v-spacer>
                    <v-btn color="red"  class="white--text" @click="annuler" small>Annuler</v-btn>
                    <v-btn small color="info" @click="generate" v-if="!loading">Generer</v-btn>
                    <v-btn v-else color="info" small>
                        <Spnipperpoint></Spnipperpoint>
                    </v-btn>

                </v-card-actions>
            </div>
        </panel>
        <div class="elevation-2 mt-2">
            <div class="uppecase--text ml-2 mt-2 mr-2 mb-2">
                <span>Resultat du Rapport:</span> <span class="ml-2">Du: {{rapport.from}}{{" Au:"+rapport.until}}</span><br>
                <span><strong>Total Approvisionner: </strong><strong class="info--text">{{total}} kg(s)</strong></span><br><br>
                <v-spacer></v-spacer>
                <v-btn small color="default">Imprimer PDF</v-btn>
                <v-btn small class="ml-2" color="success">Imprimer CSV</v-btn>
            </div>
            <v-divider></v-divider>
            <v-data-table dense :headers="headers" :items="data" v-if="!loading">
                <template v-slot:body="{items}">
                    <tbody v-if="items.length">
                        <tr v-for="(item,index) in items" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{item.product}}</td>
                            <td>{{item.kgs}} kg(s)</td>
                            <td>{{item.qualite==1?'1er Qlte':'2eme Qlte'}}</td>
                            <td>{{item.price}}</td>
                            <td>{{(item.price * item.kgs)}}</td>
                            <td>{{item.client}}</td>
                            <td>{{item.createdAt}}</td>
                            <td>{{item.user}}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="10" style="text-align:center">Vide</td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
            <Snipperload align="center" v-else></Snipperload>
        </div>
    </v-app>
</template>
<script>
import Panel from '../../components/global/panel.vue'
import subheader from '../../components/global/subheader.vue'
import brancheServices from '../../services/brancheServices'
import rapportServices from '../../services/rapportServices'
import Snipperload from '../../components/global/snipperload.vue'
import Spnipperpoint from '../../components/global/spnipperpoint.vue'
export default {
    components:{ subheader, Panel, Snipperload, Spnipperpoint },
    data(){
        return{
            rapport:{type:null,from:null,until:null,depot_id:null},
            data:[],
            branches:[],
            loading:false,
            headers:[{text:'N#'},{text:'Item'},{text:'Qte'},{text:'Qualite'},{text:'P.U'},{text:'Total'},
            {text:'Client'},{text:'Date'},{text:'Fait Far'}],
            types:[{text:'General',id:null},{text:'Selon Depot',id:1}]
        }
    },
    async mounted(){
        this.branches = (await brancheServices.branches()).data
    },
    computed:{
        total(){
            return this.data.reduce((acc,item)=>acc + item.kgs,0)
        }
    },
    methods:{
        async annuler(){
            this.loading = false
            this.rapport={type:null,from:null,until:null,depot_id:null}
        },
        async generate(){
            this.loading = true
            this.data = await (await rapportServices.expedition(this.rapport)).data
            this.loading =false
        }
    },

}
</script>