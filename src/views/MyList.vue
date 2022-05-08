<template>
  <div class="mylist-container mt-3 app">
    <AddTodoForm @todoAdded="todoAdded" />

    <ResultsList
      title="Left to do"
      :todoList="tasksTodo"
      @toggleDone="toggleDone"
      @handleDelete="handleDelete"
      overdue="false"
      showTableHeader="false"
      leftTodo="true"
      showStartTime="true"
      showEndTime="true"
    />

    <ResultsList
      title="Overdue"
      :todoList="overdueTasks"
      @toggleDone="toggleDone"
      @handleDelete="handleDelete"
      overdue="true"
      showTableHeader="true"
      leftTodo="false"
      showStartTime="true"
      showEndTime="false"
    />
  </div>
</template>

<script>
import AddTodoForm from "../components/AddTodoForm.vue";
import ResultsList from "../components/ResultsList.vue";
import services from "../services/services";
export default {
  name: "MyList",
  props: ["todoList"],
  components: { AddTodoForm, ResultsList },
  methods: {
    todoAdded(todoItem) {
      services.addTodo(todoItem);
    },

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

    sortList(list) {
      list.sort(function (todo, nextTodo) {
        if (todo.deadline > nextTodo.deadline) return 1;
        if (todo.deadline < nextTodo.deadline) return -1;

        if (todo.deadline === nextTodo.deadline) {
          if (todo.startTime > nextTodo.startTime) {
            return 1;
          } else {
            return -1;
          }
        }
      });

      return list;
    },
  },

  computed: {
    tasksTodo: function () {
      let date = new Date().toJSON().slice(0, 10);
      let currentTime = this.getCurrentTime();
      let newTodoList = this.todoList.filter((todo) => {
        if (todo.deadline > date) {
          return true;
        } else if (todo.deadline === date) {
          if (todo.startTime >= currentTime) {
            return true;
          }
        } else {
          return false;
        }
      });

      this.sortList(newTodoList);

      return newTodoList;
    },

    overdueTasks: function () {
      let date = new Date().toJSON().slice(0, 10);
      let time = this.getCurrentTime();
      let newTodoList = this.todoList.filter((todo) => {
        if (todo.deadline < date) {
          return todo.deadline;
        } else if (todo.deadline === date) {
          if (todo.startTime < time) {
            return todo;
          } else {
            return;
          }
        }
      });

      this.sortList(newTodoList).reverse();
      return newTodoList;
    },
  },
};
</script>

<style>
.mylist-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>