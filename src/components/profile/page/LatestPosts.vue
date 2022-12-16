<template>
  <div class="profilePage__item profilePage__item__latestPosts">
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
      <swiper-slide
        v-for="post in allPosts"
        :key="post.coinName + post.userName"
        class="post"
      >
        <div class="post__header">
          <div class="post__header-left">
            <ion-icon name="person-circle-outline"></ion-icon>
            <p>
              {{ post.userName.split(" ")[0] }} ◾ {{ formatDate(post.Date) }}
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
        <div class="post__seperator"></div>
        <div class="post__text">
          <p>
            <span>${{ post.coinName.toUpperCase() }}</span> {{ post.text }}
          </p>
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

export default {
  props: ["allPosts"],
  emits: ["refreshFeed"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    function formatDate(date) {
      const postDate = new Date(date);
      const nowDate = Date.now();
      // const nowDate = Date.now() - 28800000;

      const result = Math.abs(nowDate - postDate) / 36e5;

      if (result < 1) return ((result * 100 * 60) / 100).toFixed() + "m";
      if (result > 1 && result < 24) return result.toFixed() + "h";
      if (result > 24) return Math.floor(result / 24) + "d";
    }

    return {
      modules: [Mousewheel, Scrollbar],
      formatDate,
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
</style>