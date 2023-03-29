<template>
  <div class="hello">
    <h1 style="font-size: 24px;">{{ msg }}</h1>
    <users-table/>
    <!-- <user-list/> -->
  <br>
    <b-button class="is-success" @click="JumpToAddUserForm">
      add new user
    </b-button>
    <b-button class="is-warning" @click="JumpToEditUserPage">
      edit users page
    </b-button>
   
    
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserList from './UserList'
import UsersTable from './UsersTable'
export default {
  name: 'HelloWorld',
  components: {
    // New,
    UserList,
    UsersTable
  },
  data () {
    return {
      msg: 'Users list'
    }
  },
  computed: {
    ...mapGetters(['getUsersListData'])
  },
  methods: {
    onClick(user_id) {
      this.$router.push({
        name: "CurrentUser",
        params: {user_id}
      })
      console.log(user_id);
    },
    JumpToAddUserForm() {
      this.$router.push({
        path: '/add-user/new',
      });
    },
    JumpToEditUserPage() {
      this.$router.push({
        name: "EditUserPage",
      });
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
