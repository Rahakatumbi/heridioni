<template>
    <v-subheader>
        <h3>{{title}}</h3>
        <slot name="action" />
        <v-spacer></v-spacer>

        <div>
        <slot>
            HERIDIONI SARL
        </slot>
        </div>
    </v-subheader>
</template>
<script>
export default {
    props:[
        'title'
    ]
}
</script>