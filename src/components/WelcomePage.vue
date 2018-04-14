<template>
  <div class="column">
    <h1>Keep track of all your stuff!</h1>
    <h2>Never forget what you own ever again!</h2>
    <form v-on:submit.prevent="register">
      <p>1. Choose a user name</p>
      <input class="narrow" v-model="username" placeholder="Username">
      <p>2. Create an account.</p>
      <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
      <input class="narrow" type="password" v-model="password" placeholder="Password">
      <button class="alternate" type="submit">Register</button>
    </form>
    <p class="error">{{registerError}}</p>
  </div>
</template>

<script>
export default {
    name: 'WelcomePage',
    data () {
        return {
            username: '',
            password: '',
            name: '',
        }
   },
    computed: {
        registerError: function() {
            return this.$store.getters.registerError;
        },
    },
    methods: {
        register: function() {
            this.$store.dispatch('register',{
	            username: this.username,
                password: this.password,
	            name: this.name,
            });
        }
    }
}
</script>

<style scoped>
img {
    width: 100px;
}

h1 {
    margin-bottom: 0px;
}
h2 {
    margin-top: 0px;
    font-size: 1.2em;
    font-weight: normal;
    margin-bottom: 50px;
}
.narrow {
    width: 170px;
}
.wide {
    width: 370px;
}
</style>