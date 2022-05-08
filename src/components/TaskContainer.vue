<template>
  <v-layout app row wrap class="pa-3 task-container mx-0 mb-3">
    <v-flex xs4 sm4 md4 class="my-auto">
      <input
        type="checkbox"
        id="todo-item"
        :checked="todo.isDone"
        @click="toggleDone()"
        class="ml-4 solo"
      />
      <label for="todo-item" class="ml-2">
        {{ todo.task }}
      </label>
    </v-flex>

    <v-flex v-if="overdue == 'true'" xs3 sm3 md3 class="text-center my-auto">
      <span>{{ todo.deadline }}</span>
    </v-flex>

    <v-flex
      v-if="showStartTime == 'true'"
      xs3
      sm3
      md3
      class="text-center my-auto"
    >
      <span>{{ todo.startTime }}</span>
    </v-flex>

    <v-flex
      v-if="showEndTime == 'true'"
      xs3
      sm3
      md3
      class="text-center my-auto"
    >
      <span>{{ todo.endTime }}</span>
    </v-flex>

    <v-flex xs1 sm1 md1 class="text-right my-auto">
      <div class="right">
        <EditTodoModal
          :todo="todo"
          @editTodo="editTodo"
          @form-input="updateItem"
        />
      </div>
    </v-flex>

    <v-flex xs1 sm1 md1 class="text-center my-auto">
      <div class="right">
        <v-icon @click="handleDelete()" color="#9ca7c3">mdi-delete</v-icon>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import services from "../services/services";
import EditTodoModal from "./EditTodoModal.vue";

export default {
  name: "TaskContainer",
  props: ["todo", "overdue", "showStartTime", "showEndTime"],
  components: { EditTodoModal },
  methods: {
    toggleDone(todoItem) {
      this.$emit("toggleDone", todoItem);
    },

    handleDelete(todoItem) {
      this.$emit("handleDelete", todoItem);
    },

    editTodo(todoItem) {
      services.updateItem(todoItem);
    },

    updateItem(value) {
      this.todoItem = value;
    },
  },
};
</script>

<style>
.task-container {
  color: #9ca7c3;
  font-size: 1.2rem;
  border: transparent;
  border-radius: none;
}
</style>