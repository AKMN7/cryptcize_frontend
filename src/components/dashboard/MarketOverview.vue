<template>
  <div class="dashboard__item dashboard__item__marketOverview">
    <div class="grid__title">
      <span>Market Overview</span>
      <button v-tippy="tippyText">
        <ion-icon name="help-circle-outline" class="profile__icon"></ion-icon>
      </button>
    </div>

    <div class="overview__info">
      <div class="overview__info__item">
        <div class="viewName">Cryptos</div>
        <div class="viewInfo">{{ totalCryptos }}</div>
      </div>
      <div class="overview__info__item">
        <div class="viewName">Market Cap</div>
        <div class="viewInfo">${{ marketCap }}</div>
      </div>
      <div class="overview__info__item">
        <div class="viewName">24 Vol</div>
        <div class="viewInfo">${{ volume }}</div>
      </div>
      <div class="overview__info__item lastItem">
        <div class="viewName">Dominance</div>
        <div class="viewInfo">
          {{ dominance.name }}: {{ dominance.percentage }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const overview = computed(() => store.getters.getOverview).value;

    const tippyText =
      "An Overview of the current crypto market. Showing the total cryptos, current market cap, last 24h trading volume and the dominance of Bitcoin.";

    function converter(val) {
      if (Math.abs(Number(val)) >= 1.0e12)
        return (Math.abs(Number(val)) / 1.0e12).toFixed(2) + "T";
      if (Math.abs(Number(val)) >= 1.0e9)
        return (Math.abs(Number(val)) / 1.0e9).toFixed(2) + "B";
      if (Math.abs(Number(val)) >= 1.0e6)
        return (Math.abs(Number(val)) / 1.0e6).toFixed(2) + "M";
    }

    const totalCryptos = overview.totalCryptos;
    const marketCap = converter(overview.marketCap);
    const volume = converter(overview.volume);
    const dominance = {
      name: overview.dominance[0].toUpperCase(),
      percentage: overview.dominance[1].toFixed(2),
    };

    return { tippyText, totalCryptos, marketCap, volume, dominance };
  },
};
</script>