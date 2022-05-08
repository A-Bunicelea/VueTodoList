<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" color="#9ca7c3">mdi-pen</v-icon>
      </template>

      <v-card class="modal-container" ma-0 pa-0>
        <v-card-title class="text-h5 white--text title-container">
          <p class="title-text">Edit Contact</p>
        </v-card-title>
        <v-card-text>
          <FormTemplate :todoItem="todoItem" @form-input="updateItem" @validate-form="validateForm"/>
        </v-card-text>

        <v-card-actions>
          <div class="btn-container">
            <v-btn color="#af7eeb" class="white--text mr-3" @click="editTodo" :disabled="!isValid">
              Save
            </v-btn>

            <v-btn color="#af7eeb" class="white--text" @click="dialog = false">
              Cancel
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormTemplate from "./FormTemplate.vue";
export default {
  name: "EditTodoModal",
  props: ["todo"],
  components: { FormTemplate },
  data() {
    return {
      isValid: false,
      dialog: false,
      todoItem: this.todo,
    };
  },

  methods: {
    validateForm(isValid) {
      this.isValid = isValid;  
      // console.log("valid fct", isValid);
      // console.log("valid data", this.isValid); 
    },

    updateItem(value) {
      this.todoItem = value;
    },

    editTodo() {
      this.dialog = false;
      this.$emit("editTodo", {
        id: this.todoItem.id,
        task: this.todoItem.task,
        deadline: this.todoItem.deadline,
        isDone: this.todo.isDone,
        startTime: this.todoItem.startTime,
        endTime: this.todoItem.endTime,
      });
    },
  },
};
</script>

<style scoped>
.modal-container {
  border-radius: none;
}

.title-container {
  background: #7953ac;
  margin: 0;
  text-align: center;
}

.v-dialog {
  border-radius: 0;
}

.v-sheet.v-card {
  border-radius: 0;
  margin: 0;
  padding: 0;
}

.title-text {
  margin: 0 auto;
  text-transform: uppercase;
}

.btn-container {
  text-align: center;
}
</style>