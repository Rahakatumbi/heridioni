<template>
    <v-app>
        <subheader title="Depot Central"></subheader>
        <depotcentral/>
    </v-app>
</template>
<script>
import subheader  from '../components/global/subheader.vue'
import depotcentral from '../components/central.vue'
export default {
    components:{
        subheader,
        depotcentral
    }
}
</script>