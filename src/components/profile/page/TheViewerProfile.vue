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
        <div class="profileInfo__photo-viewer">
          <img src="../../../img/user-login-avatar-11929.svg" alt="Cryptcize" />
        </div>
        <div class="profileInfo__textInfo">
          <h2>{{ userData.user.name }}</h2>
          <h4>{{ userData.user.email }}</h4>
        </div>
        <div class="profileInfo__numInfo">
          <div>
            <ion-icon name="location-outline"></ion-icon>
            <p>{{ userData.user.country }}</p>
          </div>
          <div class="redText">
            <p>{{ userData.favs.length }}</p>
            <span>Liked</span>
          </div>
          <div>
            <p>{{ userData.posts.length }}</p>
            <span>Posts</span>
          </div>
        </div>
      </div>
    </div>
    <latest-posts
      @refreshFeed="refreshPosts"
      :allPosts="userData.posts"
    ></latest-posts>
    <user-favs :allFavs="userData.favs"></user-favs>
  </div>
</template>

<script>
import LatestPosts from "./LatestPosts.vue";
import UserFavs from "./UserFavs.vue";

export default {
  components: {
    LatestPosts,
    UserFavs,
  },
  data() {
    return {
      isLoading: false,
      userData: {},
    };
  },
  methods: {
    async refreshPosts() {
      try {
        this.userData = await this.$store.dispatch(
          "getSpecificUserData",
          this.$route.params.userID
        );

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
  },
  computed: {
    isDarkTheme() {
      return this.$store.getters.isDarkTheme;
    },
  },
  async created() {
    try {
      this.isLoading = true;
      this.$store.commit("setHeaderText", "Profile");

      this.userData = await this.$store.dispatch(
        "getSpecificUserData",
        this.$route.params.userID
      );

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