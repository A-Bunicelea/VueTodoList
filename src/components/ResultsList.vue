<template>
  <v-container app class="results-container mb-5">
    <v-card-title class="grey--text results-container-title">
      <p>{{ title }}</p>
    </v-card-title>

    <v-layout v-if="showTableHeader == 'true'" class="px-3 mx-0 mb-3 text-left">
      <v-flex class="title-col my-auto pl-4" xs4 sm4 md4>Task</v-flex>
      <v-flex
        v-if="overdue == 'true'"
        class="title-col my-auto text-center"
        xs3
        sm3
        md3
        >Deadline</v-flex
      >
      <v-flex class="title-col my-auto text-center" xs3 sm3 md3
        >Starting</v-flex
      >
      <v-flex
        v-if="overdue == 'false'"
        class="title-col my-auto text-center"
        xs3
        sm3
        md3
        >Ending</v-flex
      >
      <v-flex class="title-col" xs1 sm1 md1></v-flex>
      <v-flex class="title-col" xs1 sm1 md1></v-flex>
    </v-layout>
    <div v-if="leftTodo == 'false'">
      <v-card
        v-for="todo in todoList"
        :key="todo.id"
        class="task-card flat"
        tile
        elevation="0"
      >
        <TaskContainer
          :todo="todo"
          @toggleDone="toggleDone(todo)"
          @handleDelete="handleDelete(todo)"
          :overdue="overdue"
          :showStartTime="showStartTime"
          :showEndTime="showEndTime"
        />
      </v-card>
    </div>

    <!-- DE AICI INCEPE LISTA -->

    <v-container v-if="leftTodo == 'true'">
      <div v-for="(value, key) in groupedList" :key="key">
        <v-layout class="px-3 mx-0 mb-3 text-left">
          <v-flex
            class="title-col my-auto pl-4 pt-4 section-title"
            xs12
            sm12
            md12
            >{{ key }}
          </v-flex>
        </v-layout>

        <v-card
          v-for="todo in value"
          :key="todo.id"
          class="task-card flat"
          tile
          elevation="0"
        >
          <TaskContainer
            :todo="todo"
            @toggleDone="toggleDone(todo)"
            @handleDelete="handleDelete(todo)"
            :overdue="overdue"
            :showStartTime="showStartTime"
            :showEndTime="showEndTime"
          />
        </v-card>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import TaskContainer from "./TaskContainer.vue";
export default {
  
  components: { TaskContainer },
  props: [
    "todoList",
    "title",
    "overdue",
    "showTableHeader",
    "leftTodo",
    "showStartTime",
    "showEndTime",
  ],
  methods: {
    toggleDone(todoItem) {
      this.$emit("toggleDone", todoItem);
    },
    handleDelete(todoItem) {
      this.$emit("handleDelete", todoItem);
    },
    compare(a, b) {
      if (a.deadline < b.deadline) {
        return -1;
      }
      if (a.deadline > b.deadline) {
        return 1;
      }
      return 0;
    },
  },
  computed: {
    groupedList: function () {
      let list = this.todoList;
      list.sort(this.compare);
      let listGroups = {};

      list.forEach((item) => {
        let group = listGroups[item.deadline];
        if (group) {
          group.push(item);
        } else {
          listGroups[item.deadline] = [item];
        }
      });

      return listGroups;
    },
  },
};
</script>


<style scoped>
.results-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
}

.results-container-title {
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0 20px 0;
}

.results-container-title p {
  margin: 0 auto;
  color: #7953ac;
  text-transform: uppercase;
}

.title-col {
  color: #9ca7c3;
  font-size: 1rem;
  font-weight: bold;
}

.section-title {
  color: #7953ac;
  font-size: 1.2rem;
}
</style>