<template>
  <div>
    <h2>Edit users page</h2>
    <button @click="JumpToHelloWorld">Go to the HelloWorld</button>
    <table class="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in getUsersListData" :key="user.index" class="content">
          <td>{{ user.firstName }}</td>
          <td><button @click="onEdit(user._id)">edit</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditUserPage",
  computed: {
    ...mapGetters(["getUsersListData"]),
  },
  methods: {
    ...mapActions(["loadData"]),

    onEdit(_id) {
      this.$router.push({
        name: 'UpdateUserForm',
        params: { user_id: _id },
      });
    },
    JumpToHelloWorld() {
      this.loadData()
      this.$router.push({
        name: "HelloWorld",
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="css" scoped>
.user-table {
  border-collapse: collapse;
  width: 300px;
  margin: 0 auto; 
  margin-top: 10px;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
}
</style>
