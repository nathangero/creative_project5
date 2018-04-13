<template>
  <div class="feed">
    <h1>Search Results</h1>
    <p>Searched for {{keywords}}</p>
    <item-list/>
  </div>
</template>

<script>
 import ItemList from './ItemList';
 export default {
   name: 'SearchResults',
   components: { ItemList },
   created: function() {
     this.$store.dispatch('doSearch',this.$route.query.keywords);
   },
   computed: {
     keywords: function() {
       return this.$route.query.keywords;
     }
   },
   watch: {
     '$route.query.keywords'() {
       this.$store.dispatch('doSearch',this.$route.query.keywords);
     }
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