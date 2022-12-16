<template>
  <div class="dashboard" :class="{ darkTheme: isDarkTheme }">
    <top-coins></top-coins>
    <market-cap-chart></market-cap-chart>
    <makret-overview></makret-overview>
    <fear-gauge></fear-gauge>
    <fear-overview></fear-overview>
    <top-gainers></top-gainers>
  </div>
</template>


<script>
import TopCoins from "./TopCoins.vue";
import MarketCapChart from "./MarketCapChart.vue";
import MakretOverview from "./MarketOverview.vue";
import FearGauge from "./FearGauge.vue";
import FearOverview from "./FearOverview.vue";
import TopGainers from "./TopGainers.vue";

import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    TopCoins,
    MarketCapChart,
    MakretOverview,
    FearGauge,
    FearOverview,
    TopGainers,
  },
  setup() {
    const store = useStore();
    store.commit("setHeaderText", "Dashboard");
    let isDarkTheme = computed(() => store.getters.isDarkTheme);
    return { isDarkTheme };
  },
};
</script>