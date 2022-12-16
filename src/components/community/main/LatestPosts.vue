<template>
  <div class="community__item community__item__latestCoinPosts">
    <div class="grid__title">
      <span>Latest Posts</span>
      <button
        @click="$emit('refreshFeed')"
        v-tippy="'Refresh To Get The Latest Posts'"
      >
        <ion-icon name="refresh-circle-outline"></ion-icon>
      </button>
    </div>

    <swiper
      v-if="allPosts.length > 0"
      :direction="'vertical'"
      :slidesPerView="'auto'"
      :spaceBetween="15"
      :mousewheel="true"
      :modules="modules"
      :scrollbar="{ hide: false }"
      class="coinPosts mySwiper"
    >
      <swiper-slide v-for="post in allPosts" :key="post.coinName" class="post">
        <div class="post__header">
          <div class="post__header-left">
            <ion-icon name="person-circle-outline"></ion-icon>
            <p @click="routeTo(post.user)" class="postLink">
              <span>{{ post.userName.split(" ")[0] }}</span> ◾
              {{ formatDate(post.Date) }}
            </p>
          </div>
          <div class="post__header-right">
            <span v-if="post.postType == 'bearish'" class="bearish"
              >Bearish</span
            >
            <span v-if="post.postType == 'bullish'" class="bullish"
              >Bullish</span
            >
          </div>
        </div>
        <div class="post__text">
          <p>
            <span>${{ post.coinName.toUpperCase() }}</span> {{ post.text }}
          </p>
        </div>
        <div class="post__seperator"></div>
        <div class="post__reacts">
          <div
            v-if="previouslyVoted(post._id) == 'upvote'"
            class="upvote voted"
            @click="vote('upvote', post._id)"
          >
            <ion-icon name="thumbs-up-sharp"></ion-icon>
            <span>{{ post.upVotes }}</span>
          </div>
          <div
            v-else-if="previouslyVoted(post._id) == false || 'downvoted'"
            class="upvote"
            @click="vote('upvote', post._id)"
          >
            <ion-icon name="thumbs-up-sharp"></ion-icon>
            <span>{{ post.upVotes }}</span>
          </div>
          <div
            v-if="previouslyVoted(post._id) == 'downvote'"
            class="downvote voted"
            @click="vote('downvote', post._id)"
          >
            <ion-icon name="thumbs-down-sharp"></ion-icon
            ><span>{{ post.downVotes }}</span>
          </div>
          <div
            v-else-if="previouslyVoted(post._id) == false || 'upvoted'"
            class="downvote"
            @click="vote('downvote', post._id)"
          >
            <ion-icon name="thumbs-down-sharp"></ion-icon
            ><span>{{ post.downVotes }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div v-else class="no_posts">
      <img src="../../../img/undraw_blank_canvas_re_2hwy.svg" alt="No Posts" />
      <h5>Looks like there is no posts to show here.</h5>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Scrollbar } from "swiper";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, inject } from "@vue/runtime-core";
import toaster from "../../../configs/toaster/toast";

export default {
  props: ["allPosts"],
  emits: ["refreshFeed"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(_, context) {
    const router = useRouter();
    const store = useStore();
    const swal = inject("$swal");

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

    const userReacts = computed(() => store.getters.getReacts);

    function previouslyVoted(postID) {
      let result = false;
      userReacts.value.forEach((el) => {
        if (el.post == postID) {
          //console.log("Checked Out", el.reactType);
          result = el.reactType;
        }
      });
      return result;
    }

    async function vote(userVote, postID) {
      console.log(userVote, postID);
      try {
        await store.dispatch("addReact", {
          postID,
          reactType: userVote,
        });
        context.emit("refreshFeed");
      } catch (error) {
        toaster.fireToast(swal, false, error.message);
      }
    }

    return {
      modules: [Mousewheel, Scrollbar],
      formatDate,
      routeTo,
      previouslyVoted,
      vote,
    };
  },
};
</script>

<style scoped>
.coinPosts {
  height: 90%;
}
.swiper-slide {
  box-sizing: border-box;
  height: max-content !important;
}

.no_posts {
  text-align: center;
  color: #7920ff;
  height: 90%;
  width: 90%;
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

.postLink span {
  cursor: pointer;
  transition: color 0.3s ease-in;
}

.postLink span:hover {
  color: #7920ff;
}
</style>