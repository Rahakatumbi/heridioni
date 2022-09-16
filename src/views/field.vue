<template>
    <v-app>
        <Subheader title="Champs">
            <v-spacer></v-spacer>
            <h6>ETS. Heridioni</h6>
        </Subheader>
        <v-card tile>
                <v-card-actions>
                    <div v-for="item in items.slice(-1)" :key="item.id">
                        <span>Nom du Fermier: <strong class=""><span>{{item.supplier.names}}</span></strong></span><br>
                        <span>Addresse du Fermier: <strong class=""><span>{{item.supplier.address}}</span></strong></span><br>
                        <v-spacer></v-spacer>
                        <span>Numero de telephone du Fermier: <strong class=""><span>{{item.supplier.phone}}</span></strong></span><br>
                        <span>Email du Fermier: <strong class=""><span>{{item.supplier.email}}</span></strong></span><br>
                        <span>Code du Fermier: <strong class=""><span>{{item.supplier.code}}</span></strong></span><br>
                    </div>
                    <v-spacer></v-spacer>
                </v-card-actions>
            <v-card-text>
                <br>
                <Panel :title="`Liste des Champs`">
                    <v-card-text>
                        <v-text-field dense v-model="search" label="Recherche..." placeholder="Taper la Locatlite du Champs"></v-text-field>
                        <v-data-table dense :items="items.slice().reverse()" :headers="headers" :search="search">
                            <template v-slot:body="{items}">
                                <tbody v-if="items.length">
                                    <tr v-for="(item,index) in items" :key="index">
                                        <td>{{++index}}</td>
                                        <td>{{item.axe.names}}</td>
                                        <td>{{item.axe.address}}</td>
                                        <td>{{item.size}}</td>
                                        <td>{{item.plante}}</td>
                                        <td>{{item.adelivrer}}</td>
                                        <td>{{item.user.names}}</td>
                                        <td>
                                            <v-btn x-small color="info">Afficher</v-btn>
                                            <v-btn x-small color="#2C130D" class="white--text">Modifier</v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </Panel>
            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
import Subheader from '../components/global/subheader.vue';
import Panel from '../components/global/panel.vue';
import champServices from '../services/champServices';
export default {
    components: { Subheader, Panel },
    data(){
        return{
            search:null,
            items:[],
            headers:[{text:'N#'},{text:'Axe'},{text:'Province'},{text:'Superficie'},{text:'Nombre de Plantes'},{text:'Plante A Servir'},{text:'Creer Par'},{text:'Actions'}]
        }
    },
    async mounted(){
        this.items = (await champServices.field(this.$route.params.id)).data
    }
}
</script>