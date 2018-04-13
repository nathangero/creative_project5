<template>
    <nav>
        <ul id="menu">
            <li v-if="loggedIn"><router-link to="/">My Stuff</router-link></li>
            <li v-else><router-link to="/">Home</router-link></li>
            <li v-if="loggedIn">
                <form v-on:submit.prevent="search">
                <input v-model="keywords" placeholder="Search">
                <a href="#" v-on:click="search" class="search"><i class="fas fa-search"></i></a>
                </form>
            </li>
            <li class="right" v-if="loggedIn"><a @click="logout" href="#">Logout</a></li>
            <li class="right" v-if="loggedIn">{{user.name}}</li>
            <li class="right" v-else>
            <form v-on:submit.prevent="login">
                <input v-model="username" placeholder="Username">
                <input v-model="password" type="password" placeholder="Password">
                <button class="primary" type="submit">Login</button>
            </form>
            </li>
        </ul>
        <div class="flexWrapper errorPlace">
        <p v-if="loginError" class="flexRight error">{{loginError}}</p>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'AppHeader',
    data () {
        return {
            username: '',
            password: '',
            keywords: '',
        }
    },
    computed: {
        user: function() {
            return this.$store.getters.user;
        },
        loggedIn: function() {
            return this.$store.getters.loggedIn;
        },
        loginError: function() {
            return this.$store.getters.loginError;
        },
    },
    methods: {
        login: function() {
            this.$store.dispatch('login',{
                username: this.username,
                password: this.password,
            }).then(user => {
                this.username = '';
                this.password = '';
            });
        },
        logout: function() {
            this.$store.dispatch('logout');
            this.$router.push({path: '/'}); // Brings user back to homepage 
        },
        search: function() {
            this.$router.push({path: '/search', query: { keywords: this.keywords }});
            this.keywords = ''; // Empty the keywords after use
        }
    }
}
</script>

<style scoped>
 /* Strip the ul of padding and list styling */
 nav {
     display: grid;
     margin-bottom: 20px;
 }
 ul {
     list-style-type:none;
     margin:0;
     padding:0;
 }
 /* Create a horizontal list with spacing */
 li {
     display:inline-block;
     float: left;
     margin-right: 20px;
     height: 50px;
     text-align: center;
     line-height: 50px;
     color: #666;
 }
 .right {
     float: right;
 }
 .errorPlace {
     height: 20px;
 }
 img {
     width: 50px;
 }
 input {
     height: 0.5em;
 }
 .search {
     margin-left: 5px;
 }
</style>