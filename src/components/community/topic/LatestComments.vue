<template>
  <div class="topic__item topic__item__latestComments">
    <div class="grid__title">
      <span>{{ removeSlug(topicName) }}</span>
      <span class="topicCode" v-tippy="'Topic Code'">
        <ion-icon name="code-slash-outline"></ion-icon>{{ topicCode }}
      </span>
    </div>
    <div v-if="allComments.length > 0" class="topicComments">
      <div v-for="comment in allComments" :key="comment._id" class="comment">
        <div class="comment__header">
          <div class="comment__header-left">
            <ion-icon name="person-circle-outline"></ion-icon>
            <p @click="routeTo(comment.user)" class="postLink">
              <span>{{ comment.userName.split(" ")[0] }}</span> ◾
              {{ formatDate(comment.Date) }}
            </p>
          </div>
        </div>
        <div class="comment__text">
          <p>
            {{ comment.text }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="no_posts">
      <img src="../../../img/undraw_blank_canvas_re_2hwy.svg" alt="No Posts" />
      <h5>Looks like no one shared there thought yet. Be the first!</h5>
    </div>
    <new-comment
      :topicID="topicID"
      @refreshComments="refreshComments"
    ></new-comment>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import NewComment from "./NewComment.vue";

export default {
  props: ["allComments", "topicName", "topicCode", "topicID"],
  emits: ["refreshComments"],
  components: {
    NewComment,
  },
  setup(_, context) {
    const router = useRouter();

    function formatDate(date) {
      let postDate = new Date(date);
      let nowDate = Date.now();

      let result = Math.abs(nowDate - postDate) / 36e5;

      if (result < 1) return ((result * 100 * 60) / 100).toFixed() + "m";
      if (result > 1 && result < 24) return result.toFixed() + "h";
      if (result > 24) return Math.floor(result / 24) + "d";
    }

    function routeTo(userID) {
      router.push(`/app/users/${userID}`);
    }

    function removeSlug(string) {
      return string.replaceAll("-", " ");
    }

    function refreshComments() {
      context.emit("refreshComments");
    }

    return { formatDate, routeTo, removeSlug, refreshComments };
  },
};
</script>


<style scoped>
.no_posts {
  text-align: center;
  color: #7920ff;
  height: 85%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.no_posts img {
  height: 15rem;
  width: 15rem;
  margin-bottom: 1rem;
}
</style>

