<template>
  <div>
    <table class="users-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in displayedUsers"
          :key="index"
          @click="onClick(user._id)"
        >
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phoneNumber }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <div style="text-align: left; margin: 10px;" >
      <b-field>
        Users per page
        <b-numberinput v-model="pageSize" style="width: 190px"></b-numberinput>
      </b-field>
    </div>
    <div class="pagination">
      <button :disabled="currentPage <= 1" @click="prevPage">Prev</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage >= totalPages" @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UsersTable",

  computed: {
    ...mapGetters(["getUsersListData"]),
    totalPages() {
      return Math.ceil(this.getUsersListData.length / this.pageSize);
    },
    displayedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.getUsersListData.slice(start, end);
    },
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    };
  },

  methods: {
    ...mapActions(["loadData"]),
    onClick(user_id) {
      this.$router.push({
        name: "CurrentUser",
        params: { user_id },
      });
      console.log(user_id);
    },
    nextPage() {
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>
  
  <style scoped>
.users-table {
  width: 100%;
}

.users-table td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

.users-table th {
  background-color: #f2f2f2;
}

.users-table tr:hover {
  background-color: #eee995;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin-right: 100px;
  margin-left: 10px;
  cursor: pointer;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
}
.pagination button:hover {
  background-color: #eee995;
}

.pagination button:disabled {
  cursor: not-allowed;
}
</style>
  