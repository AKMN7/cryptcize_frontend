<template>
  <div class="profilePage__item profilePage__item__favCoins">
    <div class="grid__title">
      <span>User Favourites</span>
      <button v-tippy="'Favourite Coins'">
        <ion-icon name="help-circle-outline"></ion-icon>
      </button>
    </div>

    <swiper
      v-if="allFavs.length > 0"
      :direction="'vertical'"
      :slidesPerView="'auto'"
      :spaceBetween="15"
      :mousewheel="true"
      :modules="modules"
      :scrollbar="{ hide: false }"
      class="topGainers__list mySwiper"
    >
      <swiper-slide
        v-for="fav in allFavs"
        :key="fav.coin"
        class="topGainers__list__item"
        @click="routeTo(fav.symbol)"
      >
        <div class="coinName">
          <img :src="fav.logo" alt="logo" />
          <span>{{ fav.symbol.toUpperCase() }}</span>
        </div>
        <div class="coinPrice">${{ fav.price.toFixed(2) }}</div>
        <div v-if="fav.priceChange >= 0" class="coinChange greenTexxt">
          {{ ((fav.priceChange * 100) / fav.price).toFixed(2) }}%
        </div>
        <div v-else-if="fav.priceChange < 0" class="coinChange redText">
          {{ ((fav.priceChange * 100) / fav.price).toFixed(2) }}%
        </div>
      </swiper-slide>
    </swiper>
    <div v-else class="no_posts">
      <img src="../../../img/undraw_blank_canvas_re_2hwy.svg" alt="No Posts" />
      <h5>Looks like there is no favourites to show here.</h5>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Scrollbar } from "swiper";
import { useRouter } from "vue-router";
export default {
  props: ["allFavs"],
  emits: ["refreshFeed"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();
    function routeTo(coinID) {
      router.push(`/app/explore/${coinID}`);
    }

    return {
      routeTo,
      modules: [Mousewheel, Scrollbar],
    };
  },
};
</script>

<style scoped>
.topGainers__list {
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

.greenText {
  color: green !important;
}

.redText {
  color: red !important;
}
</style>