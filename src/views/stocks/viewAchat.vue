<template>
    <v-app>
        <subheader title="Detail d'Approvisionnement"></subheader>
        <panel :title="`Approvisionnement ${achat.code }`">
            <v-flex class="mr-2 ml-2 mt-1">
                <div class="mt-2 ml-2 mb-4">
                    <h6>Infos</h6>
                        <small>
                            Fermier: <strong>{{achat.fermier}}</strong> <br>
                            Branche: <strong>{{achat.branche}}</strong><br>
                            Fait Par: <strong>{{achat.names}}</strong>
                        </small>
                </div>
            </v-flex>
            <v-divider></v-divider>
                <v-flex m-r2 ml-2 mt-2>
                    <v-simple-table dense id="table">
                        <template v-slot:default>
                             <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <td>Qualite</td>
                                    <th>Qte</th>
                                    <th>Montant</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                        <tbody v-if="items.length">
                            <tr v-for="(item,index) in items" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{item.product}}</td>
                                <td>{{item.quality}}</td>
                                <td>{{item.quantity}} Kg(s)</td>
                                <td>${{item.price}}</td>
                                <td>${{(item.price * item.quantity)}}</td>
                            </tr>
                            <tr>
                                <td colspan="3">Total</td>
                                <td>{{itemKgs}} Kg(s)</td>
                                <td>${{unitprice}}</td>
                                <td>${{total}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr v-if="loading">
                             <Spnipperpoint align="center"></Spnipperpoint>
                            </tr>
                            <tr v-else>
                                <td colspan="6" style="text-align:center;">Pas de donnees</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-flex>
        </panel>
    </v-app>
</template>
<script>
import subheader from '../../components/global/subheader.vue'
import panel from '../../components/global/panel.vue'
import stockServices from '../../services/stockServices'
import Spnipperpoint from '../../components/global/spnipperpoint.vue'
export default {
    components:{ subheader, panel, Spnipperpoint },
    data(){
        return{
            items:[],
            loading:false
        }
    },
    computed:{
        total(){
            return this.items.reduce((acc,item)=>acc + item.price * item.quantity,0)
        },
        achat(){
            return this.$store.state.achat
        },
        itemKgs(){
           return this.items.reduce((acc,item)=>acc + parseFloat(item.quantity),0) 
        },
        unitprice(){
            return this.items.reduce((acc,item)=>acc + parseFloat(item.montant),0)
        },

    },
   async mounted(){
    this.items = (await stockServices.achatDetails(this.$route.params.id)).data
   } 
}
</script>
