<template>
    <nav>
        <v-app-bar app elevate-on-scroll elevation="3" dark color="#2C130D" dense flat>
            <v-app-bar-nav-icon @click="drawer=!drawer" ></v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">
                <span  class="text-uppercase">SOCOOPHER SARL</span>
                <span class="font-weight-light" ></span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span></span>
            <span>
            <v-btn @click="logout" icon color="yellow">
                <v-icon
                
                color="white"
                >
                mdi-power-standby
                <!-- mdi-account-circle -->
                </v-icon>
            </v-btn>
            </span>
        </v-app-bar>
        <v-divider></v-divider>
        <v-navigation-drawer v-model="drawer" app style="backgroung-color:#2C130D">
            <v-layout align-center column>
                <v-flex class="mt-0  ml-12  text-center">
                    <!-- <v-avatar size="100" > -->
                        <v-img src="../assets/socoopher.jpeg"  width="40%" height="70%"></v-img>
                    <!-- </v-avatar> -->
                </v-flex>
            </v-layout>
            <v-list dense>
                <v-list-item-group active-class="pink white--text text--accent-4" color="#2C130D">
                    <div>
                        <v-list-item to="/" >
                            <v-list-item-action>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Accueil</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    <v-list-group
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-action>
                                <v-icon>mdi-cellphone-cog</v-icon>
                            </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Gestion Interne</v-list-item-title>
                        </v-list-item-content>
                        </template>
                        <v-list-item
                            to="/financement"
                        >
                            <v-list-item-content>
                                <v-list-item-title>Financement</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-chart-donut</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item
                            to="/depense"
                        >
                            <v-list-item-content>
                                <v-list-item-title>Depenses</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-chart-donut</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item
                            to="/document"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    <span >Document</span>
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-chart-donut-variant</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>
                        <v-list-item to="/clients" >
                            <v-list-item-action>
                                <v-icon>mdi-account-multiple-plus</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Gestion-Client</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/order" >
                            <v-list-item-action>
                                <v-icon>mdi-abjad-hebrew</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Commandes</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/supplier" >
                            <v-list-item-action>
                                <v-icon>mdi-account-multiple</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Liste des Fermiers</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/axes" >
                            <v-list-item-action>
                                <v-icon>mdi-account-multiple</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Liste des Axes</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/banque" >
                            <v-list-item-action>
                                <v-icon>mdi-bank</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Banque</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/agents">
                        <v-list-item-action>
                                <v-icon>mdi-account-multiple</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Personnels</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                            <v-list-item
                                to="/produit"
                            >
                                <v-list-item-icon >
                                    <v-icon>mdi-chart-donut-variant</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Liste des Prouits</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item to="/stock" v-if="this.$store.state.user.role ==2">
                                <v-list-item-icon >
                                    <v-icon>mdi-reflect-horizontal</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Approvisionnement</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                    </div>  
                    <v-list-group
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-action>
                                <v-icon>mdi-cellphone-cog</v-icon>
                            </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Depots</v-list-item-title>
                        </v-list-item-content>
                        </template>
                        <v-list-item
                            to="/central"
                        >
                            <v-list-item-content>
                                <v-list-item-title>Statistique</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-chart-donut</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item
                            to="/branches"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    <span >Liste</span>
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-chart-donut-variant</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>
                    <v-list-group
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-action>
                                <v-icon>mdi-format-vertical-align-center</v-icon>
                            </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Rapport</v-list-item-title>
                        </v-list-item-content>
                        </template>

                        <v-list-item
                            to="/arapport"
                        >
                            <v-list-item-content>
                                <v-list-item-title>Approvisionnement</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-abjad-hebrew</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item
                            to="/erapport"
                        >
                            <v-list-item-content>
                                <v-list-item-title>Exportation</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-chart-donut</v-icon>
                            </v-list-item-icon>
                        </v-list-item>

                        <v-list-item
                            to="/detterapport"
                        >
                            <v-list-item-content>
                                <v-list-item-title>Payement</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon>mdi-resistor</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>
                    <div>
                        <v-list-item to="/profile">
                            <v-list-item-action>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Profile</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>  
</template>
<script>
export default {
    data(){
        return{
            drawer: null
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('setToken',null)
            this.$store.dispatch('setUser',null)
            this.$store.dispatch('setBranche',null)
            this.$router.push('/login')
        }
    }
}
</script>