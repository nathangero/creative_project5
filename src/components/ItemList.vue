<template>
  <div>
    <div v-for="item in feed" class="item">
      <p class="idline"><span class="user">{{item.name}}</span></p>
      <p class="tweet">{{item.item}}</p>
    </div>
  </div>
</template>

<script>
 import moment from 'moment';
 export default {
   name: 'ItemList',
   computed: {
     feed: function() {
       return this.$store.getters.list;
     },
   },
 }
</script>

<style scoped>
.item {
    border-bottom: 1px solid #ddd;
    padding: 10px;
}
.tweet {
    margin-top: 0px;
}
.idline {
    margin-bottom: 0px;
}
.user {
    font-weight: bold;
    margin-right: 10px;
}
.handle {
    margin-right: 10px;
    color: #666;
}
.time {
    float: right;
    color: #666;
}
</style>