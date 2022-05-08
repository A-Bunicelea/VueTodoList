<template>
  <v-form ref="form" v-model="validForm">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            label="Task Description"
            placeholder="E.g. Go grocery shopping"
            class="my-input mb-3"
            autocomplete="off"
            :value="task"
            @input="onUpdateTask"
            :rules="rules.taskRules"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            label="Deadline"
            type="date"
            class="my-input mb-3"
            :value="deadline"
            :clearable="true"
            @input="onUpdateDeadline"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Start Time"
            type="time"
            :value="startTime"
            @input="onUpdateStartTime"
            :disabled="!deadline"
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="End Time"
            type="time"
            :value="endTime"
            @input="onUpdateEndTime"
            :disabled="!deadline || !startTime"
            :rules="rules.endTimeRules"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ["todoItem"],

  data() {
    return {
      validForm: true,
      rules: {
        taskRules: [
          (value) =>
            (value && value.length >= 3) || "Minimum length is 3 characters",
        ],

        endTimeRules: [
          (value) =>
            !value ||
            value > this.startTime ||
            "The ending time must be less than the starting time",
        ],
      },
    };
  },

  computed: {
    task: function () {
      return this.todoItem ? this.todoItem.task : "";
    },
    deadline: function () {
      return this.todoItem ? this.todoItem.deadline : "";
    },
    startTime: function () {
      return this.todoItem ? this.todoItem.startTime : "";
    },
    endTime: function () {
      return this.todoItem ? this.todoItem.endTime : "";
    },
  },

  watch: {
    validForm() {
      console.log("form valid template", this.validForm);
      this.isValid();
    },
  },

  methods: {
    isValid() {
      console.log("form valid", this.validForm)
      this.$emit("validate-form", this.validForm);
    },

    onUpdateTask(value) {
      // setTimeout(() => {
      //   console.log("ASYNC FORM", this.validForm);
      // }, 200);

      // console.log("FORM ", this.validForm);
      let newItem = { ...this.todoItem, task: value };
      this.$emit("form-input", newItem);
    },

    onUpdateDeadline(value) {
      let newItem = { ...this.todoItem, deadline: value };
      if (!value) {
        newItem.startTime = "";
        newItem.endTime = "";
      }
      this.$emit("form-input", newItem);
    },

    onUpdateStartTime(value) {
      let newItem = { ...this.todoItem, startTime: value };
      if (!value) {
        newItem.endTime = "";
      }
      this.$emit("form-input", newItem);
    },

    onUpdateEndTime(value) {
      let newItem = { ...this.todoItem, endTime: value };
      this.$emit("form-input", newItem);
    },
  },
};
</script>

<style>
</style>