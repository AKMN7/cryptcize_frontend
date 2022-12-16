<template>
  <div class="exploreChild__item exploreChild__item__textData">
    <div class="textData__item">
      <div class="logo_name">
        <img :src="coinData.logo" alt="coinLogo" />
        <p>{{ coinData.name }}</p>

        <button
          v-if="liked"
          v-tippy="'Remove From Favourites'"
          @click="toggleLike('unlike')"
        >
          <ion-icon name="heart" class="filledRed"></ion-icon>
        </button>

        <button
          v-else
          v-tippy="'Add To Favourites'"
          @click="toggleLike('addlike')"
        >
          <ion-icon name="heart-outline"></ion-icon>
        </button>
      </div>
    </div>
    <div class="textData__item">
      <div class="textData__item__title">
        <span>{{ coinData.name }} ({{ coinData.symbol }}) Price</span>
        <button v-tippy="'The Current Price of the Selected Cryptocurrency.'">
          <ion-icon name="help-circle-outline"></ion-icon>
        </button>
      </div>
      <div class="textData__item__info">$ {{ coinData.price }}</div>
      <div
        v-if="coinData.priceChange < 0"
        class="textData__item__change redText"
      >
        <ion-icon name="caret-down-outline"></ion-icon>
        <p>{{ coinData.priceChange }}%</p>
      </div>
      <div v-else class="textData__item__change greenText">
        <ion-icon name="caret-up-outline"></ion-icon>
        <p>{{ coinData.priceChange }}%</p>
      </div>
    </div>
    <div class="textData__item">
      <div class="textData__item__title">
        <span>Market Cap</span>
        <button
          v-tippy="'The Current Market Cap of the Selected Cryptocurrency.'"
        >
          <ion-icon name="help-circle-outline"></ion-icon>
        </button>
      </div>
      <div class="textData__item__info">
        $ {{ coinData.marketCap || "---" }}
      </div>
      <div class="textData__item__change greenText"></div>
    </div>
    <div class="textData__item">
      <div class="textData__item__title">
        <span>Volume (24h)</span>
        <button
          v-tippy="
            'The Current Volume of in the past 24h the Selected Cryptocurrency.'
          "
        >
          <ion-icon name="help-circle-outline"></ion-icon>
        </button>
      </div>
      <div class="textData__item__info">$ {{ coinData.volume || "---" }}</div>
      <div
        v-if="coinData.volumeChange < 0"
        class="textData__item__change redText"
      >
        <ion-icon name="caret-down-outline"></ion-icon>
        <p>{{ coinData.volumeChange }}%</p>
      </div>
      <div v-else class="textData__item__change greenText">
        <ion-icon name="caret-up-outline"></ion-icon>
        <p>{{ coinData.volumeChange }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { inject } from "@vue/runtime-core";
import toaster from "../../../configs/toaster/toast";

export default {
  props: ["coinData"],
  setup(props) {
    const store = useStore();
    const swal = inject("$swal");
    const userFavs = store.getters.getFavs;

    let liked = ref(false);

    userFavs.forEach((el) => {
      if (el.id == props.coinData.id) liked.value = true;
    });

    async function toggleLike(mode) {
      if (mode == "addlike") {
        try {
          liked.value = true;
          await store.dispatch("addLike", {
            coinID: props.coinData.id,
            coinName: props.coinData.name,
            coinSymbol: props.coinData.symbol,
          });
          toaster.fireToast(
            swal,
            true,
            `${props.coinData.name} added to your favourites!`
          );
        } catch (error) {
          toaster.fireToast(swal, false, error.message);
        }
      } else if (mode == "unlike") {
        try {
          liked.value = false;
          await store.dispatch("removeLike", {
            coinID: props.coinData.id,
          });
          toaster.fireToast(
            swal,
            true,
            `${props.coinData.name} removed from your favourites!`
          );
        } catch (error) {
          toaster.fireToast(swal, false, error.message);
        }
      }
    }

    return {
      liked,
      toggleLike,
    };
  },
};
</script>