<template>
  <div>
    <div v-for="item in feed" class="item">
      <p class="idline"><span class="itemName">{{item.item}}</span></p>
      <p class="description">{{item.description}}</p>
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
.description {
    margin-top: 0px;
}
.idline {
    margin-bottom: 0px;
}
.itemName {
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