<template>
  <v-container app mt-10>
    <v-card
      class="card-container flat"
      tile
      color="#7953ac"
      max-width="600"
      elevation="0"
    >
      <v-card-text class="white--text"
        ><p class="display-1 text-center ma-0">TODO LIST</p></v-card-text
      >
      <!-- <v-spacer></v-spacer> -->
      <template>
        <v-tabs
          class="tabs-container"
          centered
          slider-color="#7953ac"
          background-color="#fff"
          color="#7953ac"
        >
          <v-tab to="/">Dashboard</v-tab>
          <v-tab to="/mylist">MyList</v-tab>
          <v-tab to="/calendar">Calendar</v-tab>
        </v-tabs>
      </template>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.tabs-container {
  color: #7953ac;
}
</style>