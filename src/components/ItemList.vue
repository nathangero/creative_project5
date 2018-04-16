<template>
  <div>
    <ul>
      <li v-for="item in feed" class="item">
        <p class="idline"><span class="itemName">{{item.item}}</span>
          <button v-on:click="deleteItem(item)" class="edit">X</button>
          <img v-bind:src="item.image"/>
        </p>
        <p class="description">{{item.description}}</p>
      </li>
    </ul>
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
  methods: {
    deleteItem: function(item) {
      this.$store.dispatch('deleteItem', {
        id: item.id,
      });
    },
    editItem: function(item) {
      
      let newTitle = '';
      let newDescription = '';
      let newPicture = '';
      
    }
  }
}
</script>

<style scoped>
ul {
    list-style: none;
}
li.item {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    max-width: 600px;
}
li.description {
    margin-top: 0px;
}
li.idline {
    margin-bottom: 5px;
}
.itemName {
    font-weight: bold;
    margin-right: 10px;
}
.edit {
  display: none;
  float: right;
  font-size: 1em;
  color: #494848;
  min-width: 30px;
}
li:hover .edit {
    display: block;
}

</style>