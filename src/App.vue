<template>
  <div
    v-if="isLoading"
    class="loader_container"
    :class="{ darkBody: isDarkTheme }"
  >
    <div class="loader_img">
      <img src="./img/undraw_raining_re_4b55.svg" alt="Loading..." />
    </div>
    <div class="loader color-range"></div>
  </div>
  <router-view></router-view>
</template>


<script>
//import darkTheme from "./configs/darkTheme";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    isDarkTheme() {
      return this.$store.getters.isDarkTheme;
    },
  },
  async mounted() {
    this.$store.commit("maintainTheme");

    try {
      const userAlreadySignedIn = await this.$store.dispatch("autoSignIn");

      if (userAlreadySignedIn) {
        this.isLoading = true;

        try {
          await this.$store.dispatch("getMainInfo");
          this.isLoading = false;
          this.$router.replace("/app/dashboard");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("NO SIGNED IN USER FOUND");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>


<style>
:root {
  --swiper-theme-color: #7920ff !important;
  --swiper-navigation-size: 32px !important;
}

/*HEADER STICKY (REMOVE == ORIGINAL DESIGN) */
.main__content .header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #eeeeee;
  height: 6.35rem;
  z-index: 14;
  padding-left: 270px;
  transition: all 0s;
}

@media only screen and (max-width: 76.25em) {
  .main__content .header {
    padding-left: 15px;
  }
}

.dashboard,
.explore__main,
.exploreChild,
.favourites,
.community,
.profile,
.profilePage,
.topic {
  margin-top: 8.85rem;
}
/*HEADER STICKY (REMOVE == ORIGINAL DESIGN) */

.router-link-exact-active,
.router-link-active {
  font-weight: 700;
  background-color: #7920ff;
  width: 95%;
  border-radius: 5px;
  margin: 0 auto;
}

.swal2-title {
  font-family: "Lato", sans-serif;
  font-size: 2.3rem;
}
.swal2-html-container {
  font-family: "Lato", sans-serif;
  font-size: 1.8rem;
}

.swal2-actions {
  font-family: "Lato", sans-serif;
  font-size: 1.7rem;
}

.swal2-textarea {
  font-family: "Lato", sans-serif;
  height: 15rem;
  font-size: 1.4rem;
  resize: none;
  margin: 1rem 2rem;
}

.swal2-popup.swal2-toast .swal2-title {
  font-family: "Lato", sans-serif;
  font-size: 1.6rem;
  text-align: center;
}
</style>