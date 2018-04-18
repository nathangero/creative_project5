<template>
  <div class="feed">
    <div class="wrapper">
      <button id="popupButton" @click="showPopup">Add Item</button>
    </div>
    <div id="popup">
      <div id="popupForm">
        <form enctype="multipart/form-data" v-on:submit.prevent="add" class="itemForm">
          <label id="close" @click="closePopup">X</label>
          <input v-model="title" placeholder="Item Name"/>
          <textarea v-model="description" placeholder="Brief description"/>
          <div v-bind:style="{inactive: !imagePreview, active:imagePreview }">
            <img class="preview" v-bind:src="imageData">
            <label id="closePreview" v-if="imagePreview" class="edit" @click="removePic">X</label>
          </div>
          <div class="buttons">
            <div class="icon">
              <label for="file-input">
                <i class="far fa-image" aria-hidden="true"></i>
              </label>
              <input id="file-input" ref="fileupload" type="file" v-on:change="previewImage" accept="image/*" class="input-file">
            </div>
            <div class="buttonWrap">
              <button class="primary" type="submit">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="listWrapper">
      <item-list/>
    </div>
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
        file: "",
      }
    },
    created: function() {
      this.$store.dispatch('getItems');
    },
    methods: {
      add: function() {
        // console.log("title: " + this.title);
        this.$store.dispatch('addItem',{
          item: this.title,
          description: this.description,
          image: this.file,
        }).then(item => {
          this.closePopup();
        });
      },
      clearFields: function() {
          this.title = "";
          this.description = "";
          this.imageData = "";
          this.imagePreview = false;
          this.file = "";
          const input = this.$refs.fileupload;
          input.type = 'text';
          input.type = 'file';
      },
      previewImage: function(event) {
        const input = event.target;
        // Check for file

        if (input.files && input.files[0]) {
          this.file = input.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            // Read image as base64 and set to imageData
            this.imageData = e.target.result;
            this.imagePreview = true;
          }
          // Start the reader job - read file as a data url
          reader.readAsDataURL(input.files[0]);
        }
      },
      removePic: function() {
          this.imageData = '';
          this.imagePreview = false;
          this.file = "";
          const input = this.$refs.fileupload;
          input.type = 'text';
          input.type = 'file';
      },
      showPopup: function() {
        document.getElementById('popup').style.display = "block";
      },
      closePopup: function() {
        document.getElementById('popup').style.display = "none";
        this.clearFields();
      },
    }
}
</script>

<style scoped>
@import "http://fonts.googleapis.com/css?family=Raleway";

.itemForm {
    background: #eee;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
}
.wrapper {
  text-align: center;
}
.buttonWrap {
    width: 20%;
    display: inline-block;
    text-align: right;
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
  margin: 0;
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
div .listWrapper {
  margin-right: -200px;
  max-width: 100%;
}

/* Popup code */
#popupButton {
  display: block;
  text-align: center;
  background-color: #F35537;
  width: 200px;
  height: 50px;
  font-size: 20px;
  margin-right: -50px;
}
#popup {
  width: 100%;
  height: 100%;
  opacity:.95;
  top: 0;
  left: 0;
  display: none;
  position: fixed;
  background-color: black;
  overflow:auto;
}
#close {
  position:absolute;
  right:-14px;
  top:-14px;
  cursor:pointer;
  background-color: yellow;
  color: black;
  border-radius: 20px;
  min-width: 20px;
  text-align: center;
}

#closePreview {
  float:right;
  cursor: pointer;
  background-color: rgb(201, 201, 201);
  color: black;
  border-radius: 2px;
  min-width: 20px;
  text-align: center;
}
#popupForm {
  position:absolute;
  left:50%;
  top:17%;
  margin-left:-202px;
  font-family:'Raleway',sans-serif
}

</style>