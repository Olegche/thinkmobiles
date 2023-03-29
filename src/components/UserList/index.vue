<template>
  <div>
    <div class="content">
      <user-item
      v-for="user in getUsersListData"
       :key="user.index"
       :firstName="user.firstName"
       :lastName="user.lastName"
       :email="user.email"
       :phoneNumber="user.phoneNumber"
       />
     
    </div>
  </div>
</template>

<script>
import UserItem from './UserItem'
import { mapGetters } from 'vuex';
export default {
  name: "UserList",
  components: {
    UserItem,
  },
  computed: {
    ...mapGetters(["getUsersListData"]),
  },
};
</script>

<style lang="css" scoped>
</style>