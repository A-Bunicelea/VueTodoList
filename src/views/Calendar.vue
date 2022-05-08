<template>
  <v-row class="fill-height">
    <v-col>
      <CalendarHeader
        @prev="prev"
        @next="next"
        :calendar="$refs.calendar"
        @setToday="setToday"
        @changeType="changeType"
      />

      <!-- CALENDAR CONTAINER -->
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          event-overlap-mode="stack"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>

        <!-- POP-UP TASK DETAILS-->
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          class="c-menu"
        >
          <CalendarTaskDetails
            :selectedElement="selectedElement"
            :selectedEvent="selectedEvent"
            @closeTaskDetails="closeTaskDetails"
            :selectedOpen="selectedOpen"
          />
        </v-menu>
        <!-- END OF POP-UP TASK DETAILS-->

        <!-- :selectedOpen="selectedOpen" -->
      </v-sheet>
      <!-- END OF CALENDAR CONTAINER -->
    </v-col>
  </v-row>
</template>

<script>
import constants from "../models/constants";
import services from "../services/services";
import CalendarHeader from "../components/calendar/CalendarHeader.vue";
import CalendarTaskDetails from "../components/calendar/CalendarTaskDetails.vue";
export default {
  components: { CalendarHeader, CalendarTaskDetails },
  data: () => ({
    todoList: [],
    focus: "",
    type: "month",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),

  mounted() {
    // se executa dupa updateRange() ??
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    getEventColor(event) {
      return event.color;
    },

    setToday() {
      this.focus = "";
    },

    prev() {
      this.$refs.calendar.prev();
    },

    next() {
      this.$refs.calendar.next();
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        // requestAnimationFrame(() =>
        //   requestAnimationFrame(() => (this.selectedOpen = true))
        // );
        this.selectedOpen = true;
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        // requestAnimationFrame(() => requestAnimationFrame(() => open()));
        open();
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },

    updateRange() {
      this.todoList = services.getTodoList();
      let events = [];

      this.todoList.forEach((todo) => {
        if (todo.deadline !== constants.anytime) {
          let start = todo.deadline;
          let end = todo.deadline;
          if (!todo.deadline.includes("T") && todo.startTime && todo.endTime) {
            start = `${todo.deadline}T${todo.startTime}`;
            end = `${todo.deadline}T${todo.endTime}`;
          }

          events.push({
            name: todo.task,
            start: start,
            end: end,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
          });
        }
      });
      this.events = events;
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    closeTaskDetails() {
      this.selectedOpen = !this.selectedOpen;
    },

    changeType(item) {
      this.type = item;
    },
  },
};
</script>

<style>
.v-calendar-daily__day-interval {
  /* border: 2px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>