<template>
  <swiper
    :navigation="true"
    :slidesPerView="2"
    :spaceBetween="30"
    :breakpoints="breakpoints"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="dashboard__item dashboard__item__topCoins"
    v-if="favCoins.length > 0"
  >
    <swiper-slide
      v-for="coin in favCoins"
      :key="coin.coin"
      @click="navigateFav(coin.id)"
    >
      <div class="top-coin-name">
        <img :src="coin.logo" :alt="coin.coin" class="top-coin-name-img" />
        <span class="top-coin-name-text">{{ coin.symbol.toUpperCase() }}</span>
      </div>
      <div class="top-coin-price">${{ coin.price.toFixed(2) }}</div>
      <div class="top-coin-change">
        <ion-icon
          v-if="coin.priceChange >= 0"
          name="caret-up-outline"
          class="top-coin-change-icon greenText"
        ></ion-icon>
        <ion-icon
          v-else
          name="caret-down-outline"
          class="top-coin-change-icon redText"
        ></ion-icon>

        <span
          v-if="coin.priceChange >= 0"
          class="top-coin-change-text greenText"
          >+{{ ((coin.priceChange * 100) / coin.price).toFixed(2) }}%</span
        >
        <span v-else class="top-coin-change-text redText"
          >{{ ((coin.priceChange * 100) / coin.price).toFixed(2) }}%</span
        >
      </div>
      <div class="top-coin-indicator">
        <span>
          RSI:
          <span v-if="coin.indicators.rsi > 70" class="action greenText">
            Buy
          </span>
          <span v-else-if="coin.indicators.rsi < 30" class="action redText">
            Sell
          </span>
          <span v-else class="action greyText">NEU</span>
        </span>
        <div class="seperator"></div>
        <span>
          MACD:
          <span
            v-if="coin.indicators.macd.MACD > coin.indicators.macd.signal"
            class="action greenText"
          >
            Buy
          </span>
          <span v-else class="action redText"> Sell </span>
        </span>
      </div>
    </swiper-slide>
  </swiper>
  <swiper
    :navigation="true"
    :slidesPerView="2"
    :spaceBetween="30"
    :breakpoints="breakpoints"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="dashboard__item dashboard__item__topCoins"
    v-else
  >
    <swiper-slide
      v-for="coin in top10"
      :key="coin.name"
      @click="navigateFav(coin.id)"
    >
      <div class="top-coin-name">
        <img :src="coin.logo" :alt="coin.name" class="top-coin-name-img" />
        <span class="top-coin-name-text">{{ coin.name }}</span>
      </div>
      <div class="top-coin-price">${{ coin.price.toFixed(2) }}</div>
      <div class="top-coin-change">
        <ion-icon
          v-if="coin.price_change.toFixed(2) >= 0"
          name="caret-up-outline"
          class="top-coin-change-icon greenText"
        ></ion-icon>
        <ion-icon
          v-else
          name="caret-down-outline"
          class="top-coin-change-icon redText"
        ></ion-icon>

        <span
          v-if="coin.price_change.toFixed(2) >= 0"
          class="top-coin-change-text greenText"
          >+{{ coin.price_change.toFixed(2) }}%</span
        >
        <span v-else class="top-coin-change-text redText"
          >{{ coin.price_change.toFixed(2) }}%</span
        >
      </div>
      <div class="top-coin-indicator">
        <span>
          RSI:
          <span v-if="coin.indicators.rsi > 70" class="action greenText">
            Buy
          </span>
          <span v-else-if="coin.indicators.rsi < 30" class="action redText">
            Sell
          </span>
          <span v-else class="action greyText">NEU</span>
        </span>
        <div class="seperator"></div>
        <span>
          MACD:
          <span
            v-if="coin.indicators.macd.MACD > coin.indicators.macd.signal"
            class="action greenText"
          >
            Buy
          </span>
          <span v-else class="action redText"> Sell </span>
        </span>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper";

import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();
    const top10 = computed(() => store.getters.getTop10);
    const router = useRouter();
    const favCoins = computed(() => store.getters.getFavs);

    function navigateFav(coinID) {
      router.push(`/app/explore/${coinID}`);
    }

    const breakpoints = {
      480: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      770: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
      1100: {
        slidesPerView: 5,
        spaceBetween: 35,
      },
      1400: {
        slidesPerView: 6,
        spaceBetween: 40,
      },
    };

    return {
      breakpoints,
      modules: [Pagination, Navigation],
      top10,
      favCoins,
      navigateFav,
    };
  },
};
</script>


<style scoped>
.swiper {
  margin-right: 0px !important;
  margin-left: 0px !important;
  padding: 5px 3px !important;
}

.swiper-slide {
  box-sizing: border-box;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
  border-radius: 5px;
  padding: 2rem;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.top-coin-name,
.top-coin-change {
  display: flex;
  align-items: center;
}
.top-coin-name-text {
  font-size: 1.6rem;
}
.top-coin-name-img {
  height: 3.2rem;
  width: 3.2rem;
  margin-right: 1rem;
}

.top-coin-price {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.top-coin-change-text {
  font-size: 1.3rem;
}

.top-coin-change-icon {
  margin-right: 5px;
  margin-top: 3px;
  font-size: 2rem;
}

.greenText {
  color: green;
}

.redText {
  color: red;
}

.greyText {
  color: rgb(160, 160, 160);
}

.top-coin-indicator {
  font-size: 1.2rem;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

@media only screen and (max-width: 52em) {
  .top-coin-indicator {
    font-size: 1rem;
  }
}

.top-coin-indicator .seperator {
  height: 1.6rem;
  width: 1px;
  margin: 0 0.8rem;
  background-color: rgb(183, 177, 177);
}
</style>