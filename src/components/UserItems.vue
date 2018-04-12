<template>
    <div class="list">
        <div>
            <form v-on:submit.prevent="item" class="itemForm">
                <textarea v-model="text" placeholder="Enter item description"/><br/>
                <div class="buttonWrap">
                    <button class="primary" type="submit">Add</button>
                </div>
            </form>
        </div>
        <div v-for="item in list" class="item">
            <p class="idline"><span class="user">{{item.name}}</span><span class="handle">@{{item.username}}</span></p>
            <p class="item">{{item.item}}</p>`
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'UserItems',
    data () {
        return {
            item: '',
        }
    },
    created: function() {
        this.$store.dispatch('getItems');
    },
    filters: {
        since: function(datetime) {
            moment.locale('en', {
	            relativeTime: {
                    future: 'in %s',
                    past: '%s',
                    s:  'seconds',
                    ss: '%ss',
                    m:  '1m',
                    mm: '%dm',
                    h:  'h',
                    hh: '%dh',
                    d:  'd',
                    dd: '%dd',
                    M:  ' month',
                    MM: '%dM',
                    y:  'a year',
                    yy: '%dY'
	            }
            });
        return moment(datetime).fromNow();
        },
    },
    computed: {
        list: function() {
            return this.$store.getters.list;
        },
   },
    methods: {
        add: function() {
            this.$store.dispatch('addItem',{
                item: this.item,
            }).then(item => {
                this.item = "";
            });
        },
    }
 }
</script>