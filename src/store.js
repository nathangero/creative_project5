import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const getAuthHeader = () => {
    return {headers: {'Authorization': localStorage.getItem('token')}};
}

export default new Vuex.Store({
    state: {
        user: {},
        token: '',
        loginError: '',
        registerError: '',
        list: [],
    },
    getters: {
        user: state => state.user,
        getToken: state => state.token,
        loggedIn: state => {
            if (state.token === '') { // If the token doesn't exist,
                console.log("user isn't logged in");
                return false; // User isn't logged in
            }
            console.log("user is logged in");
            return true;
        },
        loginError: state => state.loginError,
        registerError: state => state.registerError,
        list: state => state.list,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            if (state.token === '') {
                localStorage.removeItem('token');
            }
            else {
                localStorage.setItem('token', token);
            }
        },
        setLoginError(state, message) {
            state.loginError = message;
        },
        setRegisterError(state, message) {
            state.registerError = message;
        },
        setList(state, list) {
            state.list = list;
        }
    },
    actions: {
        // Initialize
        initialize(context) {
            console.log('@initialize');
            let token = localStorage.getItem('token');
            if (token) {
                console.log('token exists');
                // see if we can use the token to get user account
                axios.get("/api/me", getAuthHeader()).then(response => {
                    console.log('auth worked');
                    context.commit('setToken', token);
                    context.commit('setUser', response.data.user);
                }).catch(err => {
                    // remove token and user from state
                    localStorage.removeItem('token');
                    context.commit('setToken', '');
                    context.commit('setUser', {});
                })
            }
        },

        // Register/Login
        register(context, user) {
            axios.post('/api/users', user).then(response => {
                context.commit('setUser', response.data.user);
                context.commit('setToken', response.data.token);
                context.commit('setLoginError', "");
                context.commit('setRegisterError', "");
            }).catch(error => {
                context.commit('setLoginError', "");
                context.commit('setUser', {});
                context.commit('setToken', '');
                if (error.response) {
                    if (error.response.status === 403) {
                        context.commit('setRegisterError', "That username is already in use");
                    }
                    return;
                }
                context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
            });
        },
        login(context, user) {
            axios.post('/api/login', user).then(response => {
                context.commit('setUser', response.data.user);
                context.commit('setToken', response.data.token);
                context.commit('setLoginError', "");
                context.commit('setRegisterError', "");
            }).catch(error => {
                context.commit('setRegisterError', "");
                context.commit('setUser', {});
                context.commit('setToken', '');
                if (error.response) {
                    if (error.response.status === 403 || error.response.status === 400)
                      context.commit('setLoginError',"Invalid login.");
                    context.commit('setRegisterError',"");
                    return;
                  }
                  context.commit('setLoginError',"Sorry, your request failed. We will look into it.");              
            });
        },
        logout(context,token) {
            context.commit('setUser', {});
            context.commit('setToken',token);
            
        },

        // Items
        getItems(context) {
            axios.get('/api/users/' + context.state.user.id + '/items').then(response => {
                context.commit('setList', response.data.items);
            }).catch(err => {
                console.log("getItems failed:",err);
            });
        },
        addItem(context, item) {
            axios.post('/api/users/' + context.state.user.id + '/items', item, getAuthHeader()).then(response => {
                return context.dispatch('getItems');
            }).catch(err => {
                console.log("addItem failed:",err);
            });
        },
        deleteItem(context, item) {
            axios.post('/api/users/' + context.state.user.id + '/items/' + item.id + '/delete', item.id, getAuthHeader()).then(response => {
                return context.dispatch('getItems');
            }).catch(err => {
                console.log("deleteItem failed:", err);
            });
        },
        editItem(context, item) {
            // don't forget authHeader in axios.post
        },

        // Search
        doSearch(context, keywords) {
            // Search for only items that the user has
            axios.get('/api/users/' + context.state.user.id + '/items/search?keywords=' + keywords).then(response => {
                context.commit('setList', response.data.items);
            }).catch(error => {
                console.log("doSearch failed:",error);
            });
        },

    }
});