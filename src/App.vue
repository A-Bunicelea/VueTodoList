<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view :todoList="todoList" />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import services from "./services/services";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      todoList: [],
    };
  },

  mounted() {
    this.todoList = services.getTodoList();
  },
};
</script>

<style>
#app {
  background: #e3e9ff;
}
</style>