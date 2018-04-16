<template>
  <div class="feed">
    <div>
      <!-- <form v-on:submit.prevent="add" class="tweetForm">
        <input v-model="title" placeholder="Item Name"/>
        <textarea v-model="description" placeholder="Brief description"/><br/>
        <div class="buttonWrap">
          <button class="primary" type="submit">Add Item</button> -->
      <form enctype="multipart/form-data" v-on:submit.prevent="add" class="itemForm">
        <input v-model="title" placeholder="Item Name"/>
        <textarea v-model="description" placeholder="Brief description"/>
        <div v-bind:style="{inactive: !imagePreview, active:imagePreview }">
          <img class="preview" v-bind:src="imageData">
          <button v-if="imagePreview" v-on:click="removePic(item)" class="edit">X</button>
        </div>
        <div class="buttons">
          <div class="icon">
            <label for="file-input">
              <i class="far fa-image" aria-hidden="true"></i>
            </label>
            <input id="file-input" type="file" v-on:change="previewImage" accept="image/*" class="input-file">
          </div>
          <div class="buttonWrap">
            <button class="primary" type="submit">Add Item</button>
          </div>
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
        imageData: '',
        imagePreview: false,
        file: '',
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
          image: this.file,
        }).then(item => {
          this.title = "";
          this.description = "";
          this.imageData = '';
          this.imagePreview = false;
        });
      },
      previewImage: function(event) {
        console.log('@imagePrview');
        const input = event.target;
        // Check for file

        console.log("is there a file?");
        if (input.files && input.files[0]) {
          console.log("found file");
          this.file = input.files[0];
          const reader = new FileReader();

          console.log("reader.onload");
          reader.onload = (e) => {
            console.log("read as base64");
            // Read image as base64 and set to imageData
            this.imageData = e.target.result;
            this.imagePreview = true;
          }
          // Start the reader job - read file as a data url
          reader.readAsDataURL(input.files[0]);
        }
      },
      removePic: function() {

      }
    }
}
</script>

<style scoped>

.itemForm {
    background: #eee;
    padding: 10px;
    margin-bottom: 10px;
}
.buttonWrap {
    width: 20%;
    display: inline-block;
    text-align: right;
    /* display: inline; */
}
.buttons {
      display: flex;
    justify-content: space-between;
}
.icon {
    font-size: 2em;
    padding: 0px;
}
.icon:active {
    transform: translateY(4px);
}
.edit {
  /* display: none; */
  float: right;
  font-size: 1em;
  color: #494848;
  min-width: 30px;
}
img {
  width: 20%;
  height: 20%;
}
button {
    float: right;
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