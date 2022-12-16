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
  <div v-else class="community" :class="{ darkTheme: isDarkTheme }">
    <top-favs-chart :mostLiked="top7Coins"></top-favs-chart>
    <top-losers></top-losers>
    <latest-posts
      @refreshFeed="refreshPosts"
      :allPosts="allPosts"
    ></latest-posts>
    <new-post @refreshFeed="refreshPosts"></new-post>
    <new-topic></new-topic>
    <top-topics :topTopics="topTopics"></top-topics>
  </div>
</template>

<script>
import TopFavsChart from "./TopFavsChart.vue";
import TopLosers from "./TopLosers.vue";
import LatestPosts from "./LatestPosts.vue";
import NewPost from "./NewPost.vue";
import NewTopic from "./NewTopic.vue";
import TopTopics from "./TopTopics.vue";

export default {
  components: {
    TopFavsChart,
    TopLosers,
    LatestPosts,
    NewPost,
    NewTopic,
    TopTopics,
  },
  data() {
    return {
      isLoading: false,
      top7Coins: [],
      allPosts: [],
      topTopics: [],
    };
  },
  methods: {
    async refreshPosts() {
      try {
        this.allPosts = await this.$store.dispatch("getAllCoinPosts");
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

      this.$store.commit("setHeaderText", "Community");

      this.allPosts = await this.$store.dispatch("getAllCoinPosts");
      this.top7Coins = await this.$store.dispatch("getTop7Likes");
      this.topTopics = await this.$store.dispatch("getTopTopics");

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