<template>
  <div>
    <div v-if="loggedIn">
      <user-items/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import UserItems from './UserItems';
 export default {
   name: 'HomePage',
   components: {WelcomePage, UserItems},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>