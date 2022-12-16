<template>
  <div
    class="favourites"
    :class="{ no__fav: favCoins.length <= 0, darkTheme: isDarkTheme }"
  >
    <div
      v-for="coin in favCoins"
      :key="coin.name"
      class="favourites__coin"
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
    </div>

    <div class="no__fav" v-if="favCoins.length <= 0">
      <img src="../../img/void.svg" alt="noFavs" />
      <h2>You still don't have any favourites.</h2>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    store.commit("setHeaderText", "Favourites");

    const favCoins = computed(() => store.getters.getFavs);
    let isDarkTheme = computed(() => store.getters.isDarkTheme);

    //console.log("favCoins", favCoins);

    function navigateFav(coinID) {
      router.push(`/app/explore/${coinID}`);
    }

    return {
      favCoins,
      navigateFav,
      isDarkTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
.no__fav {
  height: 85vh;
  width: 100%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;

  img {
    height: 30rem;
    width: 30rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-family: "Lato", sans-serif;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 1px;
    color: #22233c;
    line-height: 2;
    text-align: center;
  }
}

.favourites {
  font-family: "Lato", sans-serif;
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fit, minmax(16.5rem, 16.5rem));
  gap: 2rem;
  padding: 0 2rem;
}

.favourites__coin {
  cursor: pointer;
  box-sizing: border-box;
  min-height: 16.5rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
  border-radius: 5px;
  padding: 2rem;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.2s all;
}

.favourites__coin:hover {
  background-color: #fafafa;
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

.darkTheme .favourites__coin {
  box-shadow: none !important;
}
</style>