<template>
  <div class="dashboard__item dashboard__item__topGainers">
    <div class="grid__title">
      <span>Trending</span>
      <button v-tippy="'The Top 7 searched for coins in the past 24h.'">
        <ion-icon name="help-circle-outline" class="profile__icon"></ion-icon>
      </button>
    </div>

    <swiper
      :direction="'vertical'"
      :slidesPerView="'auto'"
      :spaceBetween="15"
      :mousewheel="true"
      :modules="modules"
      :scrollbar="{ hide: false }"
      class="topGainers__list mySwiper"
    >
      <swiper-slide
        v-for="coin in trending"
        :key="coin.id"
        @click="routeTo(coin.id)"
        class="topGainers__list__item"
      >
        <div class="coinName">
          <img :src="coin.logo" :alt="coin.name" />
          <span>{{ coin.symbol }}</span>
        </div>
        <div class="coinPrice">${{ coin.price.toFixed(2) }}</div>
        <div v-if="coin.priceChange >= 0" class="coinChange greenText">
          {{ ((coin.priceChange * 100) / coin.price).toFixed(2) }}%
        </div>
        <div v-if="coin.priceChange < 0" class="coinChange redText">
          {{ ((coin.priceChange * 100) / coin.price).toFixed(2) }}%
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Scrollbar } from "swiper";

import { useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const trending = computed(() => store.getters.getTrending).value;

    function routeTo(coinID) {
      router.push(`/app/explore/${coinID}`);
    }

    return { trending, routeTo, modules: [Mousewheel, Scrollbar] };
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