<template>
  <div>
    <div class="content">
      <b-button class="is-warning" @click="JumpToHelloWorld">Home page</b-button>
      <div style="font-size: 24px">
        <div>first Name: {{ firstName }}</div>

        <div>last Name: {{ lastName }}</div>

        <div>email: {{ email }}</div>
        <div>phoneNumber: {{ phoneNumber }}</div>
      </div>

      <div v-if="usersEvents.length > 0">
        <div v-if="validationMessage"></div>
        <div v-if=" usersEvents.length < 2" style="color: orange">
          {{ firstName }} has {{ usersEvents.length }} event
        </div>
        <div v-if=" usersEvents.length > 1" style="color: orange">
          {{ firstName }} has {{ usersEvents.length }} events
        </div>
        <button @click="sortByEarlyStartDate">sort By Early Start Date</button>
        <button @click="sortByLateStartDate">sort By Late Start Date</button>

        <table class="users-table">
          <thead>
            <tr>
              <th>Event Number</th>
              <th>Event Title</th>
              <th>Event Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in usersEvents" :key="event._id">
              <td>{{ index + 1 }}</td>
              <td>{{ event.eventTitle }}</td>
              <td>{{ event.eventDescription }}</td>
              <td>{{ event.startDate }}</td>
              <td>{{ event.endDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="eventForm">
      <h2>Add event for {{ firstName  }}</h2>
      <b-field label="Event Title"   horizontal>
        <b-input v-model="eventTitle" maxlength="30"></b-input>
      </b-field>
      <b-field label="Event Description" horizontal>
        <b-input v-model="eventDescription" maxlength="100"></b-input>
      </b-field>

      <datepicker
        v-model="startDate"
        placeholder="Select start date"
        :disabled-dates="disabledDates"
      ></datepicker>
      <datepicker
        v-model="endDate"
        placeholder="Select end date"
        :disabled-dates="disabledDates"
      ></datepicker>

      <b-button class="is-primary" @click="addEvent">Add</b-button>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CurrentUser",
  components: {
    Datepicker,
  },
  computed: {
    ...mapGetters(["getUserById", "getUserEvents"]),
    disabledDates() {
      return {
        to: this.startDate ? new Date(this.startDate) : null,
      };
    },
    usersEvents() {
      return this.getUserEvents(this.$route.params.user_id);
    },
    userId() {
      return this.$route.params.user_id;
    },
  },

  data() {
    return {
      // id: this.$route.params.user_id,
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      hasEvent: false,
      startDate: null,
      endDate: null,
      eventTitle: null,
      eventDescription: null,
      validationMessage: null,
    };
  },

  methods: {
    ...mapActions(["updateUser", "loadData", "addEventToUser"]),

    ErrorMessageEvent() {
      this.$buefy.toast.open({
        duration: 3000,
        message: this.validationMessage,
        position: "is-bottom",
        type: "is-danger",
      });
    },

    sortByEarlyStartDate() {
    this.usersEvents.sort((a, b) => {
      if (a.startDate < b.startDate) {
        return -1;
      }
      if (a.startDate > b.startDate) {
        return 1;
      }
      return 0;
    });
  },

  sortByLateStartDate() {
    this.usersEvents.sort((a, b) => {
      if (a.startDate < b.startDate) {
        return 1;
      }
      if (a.startDate > b.startDate) {
        return -1;
      }
      return 0;
    });
  },


 
    addEvent() {
      const events = this.getUserEvents(this.userId);
      const conflictingEvents = events.filter((event) => {
        const eventStart = new Date(event.startDate).getDate();
        const eventEnd = new Date(event.endDate).getDate();
        const start = new Date(this.startDate).getDate();
        const end = new Date(this.endDate).getDate();
        return start <= eventEnd && end >= eventStart;
      });
      if (conflictingEvents.length > 0) {
        this.validationMessage = "You can't create event for this day";
        this.ErrorMessageEvent();
      } else {
        this.addEventToUser({
          userId: this.$route.params.user_id,
          eventData: {
            eventId: 'some_id',
            eventTitle: this.eventTitle,
            eventDescription: this.eventDescription,
            startDate: this.startDate,
            endDate: this.endDate,
          },
        });
      }
    },

    JumpToHelloWorld() {
      this.$router.push({
        name: "HelloWorld",
      });
    },

    CurrentUser() {
      let user = this.getUserById(this.userId);
      if (user) {
        ({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
        } = user);
        console.log("user find");
        console.log(user.phoneNumber, user.eventTitle);
      } else {
        this.JumpToHelloWorld();
        console.log("to the HelloWorld");
      }
    },
  },

  mounted() {
    this.loadData().then(this.CurrentUser());
    console.log(this.usersEvents);
  },
};
</script>

<style lang="css" scoped>
.users-table {
  width: 100%;
}

.users-table td,
tr {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

.users-table th {
  text-align: center !important;
  background-color: #aeaeae;
  border: 1px solid black;
  color: #ffffff;
}

.eventForm {
  margin: 10px;
  padding: 30px;
  display: inline-block;
  justify-content: center;
}
h2 {
  font-size: 30px;
}
button{
  margin: 10px;
  cursor: pointer;
}
</style>
