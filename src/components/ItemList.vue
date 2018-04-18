<template>
  <div>
    <ul>
      <li v-for="item in feed" class="item">
        <p class="idline"><span class="itemName">{{item.item}}</span>
          <button @click="deleteItem(item)" class="delete">X</button>
        </p>
        <p class="description">{{item.description}}</p>
        <img href="#" class="image" v-bind:src="item.image" @click="enlarge(item.image)"/>
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
    enlarge: function(item) {
      alert('hi');
    }
  }
}
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 30px;
  border: blue;
  list-style: none;
  margin-right: auto;
  margin-left: auto;
  width: 1000px;
}
li {
  
}
img {
  max-width: 50%;
  max-height: 50%;
  padding-bottom: -50px;
  cursor: pointer;
}
li.item {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    max-width: 600px;

}
/* li.description {
    margin-top: 0px;
}
li.idline {
    margin-bottom: 5px;
} */
.itemName {
    font-weight: bold;
    margin-right: 10px;
}
.delete {
  display: none;
  float: right;
  font-size: 1em;
  color: #494848;
  min-width: 30px;
}
li:hover .delete {
    display: block;
}

</style>