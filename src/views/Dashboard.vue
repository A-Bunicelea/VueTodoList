<template>
  <v-container class="app dashboard-container">
    <ResultsList
      title="Tasks for today"
      :todoList="doToday"
      @toggleDone="toggleDone"
      @handleDelete="handleDelete"
      overdue="false"
      showTableHeader="true"
      leftTodo="false"
      showStartTime="true"
      showEndTime="true"
    />

    <ResultsList
      title="Left to do anytime"
      :todoList="doAnytime"
      @toggleDone="toggleDone"
      @handleDelete="handleDelete"
      overdue="false"
      showTableHeader="false"
      leftTodo="false"
      showStartTime="true"
      showEndTime="true"
    />
  </v-container>
</template>

<script>
import constants from "../models/constants.js";
import ResultsList from "../components/ResultsList.vue";
import services from "../services/services";
export default {
  props: ["todoList"],
  components: { ResultsList },
  computed: {
    doAnytime: function () {
      let newTodoList = this.todoList
        .filter((todo) => todo.deadline === constants.anytime)
        .sort(function (todo, nextTodo) {
          if (todo.startTime > nextTodo.startTime) return 1;
          if (todo.startTime < nextTodo.startTime) return -1;
          return 0;
        });

      return newTodoList;
    },

    doToday: function () {
      let date = new Date().toJSON().slice(0, 10);
      let newTodoList = this.todoList
        .filter((todo) => todo.deadline === date)
        .sort(function (todo, nextTodo) {
          if (todo.startTime > nextTodo.startTime) return 1;
          if (todo.startTime < nextTodo.startTime) return -1;
          return 0;
        });
      return newTodoList;
    },
  },
  methods: {
    // refreshTodoList() {
    //   this.$emit("refreshTodoList");
    // },
    handleDelete(todoItem) {
      // this.$emit("handleDelete", todoItem);
      services.deleteTodo(todoItem);
    },

    toggleDone(todoItem) {
      // this.$emit("toggleDone", todoItem);
      services.toggleDone(todoItem);
    },

    getCurrentTime() {
      let date = new Date();
      let time = date.getHours() + ":" + date.getMinutes();
      return time;
    },
  },
};
</script>

<style>
.card-container {
  margin: 0 auto;
}
</style>