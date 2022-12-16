<template>
  <div class="profileInfo__photo-user">
    <input type="file" accept="image/*" ref="file" @change="onFileSelected" />
    <img :src="selectedFile" alt="Cryptcize" />
    <div class="edit__button" @click="browse">
      <button class="browse">
        <ion-icon name="camera-outline"></ion-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userImage"],
  data() {
    return {
      selectedFile: null,
    };
  },
  created() {
    if (this.$props.userImage) {
      //console.log("Props Passed");
      this.selectedFile = this.$props.userImage;
    } else {
      //console.log("Props Did Not Passed");
      this.selectedFile =
        "https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png";
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      const fd = new FormData();
      fd.append("userImage", this.selectedFile);

      //console.log("Image ->", fd.get("userImage"));

      //! fd should be passed as the data to a post route to the backend

      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.selectedFile = e.target.result;
      };
    },
    browse() {
      this.$refs.file.click();
    },
  },
};
</script>


<style scoped>
.browse {
  cursor: pointer;
}
</style>