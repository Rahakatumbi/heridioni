<template>
    <v-app>
        <Panel title="">
        <v-flex>
            <v-row>
                <v-col cols="12" md="4">
                    <v-img src="@/assets/socoopher.jpeg" height="70" width="100"></v-img>
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
                        Mode de Payement: <strong>{{mode_de_payement==1?'CAD':mode_de_payement==2?'FOB':mode_de_payement==3?'CIF':mode_de_payement==4?'CFR':mode_de_payement==4?'CFR':mode_de_payement==5?'FOT':'Autre'}}</strong> <br>
                        Lieu de Livraison: <strong>{{lieu_de_livraison}}</strong><br>
                        Date: <strong>{{echeance}}</strong><br>
                        status: <strong>{{status==1?'En Entente':status==2?'En Cours':status==3?'Termine':'???'}}</strong>
                    </small>
                    </div>
                </v-col>
            </v-row>
            <v-data-table :items="stores" dense :headers="headers">
                <template v-slot:body="{items}">
                    <tbody v-if="items.length">
                        <tr v-for="(item,index) in items" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{item.produit_id==1?'Cacao':item.produit_id==2?'Caffee':item.produit_id==3?'Caouchout':'Inconnue'}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.quality}}</td>
                            <td>{{item.achat_info_id}}</td>
                            <!-- <td>{{item.quality}}</td> -->
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-flex>
        </Panel>
    </v-app>
</template>
<script>
import Panel from '../../components/global/panel.vue'
export default{
    data() {
        return {
            identify: [],
            headers: [{ text: "N#" }, { text: "Produit" }, { text: "Qte Dmd" }, { text: "Qte Servit" }, { text: "Balance" }, { text: "Prix Unitaire" }],
            
        };
    },
    computed: {
        items() {
            return this.$store.state.traitement.filter((blog)=>{
                return blog.order_id == parseInt(this.$route.params.id)
            })
        },
        stores(){
            return this.items
        }
        
    },
    components: { Panel }
}
</script>