import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        loggedIn: false,
        loginError: '',
        registerError: '',
        list: [],
    },
    getters: {
        user: state => state.user,
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
        registerError: state => state.registerError,
        list: state => state.list,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLogin(state, status) {
            state.loggedIn = status;
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
        // Register/Login
        register(context, user) {
            axios.post('/api/users', user).then(response => {
                context.commit('setUser', response.data.user);
                context.commit('setLogin', true);
                context.commit('setLoginError', "");
                context.commit('setRegisterError', "");
            }).catch(error => {
                context.commit('setLoginError', "");
                context.commit('setLogin', false);
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
                context.commit('setLogin', true);
                context.commit('setLoginError', "");
                context.commit('setRegisterError', "");
            }).catch(error => {
                context.commit('setRegisterError', "");
                if (error.response) {
                    if (error.response.status === 403 || error.response.status === 400)
                      context.commit('setLoginError',"Invalid login.");
                    context.commit('setRegisterError',"");
                    return;
                  }
                  context.commit('setLoginError',"Sorry, your request failed. We will look into it.");              
            });
        },
        logout(context,user) {
            context.commit('setUser', {});
            context.commit('setLogin',false);
            
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
            axios.post('/api/users/' + context.state.user.id + '/items', item).then(response => {
                return context.dispatch('getItems');
            }).catch(err => {
                console.log("addItem failed:",err);
            });
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