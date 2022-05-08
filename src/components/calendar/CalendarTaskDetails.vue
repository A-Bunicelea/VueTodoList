<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <p>
        Task: <span>{{ selectedEvent.name }}</span>
      </p>
      <p>
        Starting at: <span>{{ sliceString(selectedEvent.start, "T") }}</span>
      </p>
      <p>
        Ending at: <span>{{ sliceString(selectedEvent.end, "T") }}</span>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="closeTaskDetails"> Save </v-btn>
      <v-btn text color="secondary" @click="closeTaskDetails"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["selectedElement", "selectedEvent", "selectedOpen"],
  methods: {
    closeTaskDetails() {
      this.$emit("closeTaskDetails");
    },

    sliceString(str, item) {
      let index = str.indexOf(item);
      let remainingStr = str.slice(index + 1, str.length);
      return remainingStr;
    },
  },
};
</script>

<style>
</style>