<template>
    <v-app>
        <subheader title="Fonctions">
            <v-spacer></v-spacer>
            <h6>List</h6>
        </subheader>
                <v-row>
                    <v-col cols="12" md="4">
                        <panel title="Formulaire">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="user.names" dense outlined label="Noms Complets de l'Agent"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="user.status" dense outlined label="Statut de l'Agent"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn color="error" small>Annuler</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="#2C130D" small>Enregistrer</v-btn>
                            </v-card-actions>
                        </panel>
                    </v-col>
                    <v-col cols="12" md="8">
                        <panel title="Liste des Fonctions">
                            <v-card-text>
                                <v-text-field v-model="search" dense label="Recherche..."></v-text-field>
                                <v-data-table dense :headers="headers" :items="users" :search="search">
                                    <template v-slot:body="{items}">
                                        <tbody v-if="items.legnth">
                                            <tr v-for="(item,index) in items" :key="index">
                                                <td>{{++index}}</td>
                                                <td>{{item.names}}</td>
                                                <td>{{item.status}}</td>
                                                <td>
                                                    <v-btn small color="#2C130D">Modifier</v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </panel>
                    </v-col>
                </v-row>
            <!-- </v-card-text>
        </v-card> -->
    </v-app>
</template>
<script>
import panel from '../components/global/panel.vue'
import subheader  from '../components/global/subheader.vue'
export default {
    components:{
        panel,
        subheader
    },
    data(){
        return{
            search:null,
            user:{id:'',names:null,status:null},
            headers:[{text:"N"},{text:"Noms"},{text:"Etat"},{text:""}],
            items:[],
        }
    }
}
</script>