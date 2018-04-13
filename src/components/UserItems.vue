<template>
  <div class="feed">
    <div>
      <form v-on:submit.prevent="add" class="tweetForm">
        <input v-model="title" placeholder="Item Name"/>
        <textarea v-model="description" placeholder="Brief description"/><br/>
        <div class="buttonWrap">
          <button class="primary" type="submit">Add</button>
        </div>
      </form>
    </div>
    <item-list/>
  </div>
</template>

<script>
import ItemList from './ItemList';
export default {
    name: 'UserItems',
    components: { ItemList },
    data () {
      return {
        title: '',
        description: '',
      }
    },
    created: function() {
      this.$store.dispatch('getItems');
    },
    methods: {
      add: function() {
        this.$store.dispatch('addItem',{
          item: this.title,
          description: this.description,
        }).then(item => {
          this.title = "";
          this.description = "";
        });
      },
    }
}
</script>

<style scoped>
.feed {
    width: 600px;
}
.tweetForm {
    background: #eee;
    padding: 10px;
    margin-bottom: 10px;
}
.buttonWrap {
    width: 100%;
    display: flex;
}
button {
    margin-left: auto;
    height: 2em;
    font-size: 0.9em;
}
input {
  margin-bottom: 5px;  
  height: 20px;
  padding: 2px;
  font-size: 16px;
}
textarea {
    font-family: 'Avenir';
    width: 100%;
    height: 5em;
    padding: 2px;
    margin-bottom: 5px;
    resize: none;
    box-sizing: border-box;
}
</style>