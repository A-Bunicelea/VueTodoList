<template>
  <v-card
    class="form-container app flat mb-5"
    tile
    max-width="600"
    elevation="0"
  >
    <v-card-text>
      <FormTemplate
        :todoItem="todoItem"
        @form-input="updateItem"
        @validate-form="validateForm"
      />
    </v-card-text>
    <v-card-actions>
      <v-row class="btn-container">
        <v-flex justify-center color="white--text">
          <v-btn
            @click.prevent="onSubmit"
            class="mb-3 add-btn white--text col-12"
            type="submit"
            color="#af7eeb"
            :disabled="!isValid"
            >Add task</v-btn
          >
        </v-flex>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import constants from "../models/constants";
import TodoItem from "../models/todoItem";
import services from "../services/services";
import FormTemplate from "./FormTemplate.vue";

export default {
  name: "AddTodoForm",
  components: { FormTemplate },
  data() {
    return {
      isValid: false,
      todoItem: new TodoItem(),
      rulesList: [],
    };
  },

  methods: {
    validateForm(isValid) {
      this.isValid = isValid;      
    },

    updateItem(value) {
      this.todoItem = value;
    },

    onSubmit() {
      if (!this.todoItem.task) {
        return;
      }

      const newTodoItem = {
        id: services.generateNewId(),
        task: this.todoItem.task,
        deadline: this.todoItem.deadline || constants.anytime,
        isDone: false,
        startTime: this.todoItem.startTime,
        endTime: this.todoItem.endTime,
      };
      this.$emit("todoAdded", newTodoItem);

      this.todoItem = new TodoItem();
    },
  },
};
</script>

<style>
.add-btn {
  margin: 0 auto;
}
.btn-container {
  margin: 0 auto;
  color: white;
  padding: 0 4px;
}

.time-container {
  display: flex;
}
</style>