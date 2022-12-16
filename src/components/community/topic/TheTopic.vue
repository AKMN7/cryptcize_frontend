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
  <div v-else class="topic" :class="{ darkTheme: isDarkTheme }">
    <the-search-bar
      @searchTopic="changeTopic"
      :loading="searchIsLoading"
    ></the-search-bar>
    <latest-comments
      :allComments="allComments"
      :topicCode="topicCode"
      :topicName="topicName"
      :topicID="topicID"
      @refreshComments="updateComments"
    ></latest-comments>
  </div>
</template>

<script>
import TheSearchBar from "./TheSearchBar.vue";
import LatestComments from "./LatestComments.vue";

export default {
  components: {
    TheSearchBar,
    LatestComments,
  },
  data() {
    return {
      isLoading: false,
      searchIsLoading: false,
      topicName: "",
      topicCode: "",
      topicID: "",
      allComments: [],
    };
  },
  methods: {
    async changeTopic(phrase) {
      try {
        this.searchIsLoading = true;

        const topicInfo = await this.$store.dispatch("getTopicInfo", {
          topicCredentials: phrase,
        });

        this.$store.commit(
          "setHeaderText",
          `Topic - ${this.removeSlug(topicInfo.topic.topicName)}`
        );

        this.topicName = topicInfo.topic.topicName;
        this.topicCode = topicInfo.topic.topicCode;
        this.allComments = topicInfo.comments;
        this.allComments = this.allComments.reverse();
        this.topicID = topicInfo.topic._id;
        this.$router.replace(`/app/community/${this.topicCode}`);

        this.searchIsLoading = false;
      } catch (error) {
        console.log("Uncorrect topic name");

        this.$swal.fire({
          icon: "error",
          title:
            "Topic Not found, please enter a correct topic name/code and try again.",
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 4000,
        });

        this.searchIsLoading = false;
      }
    },
    async updateComments() {
      try {
        this.allComments = await this.$store.dispatch(
          "getTopicComments",
          this.topicID
        );

        this.allComments = this.allComments.reverse();
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
    removeSlug(string) {
      return string.replaceAll("-", " ");
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

      const topicInfo = await this.$store.dispatch("getTopicInfo", {
        topicCredentials: this.$route.params.topicCode,
      });

      this.isLoading = false;

      this.$store.commit(
        "setHeaderText",
        `Topic - ${this.removeSlug(topicInfo.topic.topicName)}`
      );

      this.topicName = topicInfo.topic.topicName;
      this.topicCode = topicInfo.topic.topicCode;
      this.allComments = topicInfo.comments;
      this.allComments = this.allComments.reverse();
      this.topicID = topicInfo.topic._id;
    } catch (error) {
      console.log("Entererd Two");
      console.log(error);
      setTimeout(() => {
        this.isLoading = false;
      }, 4000);

      this.$swal.fire({
        icon: "error",
        title:
          "Topic Not found, please enter a correct topic name/code and try again.",
        showConfirmButton: false,
        toast: true,
        position: "top",
        timer: 4000,
      });

      this.$router.go(-1);
    }
  },
};
</script>