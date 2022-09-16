<template>
  <div class="white">
    <v-app-bar app elevate-on-scroll elevation="3" dark color="#2C130D" flat>
            <v-toolbar-title class="white--text">
            <!-- <panel title="E-Motars"> -->
              <v-img :src="title" height="65" width="200"></v-img>
                <span class="font-weight-light" ></span>
            <!-- </panel> -->
            </v-toolbar-title>
        </v-app-bar>
  </div>
</template>

<script>
export default {
  props: [
    'title',
  ]
}
</script>

<style scoped>

.v-toolbar__content{
    height: 27px;
}
</style>
