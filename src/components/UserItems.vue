<template>
  <div class="feed">
    <div>
      <form v-on:submit.prevent="add" class="tweetForm">
        <input v-model="title" placeholder="Item Name"/>
        <!-- <img id="picture" src="#" alt="uploaded image"> -->
        <textarea v-model="description" placeholder="Brief description"/><br/>
        <div class="buttonWrap">
          <input class="picture" type="file" accept="image/*" @change="fileUpload">
          <button class="primary" type="submit">Add Item</button>
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
        pic: '',
      }
    },
    created: function() {
      this.$store.dispatch('getItems');
    },
    methods: {
      add: function() {
        console.log("pic: " + this.pic);
        this.$store.dispatch('addItem',{
          item: this.title,
          description: this.description,
          pic: this.pic,
        }).then(item => {
          this.title = "";
          this.description = "";
          this.pic = '';
          document.getElementsByClassName('primary').value = '';
        });
      },
      fileUpload: function(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          console.log("file not found");
          return;
        }
        this.createFile(files[0]);
      },
      createFile(file) {
        var reader = new FileReader();
        // reader.onload = (e) => {
        //   console.log(e.target.result);
        // };
        reader.readAsBinaryString(file);
        console.log(reader.result);
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
    display: inline-block;
    text-align: right;
    /* display: inline; */
}
button {
    /* margin-left: auto; */
    height: 2em;
    font-size: 0.9em;
}
.picture {
    /* background-color: white; */
    color: black;
    font-size: 14px;
    cursor: pointer;
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