<template>
    <div>
<div class="content">
    <div>
         {{firstName }}
    </div>
    <span>
     {{lastName }}
    </span>
    <div>
        {{email}}
    </div>
    <div>
        {{phoneNumber}}
    </div>
</div>
    </div>
</template>

<script>
    export default {
        name: "UserItem",
        props: {
    _id: {
      type: [String, Number],
      default: null,
    },
    firstName: {
      type: String,
      default: 'noname',
    },

    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: "email@mail",
    },
    phoneNumber: {
      type: String,
      default: "333",
    },
   
  },
    }
</script>

<style lang="css" scoped>

</style>