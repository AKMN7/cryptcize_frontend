<template>
  <div
    v-if="isLoading"
    class="loader_container"
    :class="{ darkBody: isDarkTheme }"
  >
    <div class="loader_img">
      <img src="../../../img/undraw_raining_re_4b55.svg" alt="Loading..." />
    </div>
    <div class="loader color-range"></div>
  </div>
  <div v-else class="profilePage" :class="{ darkTheme: isDarkTheme }">
    <div class="profilePage__item profilePage__item__profileHeader">
      <div class="profileInfo">
        <profile-image></profile-image>
        <div class="profileInfo__textInfo">
          <h2>{{ user.name }}</h2>
          <h4>{{ user.email }}</h4>
        </div>
        <div class="profileInfo__numInfo">
          <div>
            <ion-icon name="location-outline"></ion-icon>
            <p>{{ user.country }}</p>
          </div>
          <div class="redText">
            <p>{{ userFavs.length }}</p>
            <span>Liked</span>
          </div>
          <div>
            <p>{{ allPosts.length }}</p>
            <span>Posts</span>
          </div>
          <div
            @click="goToProfileEdit"
            v-tippy="'Settings'"
            class="settings-btn"
          >
            <ion-icon name="settings-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
    <latest-posts
      @refreshFeed="refreshPosts"
      :allPosts="allPosts"
    ></latest-posts>
    <user-favs :allFavs="userFavs"></user-favs>
  </div>
</template>

<script>
import LatestPosts from "./LatestPosts.vue";
import UserFavs from "./UserFavs.vue";
import ProfileImage from "./ProfileImage.vue";

export default {
  components: {
    LatestPosts,
    UserFavs,
    ProfileImage,
  },
  data() {
    return {
      isLoading: false,
      allPosts: [],
      userFavs: [],
      user: {},
    };
  },
  methods: {
    async refreshPosts() {
      try {
        this.allPosts = await this.$store.dispatch("getAllUserPosts");
        this.$swal.fire({
          icon: "success",
          title: "Coin Posts Refreshed!",
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
        });
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Unable to refresh feed. Please try again later!",
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
        });
      }
    },
    goToProfileEdit() {
      console.log("Clicked goToProfileEdit");
      this.$router.push("/app/edit");
    },
  },
  computed: {
    isDarkTheme() {
      return this.$store.getters.isDarkTheme;
    },
  },
  async created() {
    try {
      this.isLoading = true;

      this.user = this.$store.getters.user;

      this.$store.commit("setHeaderText", "Profile");

      this.allPosts = await this.$store.dispatch("getAllUserPosts");
      this.userFavs = this.$store.getters.getFavs;

      this.isLoading = false;
    } catch (error) {
      setTimeout(() => {
        this.isLoading = false;
      }, 4000);

      this.$swal.fire({
        icon: "error",
        title: "Something went wrong, please try again later!",
        showConfirmButton: false,
        toast: true,
        position: "top",
        timer: 4000,
      });

      this.$router.replace("/app/dashboard");
    }
  },
};
</script>

<style scoped>
.settings-btn {
  cursor: pointer;
  padding: 0.1rem;
  border-radius: 5px;
}

.settings-btn:hover {
  background-color: #eeeeee;
}
</style>