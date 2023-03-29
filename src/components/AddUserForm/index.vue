<template>
  <div>
    <b-button class="is-warning" @click="JumpToHelloWorld">Home page</b-button>
    <h2 style="font-size: 24px">{{ AddOrEditTitle }}</h2>
    <div class="formContent">
      <b-field label="First Name" horizontal>
        <b-input v-model="firstName" maxlength="30"></b-input>
      </b-field>
      <b-field label="Last Name" horizontal>
        <b-input v-model="lastName" maxlength="30"></b-input>
      </b-field>
      <b-field label="email" horizontal>
        <b-input v-model="email" maxlength="30"></b-input>
      </b-field>
      <b-field label="Phone number" horizontal>
        <b-input v-model="phoneNumber" maxlength="30"></b-input>
      </b-field>

      <!-- <span> First Name <b-input v-model="firstName" maxlength="30"/></b-input> </span>
      <span> Last Name <input v-model="lastName" maxlength="30" /> </span>
      <span> Email <input v-model="email" maxlength="30" /> </span>
      <span> Phone number <input v-model="phoneNumber" maxlength="17" /> </span> -->
    </div>
    <b-button class="is-primary" @click="onAdd">{{ buttonTitle }}</b-button>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddUserForm",
  components: {
    Datepicker,
  },
  computed: {
    ...mapGetters(["getUserById", "getUsersListData", "getUserEvents"]),
    userId() {
      if (this.$route.params.user_id === "new") return null;
      else return this.$route.params.user_id;
    },
    buttonTitle() {
      if (this.userId) return "save edition";
      else return "add new user";
    },
    AddOrEditTitle() {
      if (this.userId) return "Edit user";
      else return "Add user";
    },
    UsersEvents() {
      return this.getUserEvents(this.$route.params.user_id);
    },
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
    };
  },
  methods: {
    ...mapActions(["addNewUser", "updateUser", "loadData"]),

    onAdd() {
      if (!this.userId) {
        this.addNewUser({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
        });
      } else {
        this.updateUser({
          _id: this.userId,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,

          events: this.UsersEvents,
        });
      }
    },
    JumpToHelloWorld() {
      this.loadData();
      this.$router.push({
        name: "HelloWorld",
      });
    },
  },
  mounted() {
    this.loadData();
    if (this.userId) {
      var user = this.getUserById(this.userId);
      (this.firstName = user.firstName),
        (this.lastName = user.lastName),
        (this.email = user.email),
        (this.phoneNumber = user.phoneNumber);
    } else {
      console.log("no userId");
    }
  },
};
</script>

<style lang="css" scoped>
.eventForm {
  padding: 10px;
  width: 50%;
  margin: 10px;
}

* {
  margin: 3px;
}
.formContent {
  max-width: 500px;
  margin: auto;
}
</style>