<template>
  <div>
    <ul>
      <li v-for="item in feed" class="item">
        <p class="idline"><span class="itemName">{{item.item}}</span>
          <button @click="deleteItem(item)" class="delete">X</button>
        </p>
        <p class="description">{{item.description}}</p>
        <img href="#" class="image" v-bind:src="item.image" @click="showPopup"/>
        <div id="image">
          <img class="enlarged" v-bind:src="item.image"/>
          <label id="closePreview" @click="closePopup">X</label>
        </div>
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
    showPopup: function() {
      console.log('@showPopup');
      document.getElementById('image').style.display = "block";
    },
    closePopup: function() {
      console.log('@closePopup');
      document.getElementById('image').style.display = "none";
    },
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

/* popup */
#image {
  min-width: 100%;
  min-height: 100%;
  opacity:.95;
  top: 0;
  left: 0;
  padding-top: 2px;
  padding-bottom: 15px;
  text-align: center;
  display: none;
  position: fixed;
  background-color: black;
  overflow:auto;
  cursor: default;
}
#closePreview {
  position:absolute;
  cursor:pointer;
  margin-left: 7px;
  background-color: white;
  color: black;
  border-radius: 20px;
  min-width: 30px;
  text-align: center;
}
.enlarged {
  cursor: default;
}

</style>